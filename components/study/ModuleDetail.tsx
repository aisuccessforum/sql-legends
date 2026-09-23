"use client";

import type { StudyModule } from "@/content/study/studyData";

interface Props {
  mod: StudyModule;
  rankName: string;
  totalModules: number;
  onBack: () => void;
  onPractice: (startIdx: number, endIdx: number) => void;
}

export default function ModuleDetail({ mod, rankName, totalModules, onBack, onPractice }: Props) {
  const isFinal = mod.title.toLowerCase().includes("final") || mod.title.toLowerCase().includes("capstone");
  const accentColor = isFinal ? "var(--dossier)" : "var(--clearance)";
  const accentRgb = isFinal ? "242,178,78" : "124,140,248";

  return (
    <div style={{ width: "100%", maxWidth: 680, margin: "0 auto" }}>

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
        Study guide
      </button>

      {/* Header card */}
      <div style={{
        background: `linear-gradient(135deg, rgba(${accentRgb},0.12) 0%, rgba(18,26,41,0.75) 55%)`,
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        border: `1px solid rgba(${accentRgb},0.35)`,
        borderRadius: 16, padding: "20px 22px", marginBottom: "1.25rem",
        boxShadow: `0 0 40px -12px rgba(${accentRgb},0.3)`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Top shimmer */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }} />

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em",
              textTransform: "uppercase", color: accentColor, marginBottom: 8,
              textShadow: `0 0 12px rgba(${accentRgb},0.5)`,
            }}>
              Module {String(mod.num).padStart(2, "0")} of {totalModules} · {rankName}
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700,
              color: "var(--text-hi)", letterSpacing: "-0.02em", marginBottom: 10,
            }}>
              {mod.title}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {mod.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em",
                  textTransform: "uppercase", padding: "3px 9px", borderRadius: 10,
                  background: `rgba(${accentRgb},0.12)`,
                  color: accentColor,
                  border: `1px solid rgba(${accentRgb},0.25)`,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.05em",
            padding: "6px 14px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0,
            background: `rgba(${accentRgb},0.1)`,
            color: accentColor,
            border: `1px solid rgba(${accentRgb},0.3)`,
          }}>
            {mod.ticketRange}
          </span>
        </div>
      </div>

      {/* Concept */}
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
        textTransform: "uppercase", color: "var(--text-lo)", marginBottom: 8,
      }}>
        Concept
      </p>
      <div style={{
        borderLeft: `2px solid ${accentColor}`,
        background: `linear-gradient(90deg, rgba(${accentRgb},0.08) 0%, transparent 75%)`,
        borderRadius: "0 10px 10px 0",
        padding: "13px 16px", marginBottom: "1.25rem",
        fontSize: 14, color: "var(--text-lo)", lineHeight: 1.72,
      }}>
        {mod.concept}
      </div>

      {/* Syntax */}
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
        textTransform: "uppercase", color: "var(--text-lo)", marginBottom: 8,
      }}>
        Syntax pattern
      </p>
      <div style={{
        background: "rgba(10,13,20,0.8)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(35,46,68,0.8)",
        borderRadius: 12, padding: "16px 18px", marginBottom: "1.25rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* top label */}
        <div style={{
          position: "absolute", top: 10, right: 14,
          fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em",
          color: "rgba(139,149,172,0.35)", textTransform: "uppercase",
        }}>
          SQLite
        </div>
        <pre style={{
          fontFamily: "var(--font-mono)", fontSize: 12.5,
          color: "var(--terminal)", lineHeight: 1.75,
          overflowX: "auto", whiteSpace: "pre", margin: 0,
          textShadow: "0 0 8px rgba(67,242,160,0.2)",
        }}>
          {mod.syntax}
        </pre>
      </div>

      {/* Key points */}
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
        textTransform: "uppercase", color: "var(--text-lo)", marginBottom: 10,
      }}>
        Key points
      </p>
      <div style={{
        display: "flex", flexDirection: "column", gap: 7, marginBottom: "1.75rem",
      }}>
        {mod.keyPoints.map((pt, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 12,
            background: "rgba(18,26,41,0.5)",
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(35,46,68,0.6)",
            borderRadius: 10, padding: "10px 14px",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
              color: "var(--terminal)", flexShrink: 0, marginTop: 1,
              textShadow: "0 0 8px rgba(67,242,160,0.4)",
            }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p style={{
              fontSize: 13.5, color: "var(--text-lo)", lineHeight: 1.55, margin: 0,
            }}>
              {pt}
            </p>
          </div>
        ))}
      </div>

      {/* Practice CTA */}
      <button
        onClick={() => onPractice(mod.startIdx, mod.endIdx)}
        style={{
          width: "100%", padding: "13px",
          fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          borderRadius: 12,
          border: `1px solid rgba(${accentRgb},0.5)`,
          color: accentColor,
          background: `rgba(${accentRgb},0.1)`,
          cursor: "pointer", textAlign: "center",
          boxShadow: `0 0 24px -8px rgba(${accentRgb},0.4)`,
          transition: "all 0.18s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `rgba(${accentRgb},0.18)`;
          e.currentTarget.style.boxShadow = `0 0 36px -6px rgba(${accentRgb},0.6)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = `rgba(${accentRgb},0.1)`;
          e.currentTarget.style.boxShadow = `0 0 24px -8px rgba(${accentRgb},0.4)`;
        }}
      >
        Practice {mod.ticketRange} →
      </button>
    </div>
  );
}
