"use client";

import { useEffect, useRef } from "react";
import { beaconSyncProgress, syncProgress } from "@/lib/api";
import { useGameStore } from "@/store/useGameStore";

const DEBOUNCE_MS = 2500;

export default function ProgressSync() {
  const xp = useGameStore((s) => s.xp);
  const rank = useGameStore((s) => s.rank);
  const completedMissions = useGameStore((s) => s.completedMissions);

  // Always-current snapshot for the close/hide handlers, so they never
  // fire with a stale closure over old progress values.
  const latest = useRef({ xp, rank, completedMissions });
  useEffect(() => {
    latest.current = { xp, rank, completedMissions };
  });

  // Debounced sync a couple seconds after progress actually changes.
  useEffect(() => {
    const timeout = setTimeout(() => {
      void syncProgress(latest.current);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [xp, rank, completedMissions]);

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