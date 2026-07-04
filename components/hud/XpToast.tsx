"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/useGameStore";

export default function XpToast() {
  const lastAward = useGameStore((s) => s.lastAward);
  const clearLastAward = useGameStore((s) => s.clearLastAward);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lastAward == null) return;
    /* eslint-disable react-hooks/set-state-in-effect -- reacting to an
     * external store event (a new XP award) by kicking off a timed toast is
     * a timer/external-system synchronization, not derivable render state. */
    setVisible(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    const hide = setTimeout(() => setVisible(false), 2400);
    const clear = setTimeout(() => clearLastAward(), 2800);
    return () => {
      clearTimeout(hide);
      clearTimeout(clear);
    };
  }, [lastAward, clearLastAward]);

  if (lastAward == null) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border px-5 py-2.5 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide shadow-lg transition-all duration-300"
      style={{
        borderColor: "var(--terminal)",
        background: "var(--console)",
        color: "var(--terminal)",
        opacity: visible ? 1 : 0,
        transform: `translate(-50%, ${visible ? "0" : "8px"})`,
      }}
    >
      + {lastAward} XP — MISSION COMPLETE
    </div>
  );
}
