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