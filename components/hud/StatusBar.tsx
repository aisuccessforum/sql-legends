"use client";

import { useGameStore } from "@/store/useGameStore";
import { logout } from "@/lib/api";

const XP_PER_RANK = 200;

export default function StatusBar({ world }: { world: string }) {
  const xp = useGameStore((s) => s.xp);
  const rank = useGameStore((s) => s.rank);
  const resetProgress = useGameStore((s) => s.resetProgress);
  const pct = Math.min(100, Math.round(((xp % XP_PER_RANK) / XP_PER_RANK) * 100));

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-6"
      style={{
        background: "rgba(10, 13, 20, 0.85)",
        borderColor: "var(--console-line)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "var(--terminal)" }}
        />
        <span className="glow-terminal font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.18em] text-[var(--text-hi)] sm:text-sm">
          GLOBAL DATA ACADEMY
        </span>
        <span
          className="hidden font-[family-name:var(--font-mono)] text-xs sm:inline"
          style={{ color: "var(--text-lo)" }}
        >
          / {world}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className="rounded-full border px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] tracking-wide"
          style={{
            borderColor: "var(--clearance)",
            color: "var(--clearance)",
          }}
        >
          RANK: {rank.toUpperCase()}
        </span>

        <div className="flex items-center gap-2">
          <div
            className="h-1.5 w-24 overflow-hidden rounded-full sm:w-32"
            style={{ background: "var(--console-line)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${pct}%`, background: "var(--clearance)" }}
            />
          </div>
          <span
            className="font-[family-name:var(--font-mono)] text-xs"
            style={{ color: "var(--text-lo)" }}
          >
            {xp} XP
          </span>
        </div>

        <button
          onClick={() => {
            if (confirm("Reset all saved progress? This cannot be undone.")) {
              resetProgress();
            }
          }}
          className="hidden font-[family-name:var(--font-mono)] text-[11px] underline decoration-dotted sm:inline"
          style={{ color: "var(--text-lo)" }}
        >
          reset progress
        </button>

        <button
          onClick={async () => {
            await logout();
            window.location.href = "/";
          }}
          className="hidden font-[family-name:var(--font-mono)] text-[11px] underline decoration-dotted sm:inline"
          style={{ color: "var(--text-lo)" }}
        >
          sign out
        </button>
      </div>
    </header>
  );
}