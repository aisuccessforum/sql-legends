"use client";

import { useEffect, useRef } from "react";
import { beaconSyncProgress, getProfile, syncProgress } from "@/lib/api";
import { useGameStore } from "@/store/useGameStore";

const DEBOUNCE_MS = 2500;

export default function ProgressSync() {
  const xp = useGameStore((s) => s.xp);
  const rank = useGameStore((s) => s.rank);
  const completedMissions = useGameStore((s) => s.completedMissions);
  const seedFromProfile = useGameStore((s) => s.seedFromProfile);

  // Always-current snapshot for the close/hide handlers, so they never
  // fire with a stale closure over old progress values.
  const latest = useRef({ xp, rank, completedMissions });
  useEffect(() => {
    latest.current = { xp, rank, completedMissions };
  });

  // Debounced sync a couple seconds after progress actually changes.
  useEffect(() => {
    const timeout = setTimeout(async () => {
      await syncProgress(latest.current);

      // The sync may have just triggered a promotion (a new certificate,
      // an advanced rank) as a side effect on the server. Always refetch
      // afterward rather than guessing whether one happened — this is the
      // only way to correctly catch every milestone in a career that now
      // has more than one, not just the first.
      const profile = await getProfile();
      if (profile) {
        seedFromProfile({
          rank: profile.rank,
          xp: profile.xp,
          completedMissions: profile.completedMissions,
          certificateNumber: profile.certificateNumber,
          certifiedAt: profile.certifiedAt,
          certificates: profile.certificates,
        });
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [xp, rank, completedMissions, seedFromProfile]);

  // Last-chance sync when the tab is hidden or closed. sendBeacon fires
  // reliably even as the page unloads, unlike a normal fetch.
  useEffect(() => {
    function handleHide() {
      beaconSyncProgress(latest.current);
    }
    function handleVisibility() {
      if (document.visibilityState === "hidden") handleHide();
    }
    window.addEventListener("pagehide", handleHide);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("pagehide", handleHide);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return null;
}
