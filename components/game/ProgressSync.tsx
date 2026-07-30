"use client";

import { useEffect, useRef } from "react";
import { beaconSyncProgress, getProfile, syncProgress } from "@/lib/api";
import { useGameStore } from "@/store/useGameStore";

const DEBOUNCE_MS = 2500;

export default function ProgressSync() {
  const xp = useGameStore((s) => s.xp);
  const rank = useGameStore((s) => s.rank);
  const completedMissions = useGameStore((s) => s.completedMissions);
  const certificateNumber = useGameStore((s) => s.certificateNumber);
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

      // The server may have just issued a certificate as a side effect
      // of this sync (e.g. this was the 80th completed ticket). The
      // local store has no way to know that on its own, so re-fetch
      // once — only when we don't already have one, so this never
      // fires on every routine sync.
      if (!certificateNumber) {
        const profile = await getProfile();
        if (profile?.certificateNumber) {
          seedFromProfile({
            rank: profile.rank,
            xp: profile.xp,
            completedMissions: profile.completedMissions,
            certificateNumber: profile.certificateNumber,
            certifiedAt: profile.certifiedAt,
          });
        }
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [xp, rank, completedMissions, certificateNumber, seedFromProfile]);

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
