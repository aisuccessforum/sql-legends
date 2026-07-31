export interface PlayerRow {
  id: string;
  email: string;
  display_name: string | null;
  birth_date: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  rank: string;
  xp: number;
  coins: number;
  completed_missions: string;
  onboarding_complete: number;
  certificate_number: string | null;
  certified_at: number | null;
  created_at: number;
  updated_at: number;
}

export interface CertificateRow {
  certificate_number: string;
  player_id: string;
  rank_name: string;
  issued_at: number;
}

export interface PlayerProfile {
  id: string;
  email: string;
  displayName: string | null;
  birthDate: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  rank: string;
  xp: number;
  coins: number;
  completedMissions: string[];
  onboardingComplete: boolean;
  certificateNumber: string | null;
  certifiedAt: number | null;
  certificates: { certificateNumber: string; rankName: string; issuedAt: number }[];
}

export function rowToProfile(
  row: PlayerRow,
  certificates: CertificateRow[]
): PlayerProfile {
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    birthDate: row.birth_date,
    country: row.country,
    state: row.state,
    city: row.city,
    rank: row.rank,
    xp: row.xp,
    coins: row.coins,
    completedMissions: JSON.parse(row.completed_missions || "[]"),
    onboardingComplete: row.onboarding_complete === 1,
    certificateNumber: row.certificate_number,
    certifiedAt: row.certified_at,
    certificates: certificates.map((c) => ({
      certificateNumber: c.certificate_number,
      rankName: c.rank_name,
      issuedAt: c.issued_at,
    })),
  };
}

export async function getPlayer(
  db: D1Database,
  id: string
): Promise<PlayerRow | null> {
  const row = await db
    .prepare("SELECT * FROM players WHERE id = ?")
    .bind(id)
    .first<PlayerRow>();
  return row ?? null;
}

export async function getCertificatesForPlayer(
  db: D1Database,
  playerId: string
): Promise<CertificateRow[]> {
  const result = await db
    .prepare(
      "SELECT * FROM certificates WHERE player_id = ? ORDER BY issued_at ASC"
    )
    .bind(playerId)
    .all<CertificateRow>();
  return result.results ?? [];
}

/**
 * Creates the player row on first login if it doesn't exist yet.
 * Never overwrites existing profile/progress data.
 */
export async function ensurePlayerExists(
  db: D1Database,
  id: string,
  email: string,
  displayNameFallback: string | undefined
): Promise<void> {
  const now = Date.now();
  await db
    .prepare(
      `INSERT INTO players (id, email, display_name, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(id) DO NOTHING`
    )
    .bind(id, email, displayNameFallback ?? null, now, now)
    .run();
}

export async function completeOnboarding(
  db: D1Database,
  id: string,
  fields: {
    displayName: string;
    birthDate: string;
    country: string;
    state: string;
    city: string;
  }
): Promise<void> {
  await db
    .prepare(
      `UPDATE players
       SET display_name = ?, birth_date = ?, country = ?, state = ?, city = ?,
           onboarding_complete = 1, updated_at = ?
       WHERE id = ?`
    )
    .bind(
      fields.displayName,
      fields.birthDate,
      fields.country,
      fields.state,
      fields.city,
      Date.now(),
      id
    )
    .run();
}

export async function syncProgress(
  db: D1Database,
  id: string,
  progress: { xp: number; rank: string; completedMissions: string[] }
): Promise<void> {
  await db
    .prepare(
      `UPDATE players
       SET xp = ?, completed_missions = ?, updated_at = ?
       WHERE id = ?`
    )
    .bind(
      progress.xp,
      JSON.stringify(progress.completedMissions),
      Date.now(),
      id
    )
    .run();
}

const CERT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateCertificateNumber(): string {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < 18; i++) {
    out += CERT_CHARS[bytes[i] % CERT_CHARS.length];
  }
  return out;
}

export interface PromotionMilestone {
  /** The rank name recorded on the certificate and used as players.rank
   *  once this milestone is reached (e.g. "Intern", "Junior Data Analyst"). */
  rankName: string;
  /** Every mission ID that must appear in completedMissions to trigger this. */
  requiredMissionIds: string[];
  /** players.rank is set to this once the certificate is issued — the
   *  rank the player now operates at going forward. */
  nextRank: string;
}

/**
 * Checks a single promotion milestone. If the player has completed every
 * required mission and doesn't already hold a certificate for this rank,
 * issues one, records it in the certificates table, and advances
 * players.rank. Idempotent — safe to call repeatedly, including for
 * milestones already achieved.
 */
export async function checkAndIssuePromotion(
  db: D1Database,
  playerId: string,
  completedMissions: string[],
  milestone: PromotionMilestone
): Promise<{ certificateNumber: string; certifiedAt: number } | null> {
  const existing = await db
    .prepare(
      "SELECT certificate_number, issued_at FROM certificates WHERE player_id = ? AND rank_name = ?"
    )
    .bind(playerId, milestone.rankName)
    .first<{ certificate_number: string; issued_at: number }>();

  if (existing) {
    return {
      certificateNumber: existing.certificate_number,
      certifiedAt: existing.issued_at,
    };
  }

  const hasCompletedAll = milestone.requiredMissionIds.every((id) =>
    completedMissions.includes(id)
  );
  if (!hasCompletedAll) return null;

  let certificateNumber = generateCertificateNumber();
  for (let attempt = 0; attempt < 3; attempt++) {
    const clash = await db
      .prepare("SELECT certificate_number FROM certificates WHERE certificate_number = ?")
      .bind(certificateNumber)
      .first();
    if (!clash) break;
    certificateNumber = generateCertificateNumber();
  }

  const issuedAt = Date.now();

  await db
    .prepare(
      "INSERT INTO certificates (certificate_number, player_id, rank_name, issued_at) VALUES (?, ?, ?, ?)"
    )
    .bind(certificateNumber, playerId, milestone.rankName, issuedAt)
    .run();

  // players.certificate_number/certified_at track the most recently
  // earned certificate, for the simple "latest achievement" banner.
  // players.rank advances to whatever comes after this milestone.
  await db
    .prepare(
      "UPDATE players SET certificate_number = ?, certified_at = ?, rank = ?, updated_at = ? WHERE id = ?"
    )
    .bind(certificateNumber, issuedAt, milestone.nextRank, issuedAt, playerId)
    .run();

  return { certificateNumber, certifiedAt: issuedAt };
}

export interface PublicCertificate {
  certificateNumber: string;
  rankName: string;
  displayName: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  certifiedAt: number;
}

/**
 * Public lookup — deliberately returns only shareable fields (no email,
 * no internal ID, no birth date), since this powers a link anyone can
 * open without being signed in.
 */
export async function getCertificateByNumber(
  db: D1Database,
  certificateNumber: string
): Promise<PublicCertificate | null> {
  const row = await db
    .prepare(
      `SELECT c.rank_name, c.issued_at, p.display_name, p.country, p.state, p.city
       FROM certificates c
       JOIN players p ON p.id = c.player_id
       WHERE c.certificate_number = ?`
    )
    .bind(certificateNumber)
    .first<{
      rank_name: string;
      issued_at: number;
      display_name: string | null;
      country: string | null;
      state: string | null;
      city: string | null;
    }>();

  if (!row) return null;

  return {
    certificateNumber,
    rankName: row.rank_name,
    displayName: row.display_name,
    country: row.country,
    state: row.state,
    city: row.city,
    certifiedAt: row.issued_at,
  };
}
