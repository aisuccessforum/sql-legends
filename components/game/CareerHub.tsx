"use client";

import { useGameStore } from "@/store/useGameStore";
import { allRankStudy, RANK_ORDER } from "@/content/study/studyData";

interface Props {
  onEnterRank: () => void;
  onStudyRank: (rank: string) => void;
}

const RANK_META: Record<string, { tickets: number; tagline: string }> = {
  "Intern":               { tickets: 80, tagline: "SELECT, WHERE, GROUP BY, JOINs, subqueries" },
  "Junior Data Analyst":  { tickets: 50, tagline: "DISTINCT, CASE WHEN, correlated subqueries, NULLs" },
  "Data Analyst":         { tickets: 50, tagline: "Window functions, PARTITION BY, LAG, running totals" },
  "Senior Data Analyst":  { tickets: 50, tagline: "CTEs, UNION, self-joins, pivot, EXISTS" },
  "BI Developer":         { tickets: 50, tagline: "ROLLUP, time intelligence, star schema, upserts" },
  "Analytics Engineer":   { tickets: 50, tagline: "CTE models, idempotency, tests, incremental logic" },
  "Data Engineer":        { tickets: 50, tagline: "ETL, deduplication, SCD Types 1 & 2, pipeline health" },
  "Staff Analyst":        { tickets: 50, tagline: "Statistics, A/B testing, regression, outlier detection" },
  "Principal Analyst":    { tickets: 0,  tagline: "Coming soon — the senior-IC endgame" },
};

const NPC_BY_RANK: Record<string, string> = {};
allRankStudy.forEach((r) => { NPC_BY_RANK[r.rank] = r.npc; });
NPC_BY_RANK["Principal Analyst"] = "TBD";

export default function CareerHub({ onEnterRank, onStudyRank }: Props) {
  const rank = useGameStore((s) => s.rank);
  const completedMissions = useGameStore((s) => s.completedMissions);

  const currentIdx = RANK_ORDER.indexOf(rank);

  function getStatus(r: string): "completed" | "active" | "locked" {
    const idx = RANK_ORDER.indexOf(r);
    if (idx < currentIdx) return "completed";
    if (idx === currentIdx) return "active";
    return "locked";
  }

  const completedCount = (() => {
    const meta = RANK_META[rank];
    if (!meta || meta.tickets === 0) return 0;
    const prefixMap: Record<string, string> = {
      "Intern": "intern-ticket-",
      "Junior Data Analyst": "junior-ticket-",
      "Data Analyst": "da-ticket-",
      "Senior Data Analyst": "sda-ticket-",
      "BI Developer": "bi-ticket-",
      "Analytics Engineer": "ae-ticket-",
      "Data Engineer": "de-ticket-",
      "Staff Analyst": "sa-ticket-",
    };
    const prefix = prefixMap[rank] ?? "";
    return prefix ? completedMissions.filter((id) => id.startsWith(prefix)).length : 0;
  })();

  const activeTotal = RANK_META[rank]?.tickets ?? 0;
  const pct = activeTotal > 0 ? Math.round((completedCount / activeTotal) * 100) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Story header */}
      <div
        style={{
          background: "var(--surface-1)",
          borderLeft: "3px solid var(--border-accent)",
          borderRadius: "0 10px 10px 0",
          padding: "14px 18px",
          marginBottom: "1.5rem",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.07em",
            color: "var(--text-accent)",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          AstraMind Analytics — Career track
        </p>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          You joined AstraMind as an Intern. Each rank unlocks when you complete all tickets at the current level.
          Study the concept guide for each module, then practice in the ticket queue.
          The ladder ends at Principal Analyst — very few make it there.
        </p>
      </div>

      {/* Rank ladder */}
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.07em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          marginBottom: 8,
          paddingLeft: 2,
        }}
      >
        Career progression
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {RANK_ORDER.map((r, i) => {
          const status = getStatus(r);
          const meta = RANK_META[r];
          const npc = NPC_BY_RANK[r] ?? "";
          const hasStudy = r !== "Principal Analyst";
          const isPrincipal = r === "Principal Analyst";

          const borderStyle =
            status === "active"
              ? "1.5px solid var(--border-accent)"
              : "0.5px solid var(--border)";
          const bgStyle =
            status === "active" ? "var(--bg-accent)" : "var(--surface-2)";
          const opacity = status === "locked" ? 0.42 : 1;

          return (
            <div
              key={r}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr auto",
                alignItems: "center",
                gap: 14,
                padding: "12px 14px",
                borderRadius: 10,
                border: borderStyle,
                background: bgStyle,
                opacity,
              }}
            >
              {/* Number / icon */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 500,
                  flexShrink: 0,
                  background:
                    status === "completed"
                      ? "var(--bg-success)"
                      : status === "active"
                      ? "var(--bg-accent)"
                      : "var(--surface-1)",
                  color:
                    status === "completed"
                      ? "var(--text-success)"
                      : status === "active"
                      ? "var(--text-accent)"
                      : "var(--text-muted)",
                  border:
                    status === "active"
                      ? "1.5px solid var(--border-accent)"
                      : "0.5px solid var(--border)",
                }}
              >
                {status === "completed" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : status === "locked" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>

              {/* Text */}
              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    marginBottom: 2,
                  }}
                >
                  {r}
                </p>
                <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  {isPrincipal ? meta.tagline : `${meta.tickets} tickets · ${meta.tagline}`}
                </p>
                {status === "active" && !isPrincipal && (
                  <>
                    <div
                      style={{
                        height: 3,
                        background: "var(--surface-0)",
                        borderRadius: 2,
                        marginTop: 7,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          background: "var(--fill-accent)",
                          borderRadius: 2,
                          width: `${pct}%`,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>
                      {completedCount} / {activeTotal} tickets completed
                    </p>
                  </>
                )}
                {!isPrincipal && npc && (
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                    Manager: {npc.replace(/^[A-Z\s]+$/, (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                {status === "active" && !isPrincipal && (
                  <>
                    {hasStudy && (
                      <button
                        onClick={() => onStudyRank(r)}
                        style={{
                          fontSize: 12,
                          padding: "6px 12px",
                          borderRadius: 6,
                          border: "0.5px solid var(--border-accent)",
                          color: "var(--text-accent)",
                          background: "var(--surface-2)",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Study
                      </button>
                    )}
                    <button
                      onClick={onEnterRank}
                      style={{
                        fontSize: 12,
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: "0.5px solid var(--border)",
                        color: "var(--text-secondary)",
                        background: "var(--surface-2)",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Enter →
                    </button>
                  </>
                )}
                {status === "completed" && (
                  <span
                    style={{
                      fontSize: 11,
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: "var(--bg-success)",
                      color: "var(--text-success)",
                      border: "0.5px solid var(--border-success)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Cleared
                  </span>
                )}
                {status === "locked" && (
                  <span
                    style={{
                      fontSize: 11,
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: "var(--surface-1)",
                      color: "var(--text-muted)",
                      border: "0.5px solid var(--border)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
