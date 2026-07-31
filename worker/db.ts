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
}

export function rowToProfile(row: PlayerRow): PlayerProfile {
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
       SET xp = ?, rank = ?, completed_missions = ?, updated_at = ?
       WHERE id = ?`
    )
    .bind(
      progress.xp,
      progress.rank,
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

/**
 * Checks whether the player has now completed every required ticket ID.
 * If so, and they don't already have a certificate, generates a unique
 * 18-character alphanumeric certificate number and stores it permanently.
 * Safe to call on every sync — it's a no-op once a certificate exists.
 */
export async function checkAndIssueCertificate(
  db: D1Database,
  playerId: string,
  completedMissions: string[],
  requiredMissionIds: string[]
): Promise<{ certificateNumber: string; certifiedAt: number } | null> {
  const row = await getPlayer(db, playerId);
  if (!row) return null;

  if (row.certificate_number) {
    return {
      certificateNumber: row.certificate_number,
      certifiedAt: row.certified_at ?? 0,
    };
  }

  const hasCompletedAll = requiredMissionIds.every((id) =>
    completedMissions.includes(id)
  );
  if (!hasCompletedAll) return null;

  let certificateNumber = generateCertificateNumber();
  // Collision odds are astronomically small (36^18 possibilities), but
  // guard against it anyway rather than assume.
  for (let attempt = 0; attempt < 3; attempt++) {
    const existing = await db
      .prepare("SELECT id FROM players WHERE certificate_number = ?")
      .bind(certificateNumber)
      .first();
    if (!existing) break;
    certificateNumber = generateCertificateNumber();
  }

  const certifiedAt = Date.now();
  await db
    .prepare(
      `UPDATE players SET certificate_number = ?, certified_at = ?, rank = ?, updated_at = ? WHERE id = ?`
    )
    .bind(certificateNumber, certifiedAt, "Junior Data Analyst", certifiedAt, playerId)
    .run();

  return { certificateNumber, certifiedAt };
}

export interface PublicCertificate {
  certificateNumber: string;
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
      `SELECT display_name, country, state, city, certified_at
       FROM players WHERE certificate_number = ?`
    )
    .bind(certificateNumber)
    .first<{
      display_name: string | null;
      country: string | null;
      state: string | null;
      city: string | null;
      certified_at: number | null;
    }>();

  if (!row || row.certified_at == null) return null;

  return {
    certificateNumber,
    displayName: row.display_name,
    country: row.country,
    state: row.state,
    city: row.city,
    certifiedAt: row.certified_at,
  };
}
