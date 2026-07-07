"use client";

import { useGameStore } from "@/store/useGameStore";
import AccountMenu from "@/components/hud/AccountMenu";

const XP_PER_RANK = 200;

export default function StatusBar({ world }: { world: string }) {
  const xp = useGameStore((s) => s.xp);
  const rank = useGameStore((s) => s.rank);
  const pct = Math.min(100, Math.round(((xp % XP_PER_RANK) / XP_PER_RANK) * 100));

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b-2 px-4 py-4 sm:px-6"
      style={{
        background: "rgba(10, 13, 20, 0.85)",
        borderColor: "var(--console-line)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: "var(--terminal)" }}
        />
        <span className="glow-terminal font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.14em] text-[var(--text-hi)] sm:text-base lg:text-lg">
          ASTRAMIND ANALYTICS
        </span>
        <span
          className="hidden font-[family-name:var(--font-mono)] text-sm sm:inline"
          style={{ color: "var(--text-lo)" }}
        >
          / {world}
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <span
          className="rounded-full border-2 px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs font-semibold tracking-wide"
          style={{
            borderColor: "var(--clearance)",
            color: "var(--clearance)",
          }}
        >
          RANK: {rank.toUpperCase()}
        </span>

        <div className="flex items-center gap-2.5">
          <div
            className="h-2.5 w-24 overflow-hidden rounded-full sm:w-36"
            style={{ background: "var(--console-line)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${pct}%`,
                background: "var(--clearance)",
                boxShadow: "0 0 10px rgba(124, 140, 248, 0.7)",
              }}
            />
          </div>
          <span
            className="font-[family-name:var(--font-mono)] text-sm font-semibold"
            style={{ color: "var(--text-hi)" }}
          >
            {xp} XP
          </span>
        </div>

        <AccountMenu />
      </div>
    </header>
  );
}
