"use client";

import { useTypewriter } from "@/lib/useTypewriter";
import type { Mission } from "@/content/missions/level001";

export default function Dossier({ mission }: { mission: Mission }) {
  const { doneLines, currentPartial, isComplete } = useTypewriter(
    mission.briefing,
    { charDelayMs: 10, lineDelayMs: 260 }
  );

  return (
    <section
      className="flex h-full flex-col gap-4 overflow-y-auto console-scroll p-5 sm:p-6"
      style={{ borderColor: "var(--console-line)" }}
    >
      <div>
        <div
          className="mb-1 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em]"
          style={{ color: "var(--dossier)" }}
        >
          CLASSIFIED // {mission.levelLabel.toUpperCase()}
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold sm:text-2xl">
          {mission.world}
        </h1>
        <div
          className="mt-1 font-[family-name:var(--font-mono)] text-xs"
          style={{ color: "var(--text-lo)" }}
        >
          FROM: {mission.npc}
        </div>
      </div>

      <div className="space-y-3 text-sm leading-relaxed sm:text-[15px]">
        {doneLines.map((line, i) => (
          <p key={i} style={{ color: "var(--text-hi)" }}>
            {line}
          </p>
        ))}
        {!isComplete && (
          <p className="blink-cursor" style={{ color: "var(--text-hi)" }}>
            {currentPartial}
          </p>
        )}
      </div>

      {isComplete && (
        <div
          className="mt-2 rounded-lg border px-4 py-3"
          style={{
            borderColor: "var(--dossier)",
            background: "rgba(242, 178, 78, 0.06)",
          }}
        >
          <div
            className="mb-1 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em]"
            style={{ color: "var(--dossier)" }}
          >
            OBJECTIVE
          </div>
          <p className="text-sm sm:text-[15px]">{mission.objective}</p>
        </div>
      )}
    </section>
  );
}
