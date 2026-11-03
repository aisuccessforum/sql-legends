"use client";

import "@/app/spatial.css";
import XpTube from "@/components/hud/XpTube";
import { useGameStore } from "@/store/useGameStore";
import { allRankStudy, RANK_ORDER } from "@/content/study/studyData";

interface Props {
  onEnterRank: () => void;
  onStudyRank: (rank: string) => void;
}

const RANK_META: Record<string, { tickets: number; tagline: string }> = {
  "Intern":               { tickets: 80, tagline: "SELECT · WHERE · GROUP BY · JOINs · Subqueries" },
  "Junior Data Analyst":  { tickets: 50, tagline: "DISTINCT · CASE WHEN · Correlated subqueries · NULLs" },
  "Data Analyst":         { tickets: 50, tagline: "Window functions · PARTITION BY · LAG · Running totals" },
  "Senior Data Analyst":  { tickets: 50, tagline: "CTEs · UNION · Self-joins · Pivot · EXISTS" },
  "BI Developer":         { tickets: 50, tagline: "ROLLUP · Time intelligence · Star schema · UPSERTs" },
  "Analytics Engineer":   { tickets: 50, tagline: "CTE models · Idempotency · Tests · Incremental logic" },
  "Data Engineer":        { tickets: 50, tagline: "ETL · Deduplication · SCD Types 1 & 2 · Pipeline health" },
  "Staff Analyst":        { tickets: 50, tagline: "Statistics · A/B testing · Regression · Outlier detection" },
  "Principal Analyst":    { tickets: 0,  tagline: "The senior-IC endgame — coming soon" },
};

const NPC_BY_RANK: Record<string, string> = {};
allRankStudy.forEach((r) => { NPC_BY_RANK[r.rank] = r.npc; });
NPC_BY_RANK["Principal Analyst"] = "TBD";

export default function CareerHub({ onEnterRank, onStudyRank }: Props) {
  const rank = useGameStore((s) => s.rank);
  const xp = useGameStore((s) => s.xp);
  const completedMissions = useGameStore((s) => s.completedMissions);
  const currentIdx = RANK_ORDER.indexOf(rank);

  const prefixMap: Record<string, string> = {
    "Intern": "intern-ticket-", "Junior Data Analyst": "junior-ticket-",
    "Data Analyst": "da-ticket-", "Senior Data Analyst": "sda-ticket-",
    "BI Developer": "bi-ticket-", "Analytics Engineer": "ae-ticket-",
    "Data Engineer": "de-ticket-", "Staff Analyst": "sa-ticket-",
  };
  const prefix = prefixMap[rank] ?? "";
  const done = prefix ? completedMissions.filter((id) => id.startsWith(prefix)).length : 0;
  const total = RANK_META[rank]?.tickets ?? 0;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const btn = (color: string): React.CSSProperties => ({
    fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, padding: "11px 22px", borderRadius: 999,
    border: `1px solid ${color}`, color: "#fff", cursor: "pointer",
    background: `linear-gradient(180deg, ${color}55, ${color}22)`,
    transition: "transform .3s var(--spring)",
  });

  return (
    <div className="zoom-out" style={{ width: "100%", maxWidth: 1100, margin: "0 auto", padding: "0 8px" }}>
      <header style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: "3rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: ".2em", color: "var(--neon-cyan)", textTransform: "uppercase", marginBottom: 12 }}>
            AstraMind Analytics &middot; Career track
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text-hi)" }}>
            Career Hub
          </h1>
        </div>
        <XpTube xp={xp} pct={pct} width={300} />
      </header>

      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {RANK_ORDER.map((r, i) => {
          const idx = RANK_ORDER.indexOf(r);
          const completed = idx < currentIdx, active = idx === currentIdx, locked = idx > currentIdx;
          const meta = RANK_META[r];
          const neon = i % 2 === 0 ? "#3df0ff" : "#ff4fd8";
          const color = active ? neon : completed ? "#43f2a0" : "#8b95ac";
          return (
            <article
              key={r}
              className={`glass ${active ? "tier-active" : ""}`}
              style={{
                ["--neon" as string]: neon,
                borderRadius: 28, padding: 26, position: "relative",
                marginTop: (i % 3) * 18, /* spatial cascade */
                opacity: locked ? 0.5 : 1,
                filter: locked ? "saturate(0.3) blur(0.4px)" : "none",
                backdropFilter: locked ? "blur(34px)" : undefined,
                transform: `translateZ(0) rotate(${(i % 2 ? 0.6 : -0.6)}deg)`,
              }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".18em", color, textTransform: "uppercase", marginBottom: 10 }}>
                {completed ? "Completed" : active ? "Active tier" : "Locked"} &middot; Tier {i + 1}
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: active ? 28 : 24, fontWeight: 700, color: "var(--text-hi)", letterSpacing: "-0.02em", marginBottom: 8 }}>{r}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-lo)", marginBottom: 18 }}>{meta.tagline}</p>
              {meta.tickets > 0 && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-lo)", marginBottom: 18 }}>
                  {meta.tickets} tickets &middot; mgr {(NPC_BY_RANK[r] ?? "").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              )}
              {active && total > 0 && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: neon, marginBottom: 18 }}>{done}/{total} cleared &middot; {pct}%</p>
              )}
              {!locked && meta.tickets > 0 && (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button style={btn("#7c8cf8")} onClick={() => onStudyRank(r)}>Study</button>
                  <button style={btn(color)} onClick={onEnterRank}>{completed ? "Review" : "Enter"}</button>
                </div>
              )}
              {locked && <p style={{ fontSize: 13, color: "var(--text-lo)" }}>&#128274; Clear the previous tier to unlock</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
