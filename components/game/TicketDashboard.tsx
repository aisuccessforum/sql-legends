"use client";

import type { Mission } from "@/content/missions/level001";
import { missions, upcomingModules } from "@/content/missions";
import { useGameStore } from "@/store/useGameStore";

type TicketStatus = "completed" | "available" | "locked";

interface Props {
  onSelectMission: (mission: Mission) => void;
  onSelectComingSoon: () => void;
}

export default function TicketDashboard({
  onSelectMission,
  onSelectComingSoon,
}: Props) {
  const completedMissions = useGameStore((s) => s.completedMissions);

  const firstIncompleteIndex = missions.findIndex(
    (m) => !completedMissions.includes(m.id)
  );

  const items = missions.map((mission, index) => {
    const isDone = completedMissions.includes(mission.id);
    let status: TicketStatus;
    if (isDone) {
      status = "completed";
    } else if (index === firstIncompleteIndex) {
      status = "available";
    } else {
      status = "locked";
    }
    return { mission, status };
  });

  const completedCount = missions.filter((m) =>
    completedMissions.includes(m.id)
  ).length;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <div className="mb-6 text-center">
        <div
          className="mb-1 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em]"
          style={{ color: "var(--dossier)" }}
        >
          INTERNSHIP PROGRAM // TICKET QUEUE
        </div>
        <h1 className="glow-clearance font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl lg:text-5xl">
          Your Assignments
        </h1>
        <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--text-lo)" }}>
          {completedCount} of {missions.length} tickets reviewed
        </p>
      </div>

      <div className="space-y-3">
        {items.map(({ mission, status }) => (
          <TicketCard
            key={mission.id}
            mission={mission}
            status={status}
            onClick={() => {
              if (status !== "locked") onSelectMission(mission);
            }}
          />
        ))}
      </div>

      <div className="mt-10">
        <div
          className="mb-3 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em]"
          style={{ color: "var(--text-lo)" }}
        >
          UPCOMING MODULES
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {upcomingModules.map((name) => (
            <button
              key={name}
              onClick={onSelectComingSoon}
              className="console-card flex items-center gap-2 px-4 py-3 text-left opacity-60 transition-opacity hover:opacity-90"
            >
              <LockIcon />
              <span
                className="font-[family-name:var(--font-mono)] text-xs"
                style={{ color: "var(--text-lo)" }}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TicketCard({
  mission,
  status,
  onClick,
}: {
  mission: Mission;
  status: TicketStatus;
  onClick: () => void;
}) {
  const locked = status === "locked";
  const completed = status === "completed";
  const available = status === "available";

  return (
    <button
      onClick={onClick}
      disabled={locked}
      className="console-card flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-all"
      style={{
        opacity: locked ? 0.45 : 1,
        cursor: locked ? "not-allowed" : "pointer",
        borderColor: available ? "var(--clearance)" : "var(--console-line)",
        boxShadow: available ? "0 0 28px -8px rgba(124, 140, 248, 0.55)" : undefined,
      }}
    >
      <div className="min-w-0">
        <div
          className="mb-1.5 font-[family-name:var(--font-mono)] text-xs tracking-[0.1em] sm:text-sm"
          style={{ color: completed ? "var(--terminal)" : "var(--dossier)" }}
        >
          {mission.levelLabel.toUpperCase()}
        </div>
        <div className="truncate font-[family-name:var(--font-display)] text-lg font-bold sm:text-xl">
          {mission.world}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span
          className="font-[family-name:var(--font-mono)] text-sm font-semibold"
          style={{ color: "var(--text-lo)" }}
        >
          +{mission.xpAward} XP
        </span>
        {completed && <CheckIcon />}
        {locked && <LockIcon />}
        {available && (
          <span
            className="pulse-badge rounded-full px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs font-bold tracking-wide"
            style={{ background: "var(--terminal)", color: "var(--void)" }}
          >
            OPEN
          </span>
        )}
      </div>
    </button>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--terminal)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--text-lo)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
