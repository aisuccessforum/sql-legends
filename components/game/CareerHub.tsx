"use client";

import { useGameStore } from "@/store/useGameStore";
import { allRankStudy, RANK_ORDER } from "@/content/study/studyData";

interface Props {
  onEnterRank: () => void;
  onStudyRank: (rank: string) => void;
}

const RANK_META: Record<string, { tickets: number; tagline: string; icon: string }> = {
  "Intern":               { tickets: 80, tagline: "SELECT · WHERE · GROUP BY · JOINs · Subqueries", icon: "01" },
  "Junior Data Analyst":  { tickets: 50, tagline: "DISTINCT · CASE WHEN · Correlated subqueries · NULLs", icon: "02" },
  "Data Analyst":         { tickets: 50, tagline: "Window functions · PARTITION BY · LAG · Running totals", icon: "03" },
  "Senior Data Analyst":  { tickets: 50, tagline: "CTEs · UNION · Self-joins · Pivot · EXISTS", icon: "04" },
  "BI Developer":         { tickets: 50, tagline: "ROLLUP · Time intelligence · Star schema · UPSERTs", icon: "05" },
  "Analytics Engineer":   { tickets: 50, tagline: "CTE models · Idempotency · Tests · Incremental logic", icon: "06" },
  "Data Engineer":        { tickets: 50, tagline: "ETL · Deduplication · SCD Types 1 & 2 · Pipeline health", icon: "07" },
  "Staff Analyst":        { tickets: 50, tagline: "Statistics · A/B testing · Regression · Outlier detection", icon: "08" },
  "Principal Analyst":    { tickets: 0,  tagline: "The senior-IC endgame — coming soon", icon: "09" },
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

  const prefixMap: Record<string, string> = {
    "Intern": "intern-ticket-", "Junior Data Analyst": "junior-ticket-",
    "Data Analyst": "da-ticket-", "Senior Data Analyst": "sda-ticket-",
    "BI Developer": "bi-ticket-", "Analytics Engineer": "ae-ticket-",
    "Data Engineer": "de-ticket-", "Staff Analyst": "sa-ticket-",
  };
  const prefix = prefixMap[rank] ?? "";
  const completedCount = prefix ? completedMissions.filter((id) => id.startsWith(prefix)).length : 0;
  const activeTotal = RANK_META[rank]?.tickets ?? 0;
  const pct = activeTotal > 0 ? Math.round((completedCount / activeTotal) * 100) : 0;

  return (
    <div style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>

      {/* ── Page header ── */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em",
          color: "var(--terminal)", textTransform: "uppercase", marginBottom: 10,
          textShadow: "0 0 12px rgba(67,242,160,0.5)",
        }}>
          ◈ AstraMind Analytics — Career track
        </p>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
          color: "var(--text-hi)", letterSpacing: "-0.02em", marginBottom: 12,
        }}>
          Career Hub
        </h1>
        <p style={{
          fontSize: 14, color: "var(--text-lo)", lineHeight: 1.7, maxWidth: 540,
          borderLeft: "2px solid var(--clearance)",
          paddingLeft: 14,
          background: "linear-gradient(90deg, rgba(124,140,248,0.07) 0%, transparent 70%)",
          borderRadius: "0 6px 6px 0",
          padding: "10px 10px 10px 14px",
        }}>
          You joined AstraMind as an Intern. Complete all tickets at each level to advance.
          Study the concept guide for each module, then grind the ticket queue.
          The ladder ends at Principal Analyst — very few make it there.
        </p>
      </div>

      {/* ── Section label ── */}
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
        color: "var(--text-lo)", textTransform: "uppercase", marginBottom: 12,
      }}>
        Career progression
      </p>

      {/* ── Rank cards ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {RANK_ORDER.map((r, i) => {
          const status = getStatus(r);
          const meta = RANK_META[r];
          const npc = NPC_BY_RANK[r] ?? "";
          const isPrincipal = r === "Principal Analyst";

          const isCompleted = status === "completed";
          const isActive = status === "active";
          const isLocked = status === "locked";

          /* ── Per-status visual tokens ── */
          const borderColor = isActive
            ? "rgba(124,140,248,0.55)"
            : isCompleted
            ? "rgba(67,242,160,0.25)"
            : "rgba(35,46,68,0.6)";

          const bg = isActive
            ? "linear-gradient(135deg, rgba(124,140,248,0.12) 0%, rgba(18,26,41,0.7) 60%)"
            : isCompleted
            ? "linear-gradient(135deg, rgba(67,242,160,0.07) 0%, rgba(18,26,41,0.7) 60%)"
            : "rgba(18,26,41,0.5)";

          const glowShadow = isActive
            ? "0 0 32px -8px rgba(124,140,248,0.4), 0 4px 24px -8px rgba(0,0,0,0.6)"
            : isCompleted
            ? "0 0 16px -6px rgba(67,242,160,0.2), 0 2px 12px -4px rgba(0,0,0,0.5)"
            : "0 2px 8px -4px rgba(0,0,0,0.4)";

          const numBg = isActive
            ? "linear-gradient(135deg, var(--clearance), rgba(124,140,248,0.4))"
            : isCompleted
            ? "linear-gradient(135deg, var(--terminal), rgba(67,242,160,0.4))"
            : "rgba(35,46,68,0.5)";

          const numColor = isActive ? "#fff" : isCompleted ? "var(--void)" : "var(--text-lo)";
          const opacity = isLocked ? 0.45 : 1;

          return (
            <div
              key={r}
              style={{
                display: "grid",
                gridTemplateColumns: "52px 1fr auto",
                alignItems: "center",
                gap: 16,
                padding: "16px 18px",
                borderRadius: 14,
                border: `1px solid ${borderColor}`,
                background: bg,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: glowShadow,
                opacity,
                transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                cursor: isActive ? "default" : "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Active rank shimmer strip */}
              {isActive && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, transparent, var(--clearance), var(--terminal), transparent)",
                }} />
              )}

              {/* ── Number circle ── */}
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                background: numBg,
                boxShadow: isActive
                  ? "0 0 20px -4px rgba(124,140,248,0.6)"
                  : isCompleted
                  ? "0 0 12px -4px rgba(67,242,160,0.5)"
                  : "none",
                color: numColor,
                fontFamily: "var(--font-mono)",
                fontSize: isCompleted ? 14 : 13,
                fontWeight: 700,
              }}>
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : isLocked ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-lo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ) : (
                  <span style={{ fontSize: 12 }}>0{i + 1}</span>
                )}
              </div>

              {/* ── Text block ── */}
              <div style={{ minWidth: 0 }}>
                {/* Rank name */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 3 }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isActive ? 17 : 15,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "var(--text-hi)" : isCompleted ? "rgba(233,238,247,0.75)" : "rgba(139,149,172,0.7)",
                    letterSpacing: "-0.01em",
                    textShadow: isActive ? "0 0 20px rgba(124,140,248,0.3)" : "none",
                  }}>
                    {r}
                  </span>
                  {isActive && (
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "var(--clearance)", padding: "2px 7px",
                      border: "1px solid rgba(124,140,248,0.35)",
                      borderRadius: 20, background: "rgba(124,140,248,0.1)",
                      flexShrink: 0,
                    }}>
                      current rank
                    </span>
                  )}
                </div>

                {/* Tagline */}
                {!isPrincipal && (
                  <p style={{
                    fontSize: 12, color: isLocked ? "rgba(139,149,172,0.45)" : "var(--text-lo)",
                    marginBottom: isActive ? 10 : 4, lineHeight: 1.4,
                    fontFamily: "var(--font-mono)",
                  }}>
                    {meta.tickets} tickets · {meta.tagline}
                  </p>
                )}
                {isPrincipal && (
                  <p style={{ fontSize: 12, color: "rgba(139,149,172,0.4)", fontFamily: "var(--font-mono)" }}>
                    {meta.tagline}
                  </p>
                )}

                {/* Active: progress bar */}
                {isActive && !isPrincipal && (
                  <div>
                    <div style={{
                      height: 4, background: "rgba(35,46,68,0.8)", borderRadius: 4,
                      overflow: "hidden", marginBottom: 5,
                    }}>
                      <div style={{
                        height: "100%", borderRadius: 4,
                        background: "linear-gradient(90deg, var(--clearance), var(--terminal))",
                        width: `${pct}%`,
                        boxShadow: "0 0 8px rgba(124,140,248,0.6)",
                        transition: "width 0.5s ease",
                      }} />
                    </div>
                    <p style={{
                      fontFamily: "var(--font-mono)", fontSize: 10,
                      color: "var(--text-lo)", letterSpacing: "0.05em",
                    }}>
                      {completedCount} / {activeTotal} tickets completed &nbsp;·&nbsp; {pct}%
                    </p>
                  </div>
                )}

                {/* NPC */}
                {npc && !isPrincipal && (
                  <p style={{
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    color: isLocked ? "rgba(139,149,172,0.3)" : "rgba(139,149,172,0.55)",
                    marginTop: isActive ? 6 : 2, letterSpacing: "0.04em",
                  }}>
                    mgr: {npc.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                  </p>
                )}
              </div>

              {/* ── Action buttons ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                {isActive && !isPrincipal && (
                  <>
                    <button
                      onClick={() => onStudyRank(r)}
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: 11,
                        fontWeight: 600, letterSpacing: "0.06em",
                        padding: "7px 16px", borderRadius: 8,
                        border: "1px solid rgba(124,140,248,0.5)",
                        color: "var(--clearance)",
                        background: "rgba(124,140,248,0.1)",
                        cursor: "pointer", whiteSpace: "nowrap",
                        transition: "all 0.15s ease",
                        boxShadow: "0 0 12px -4px rgba(124,140,248,0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(124,140,248,0.2)";
                        e.currentTarget.style.boxShadow = "0 0 20px -4px rgba(124,140,248,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(124,140,248,0.1)";
                        e.currentTarget.style.boxShadow = "0 0 12px -4px rgba(124,140,248,0.3)";
                      }}
                    >
                      Study
                    </button>
                    <button
                      onClick={onEnterRank}
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: 11,
                        fontWeight: 600, letterSpacing: "0.06em",
                        padding: "7px 16px", borderRadius: 8,
                        border: "1px solid rgba(67,242,160,0.4)",
                        color: "var(--terminal)",
                        background: "rgba(67,242,160,0.08)",
                        cursor: "pointer", whiteSpace: "nowrap",
                        transition: "all 0.15s ease",
                        boxShadow: "0 0 12px -4px rgba(67,242,160,0.25)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(67,242,160,0.15)";
                        e.currentTarget.style.boxShadow = "0 0 20px -4px rgba(67,242,160,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(67,242,160,0.08)";
                        e.currentTarget.style.boxShadow = "0 0 12px -4px rgba(67,242,160,0.25)";
                      }}
                    >
                      Enter →
                    </button>
                  </>
                )}

                {isCompleted && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "5px 12px", borderRadius: 20,
                    background: "rgba(67,242,160,0.1)",
                    color: "var(--terminal)",
                    border: "1px solid rgba(67,242,160,0.3)",
                    textShadow: "0 0 10px rgba(67,242,160,0.4)",
                    whiteSpace: "nowrap",
                  }}>
                    ✓ Cleared
                  </span>
                )}

                {isLocked && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "5px 12px", borderRadius: 20,
                    background: "rgba(35,46,68,0.4)",
                    color: "rgba(139,149,172,0.4)",
                    border: "1px solid rgba(35,46,68,0.6)",
                    whiteSpace: "nowrap",
                  }}>
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
