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
    <div style={{ width: "100%", maxWidth: 720, margin: "0 auto" }}>

      {/* Back */}
      <button
        onClick={onBack}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em",
          color: "var(--text-lo)", background: "none", border: "none",
          cursor: "pointer", padding: "4px 0", marginBottom: "1.5rem",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-hi)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-lo)")}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Career hub
      </button>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em",
          color: "var(--clearance)", textTransform: "uppercase", marginBottom: 8,
          textShadow: "0 0 12px rgba(124,140,248,0.5)",
        }}>
          ◈ Study guide
        </p>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700,
          color: "var(--text-hi)", letterSpacing: "-0.02em", marginBottom: 8,
        }}>
          {rank}
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 11, padding: "4px 12px",
            borderRadius: 20, background: "rgba(124,140,248,0.1)",
            border: "1px solid rgba(124,140,248,0.3)", color: "var(--clearance)",
          }}>
            {rankStudy.modules.length} modules
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 11, padding: "4px 12px",
            borderRadius: 20, background: "rgba(67,242,160,0.08)",
            border: "1px solid rgba(67,242,160,0.25)", color: "var(--terminal)",
          }}>
            {rankStudy.totalTickets} tickets
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: "rgba(139,149,172,0.6)", letterSpacing: "0.03em",
          }}>
            mgr: {rankStudy.npc.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        borderLeft: "2px solid var(--clearance)",
        padding: "10px 14px",
        background: "linear-gradient(90deg, rgba(124,140,248,0.09) 0%, transparent 80%)",
        borderRadius: "0 8px 8px 0",
        marginBottom: "1.5rem",
        fontSize: 13, color: "var(--text-lo)", lineHeight: 1.65,
        fontStyle: "italic",
      }}>
        {rankStudy.tagline}
      </div>

      {/* Module grid */}
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
        color: "var(--text-lo)", textTransform: "uppercase", marginBottom: 10,
      }}>
        Modules
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 8, marginBottom: "1.75rem",
      }}>
        {rankStudy.modules.map((mod, i) => {
          const isFinal = mod.title.toLowerCase().includes("final") || mod.title.toLowerCase().includes("capstone");
          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              style={{
                background: isFinal
                  ? "linear-gradient(135deg, rgba(242,178,78,0.1), rgba(18,26,41,0.7))"
                  : "rgba(18,26,41,0.6)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: isFinal
                  ? "1px solid rgba(242,178,78,0.3)"
                  : "1px solid rgba(35,46,68,0.7)",
                borderRadius: 12, padding: "14px 16px",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isFinal ? "rgba(242,178,78,0.55)" : "rgba(124,140,248,0.4)";
                e.currentTarget.style.boxShadow = isFinal
                  ? "0 0 20px -6px rgba(242,178,78,0.3)"
                  : "0 0 20px -6px rgba(124,140,248,0.3)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isFinal ? "rgba(242,178,78,0.3)" : "rgba(35,46,68,0.7)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Module number */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em",
                  color: isFinal ? "var(--dossier)" : "var(--clearance)",
                  textTransform: "uppercase",
                  textShadow: isFinal ? "0 0 10px rgba(242,178,78,0.4)" : "0 0 10px rgba(124,140,248,0.4)",
                }}>
                  Module {String(mod.num).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <p style={{
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600,
                color: "var(--text-hi)", letterSpacing: "-0.01em", marginBottom: 8,
              }}>
                {mod.title}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                {mod.tags.slice(0, 3).map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "var(--font-mono)", fontSize: 9,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    padding: "2px 7px", borderRadius: 8,
                    background: "rgba(35,46,68,0.7)",
                    color: "var(--text-lo)",
                    border: "1px solid rgba(35,46,68,0.9)",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Ticket range */}
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                color: isFinal ? "rgba(242,178,78,0.5)" : "rgba(139,149,172,0.45)",
                letterSpacing: "0.04em",
              }}>
                {mod.ticketRange}
              </p>
            </button>
          );
        })}
      </div>

      {/* Enter CTA */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={onEnterTickets}
          style={{
            fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "11px 32px", borderRadius: 10,
            border: "1px solid rgba(67,242,160,0.35)",
            color: "var(--terminal)", background: "rgba(67,242,160,0.07)",
            cursor: "pointer", transition: "all 0.18s ease",
            boxShadow: "0 0 16px -6px rgba(67,242,160,0.25)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(67,242,160,0.14)";
            e.currentTarget.style.boxShadow = "0 0 28px -6px rgba(67,242,160,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(67,242,160,0.07)";
            e.currentTarget.style.boxShadow = "0 0 16px -6px rgba(67,242,160,0.25)";
          }}
        >
          Enter ticket queue →
        </button>
      </div>
    </div>
  );
}
