"use client";

import { allRankStudy, type StudyModule } from "@/content/study/studyData";

interface Props {
  rank: string;
  onSelectModule: (mod: StudyModule) => void;
  onBack: () => void;
  onEnterTickets: () => void;
}

export default function StudyHub({ rank, onSelectModule, onBack, onEnterTickets }: Props) {
  const rankStudy = allRankStudy.find((r) => r.rank === rank);
  if (!rankStudy) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          color: "var(--text-muted)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: "1.25rem",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Career hub
      </button>

      {/* Header */}
      <div style={{ marginBottom: "1.25rem" }}>
        <p style={{ fontSize: 20, fontWeight: 500, color: "var(--text-primary)", marginBottom: 4 }}>
          {rank} — Study guide
        </p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
          {rankStudy.modules.length} modules · {rankStudy.totalTickets} practice tickets · Read the concept, then practice
        </p>
        <span
          style={{
            display: "inline-block",
            marginTop: 8,
            fontSize: 11,
            padding: "3px 10px",
            borderRadius: 20,
            background: "var(--surface-1)",
            border: "0.5px solid var(--border)",
            color: "var(--text-muted)",
            letterSpacing: "0.04em",
          }}
        >
          Manager: {rankStudy.npc.split(" ").map((w, i) => i === 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()).join(" ")}
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          background: "var(--surface-1)",
          borderLeft: "3px solid var(--border-accent)",
          borderRadius: "0 8px 8px 0",
          padding: "10px 14px",
          marginBottom: "1.25rem",
          fontSize: 13,
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}
      >
        {rankStudy.tagline}
      </div>

      {/* Module grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 8,
          marginBottom: "1.25rem",
        }}
      >
        {rankStudy.modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => onSelectModule(mod)}
            style={{
              background: "var(--surface-2)",
              border: "0.5px solid var(--border)",
              borderRadius: 10,
              padding: "13px 15px",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, letterSpacing: "0.05em" }}>
              Module {mod.num}
            </p>
            <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", marginBottom: 6 }}>
              {mod.title}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
              {mod.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    padding: "2px 7px",
                    borderRadius: 10,
                    background: "var(--surface-0)",
                    color: "var(--text-secondary)",
                    border: "0.5px solid var(--border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{mod.ticketRange}</p>
          </button>
        ))}
      </div>

      {/* Enter tickets CTA */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={onEnterTickets}
          style={{
            padding: "10px 28px",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: 8,
            border: "0.5px solid var(--border)",
            color: "var(--text-secondary)",
            background: "var(--surface-2)",
            cursor: "pointer",
          }}
        >
          Enter ticket queue →
        </button>
      </div>
    </div>
  );
}
