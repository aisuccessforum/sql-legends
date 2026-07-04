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

export interface OnboardingFields {
  displayName: string;
  birthDate: string;
  country: string;
  state: string;
  city: string;
}

/** Returns the signed-in player's profile, or null if not signed in. */
export async function getProfile(): Promise<PlayerProfile | null> {
  const res = await fetch("/api/player", { credentials: "include" });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`Failed to load profile (${res.status})`);
  return res.json();
}

export async function submitOnboarding(
  fields: OnboardingFields
): Promise<PlayerProfile> {
  const res = await fetch("/api/player/onboarding", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Onboarding failed (${res.status})`);
  }
  return res.json();
}

export async function syncProgress(progress: {
  xp: number;
  rank: string;
  completedMissions: string[];
}): Promise<void> {
  await fetch("/api/player/sync", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(progress),
  });
}

/** Best-effort sync fired as the tab is closing/hiding — no response is read. */
export function beaconSyncProgress(progress: {
  xp: number;
  rank: string;
  completedMissions: string[];
}): void {
  const blob = new Blob([JSON.stringify(progress)], {
    type: "application/json",
  });
  navigator.sendBeacon("/api/player/sync", blob);
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
}