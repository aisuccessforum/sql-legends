"use client";

import type { Mission } from "@/content/missions/level001";
import { missions } from "@/content/missions";
import { juniorMissions, juniorUpcomingModules } from "@/content/junior-missions";
import { useGameStore } from "@/store/useGameStore";

type TicketStatus = "completed" | "available" | "locked";

interface Props {
  onSelectMission: (mission: Mission) => void;
  onSelectComingSoon: () => void;
}

// Maps a player's current rank to that rank's ticket queue and eyebrow
// label. Any rank not listed here (a future rank whose content doesn't
// exist yet) correctly falls through to an empty queue with a clear
// "not published yet" message, instead of silently showing an old rank's
// tickets again.
function tracksForRank(rank: string): {
  activeMissions: Mission[];
  activeUpcomingModules: string[];
  eyebrow: string;
} {
  if (rank === "Intern") {
    return {
      activeMissions: missions,
      activeUpcomingModules: [],
      eyebrow: "INTERNSHIP PROGRAM // TICKET QUEUE",
    };
  }
  if (rank === "Junior Data Analyst") {
    return {
      activeMissions: juniorMissions,
      activeUpcomingModules: juniorUpcomingModules,
      eyebrow: "JUNIOR DATA ANALYST // TICKET QUEUE",
    };
  }
  return {
    activeMissions: [],
    activeUpcomingModules: [],
    eyebrow: `${rank.toUpperCase()} // TICKET QUEUE`,
  };
}

export default function TicketDashboard({
  onSelectMission,
  onSelectComingSoon,
}: Props) {
  const completedMissions = useGameStore((s) => s.completedMissions);
  const certificates = useGameStore((s) => s.certificates);
  const rank = useGameStore((s) => s.rank);

  const { activeMissions, activeUpcomingModules, eyebrow } = tracksForRank(rank);

  const firstIncompleteIndex = activeMissions.findIndex(
    (m) => !completedMissions.includes(m.id)
  );

  const items = activeMissions.map((mission, index) => {
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

  const completedCount = activeMissions.filter((m) =>
    completedMissions.includes(m.id)
  ).length;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      {certificates.length > 0 && (
        <div className="mb-8 space-y-3">
          {certificates.map((cert) => (
            <a
              key={cert.certificateNumber}
              href={`/certificate?number=${encodeURIComponent(cert.certificateNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="console-card flex items-center justify-between gap-4 px-6 py-5 transition-all hover:opacity-90"
              style={{
                borderColor: "var(--terminal)",
                boxShadow: "0 0 28px -8px rgba(67, 242, 160, 0.55)",
              }}
            >
              <div>
                <div
                  className="mb-1 font-[family-name:var(--font-mono)] text-xs tracking-[0.14em]"
                  style={{ color: "var(--terminal)" }}
                >
                  {cert.rankName.toUpperCase()} CERTIFIED
                </div>
                <div className="font-[family-name:var(--font-display)] text-lg font-bold sm:text-xl">
                  View your certificate
                </div>
              </div>
              <span
                className="rounded-full px-4 py-2 font-[family-name:var(--font-mono)] text-xs font-bold tracking-wide"
                style={{ background: "var(--terminal)", color: "var(--void)" }}
              >
                OPEN
              </span>
            </a>
          ))}
        </div>
      )}

      <div className="mb-6 text-center">
        <div
          className="mb-1 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em]"
          style={{ color: "var(--dossier)" }}
        >
          {eyebrow}
        </div>
        <h1 className="glow-clearance font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl lg:text-5xl">
          Your Assignments
        </h1>
        <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--text-lo)" }}>
          {activeMissions.length > 0
            ? `${completedCount} of ${activeMissions.length} tickets reviewed`
            : "No tickets published for this rank yet."}
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

      {activeUpcomingModules.length > 0 && (
        <div className="mt-10">
          <div
            className="mb-3 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em]"
            style={{ color: "var(--text-lo)" }}
          >
            UPCOMING MODULES
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {activeUpcomingModules.map((name) => (
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
      )}
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--terminal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-lo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
