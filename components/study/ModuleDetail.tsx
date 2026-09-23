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
        Study guide
      </button>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: "1.25rem",
        }}
      >
        <div>
          <p style={{ fontSize: 20, fontWeight: 500, color: "var(--text-primary)", marginBottom: 3 }}>
            {mod.title}
          </p>
          <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            Module {mod.num} of {totalModules} · {rankName}
          </p>
        </div>
        <span
          style={{
            fontSize: 11,
            padding: "4px 12px",
            borderRadius: 20,
            background: "var(--bg-accent)",
            color: "var(--text-accent)",
            border: "0.5px solid var(--border-accent)",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {mod.ticketRange}
        </span>
      </div>

      {/* Concept */}
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.07em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        Concept
      </p>
      <div
        style={{
          background: "var(--surface-1)",
          borderLeft: "3px solid var(--border-accent)",
          borderRadius: "0 8px 8px 0",
          padding: "11px 15px",
          fontSize: 14,
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          marginBottom: "1.25rem",
        }}
      >
        {mod.concept}
      </div>

      {/* Syntax */}
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.07em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        Syntax pattern
      </p>
      <pre
        style={{
          background: "var(--surface-0)",
          borderRadius: 8,
          padding: "12px 15px",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--text-primary)",
          border: "0.5px solid var(--border)",
          lineHeight: 1.7,
          overflowX: "auto",
          marginBottom: "1.25rem",
          whiteSpace: "pre",
        }}
      >
        {mod.syntax}
      </pre>

      {/* Key points */}
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.07em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        Key points
      </p>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: "1.5rem",
        }}
      >
        {mod.keyPoints.map((pt, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-success)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: 2 }}
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {pt}
          </li>
        ))}
      </ul>

      {/* Practice CTA */}
      <button
        onClick={() => onPractice(mod.startIdx, mod.endIdx)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: 14,
          fontWeight: 500,
          borderRadius: 8,
          border: "0.5px solid var(--border-accent)",
          color: "var(--text-accent)",
          background: "var(--bg-accent)",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        Practice {mod.ticketRange} →
      </button>
    </div>
  );
}
