"use client";

import { useState } from "react";
import type { Mission } from "@/content/missions/level001";
import { resultsMatch, runMissionQuery, type QueryResult } from "@/lib/sqlEngine";
import { useGameStore } from "@/store/useGameStore";

type Status = "idle" | "running" | "success" | "wrong" | "error";

export default function SqlTerminal({ mission }: { mission: Mission }) {
  const [query, setQuery] = useState("SELECT ");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<QueryResult | undefined>();
  const [errorMsg, setErrorMsg] = useState("");
  const [hintsShown, setHintsShown] = useState(0);
  const completeMission = useGameStore((s) => s.completeMission);
  const alreadyDone = useGameStore((s) =>
    s.completedMissions.includes(mission.id)
  );

  const lineCount = Math.max(query.split("\n").length, 1);

  async function handleRun() {
    if (!query.trim()) return;
    setStatus("running");
    setErrorMsg("");

    try {
      const outcome = await runMissionQuery(mission.seedSql, query);

      if (!outcome.ok) {
        setStatus("error");
        setErrorMsg(outcome.error ?? "Query failed.");
        setResult(undefined);
        return;
      }

      const first = outcome.results[0];
      setResult(first);

      const correct = resultsMatch(
        first,
        mission.expectedColumns,
        mission.expectedRows,
        mission.requireRowOrder
      );

      if (correct) {
        setStatus("success");
        completeMission(mission.id, mission.xpAward);
      } else {
        setStatus("wrong");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        `Unexpected error: ${err instanceof Error ? err.message : String(err)}`
      );
      setResult(undefined);
    }
  }

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto console-scroll p-5 sm:p-6">
      {/* Schema chips */}
      <div>
        <div
          className="mb-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em]"
          style={{ color: "var(--text-lo)" }}
        >
          SCHEMA
        </div>
        <div className="flex flex-wrap gap-2">
          {mission.schemaPreview.map((t) => (
            <div
              key={t.table}
              className="rounded-md border px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs"
              style={{ borderColor: "var(--console-line)", background: "var(--console)" }}
            >
              <span style={{ color: "var(--clearance)" }}>{t.table}</span>
              <span style={{ color: "var(--text-lo)" }}>
                {" "}
                ({t.columns.join(", ")})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div>
        <div
          className="mb-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em]"
          style={{ color: "var(--text-lo)" }}
        >
          QUERY EDITOR
        </div>
        <div
          className="flex overflow-hidden rounded-lg border"
          style={{ borderColor: "var(--console-line)", background: "var(--console-raised)" }}
        >
          <div
            className="select-none px-3 py-3 text-right font-[family-name:var(--font-mono)] text-sm"
            style={{ color: "var(--text-lo)", background: "var(--console)" }}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            spellCheck={false}
            rows={Math.max(lineCount, 4)}
            className="w-full resize-none bg-transparent px-3 py-3 font-[family-name:var(--font-mono)] text-sm outline-none"
            style={{ color: "var(--terminal)" }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleRun}
          disabled={status === "running"}
          className="rounded-md px-4 py-2 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--terminal)", color: "var(--void)" }}
        >
          {status === "running" ? "EXECUTING..." : "EXECUTE QUERY"}
        </button>

        {hintsShown < mission.hints.length && (
          <button
            onClick={() => setHintsShown((n) => n + 1)}
            className="font-[family-name:var(--font-mono)] text-xs underline decoration-dotted"
            style={{ color: "var(--text-lo)" }}
          >
            request hint ({hintsShown}/{mission.hints.length})
          </button>
        )}
      </div>

      {hintsShown > 0 && (
        <ul className="space-y-1">
          {mission.hints.slice(0, hintsShown).map((h, i) => (
            <li
              key={i}
              className="font-[family-name:var(--font-mono)] text-xs"
              style={{ color: "var(--dossier)" }}
            >
              hint {i + 1}: {h}
            </li>
          ))}
        </ul>
      )}

      {/* Result readout */}
      <div>
        <div
          className="mb-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em]"
          style={{ color: "var(--text-lo)" }}
        >
          RESULT SET
        </div>

        {status === "idle" && (
          <p className="font-[family-name:var(--font-mono)] text-xs" style={{ color: "var(--text-lo)" }}>
            Run a query to see output here.
          </p>
        )}

        {status === "error" && (
          <div
            className="rounded-md border px-3 py-2 font-[family-name:var(--font-mono)] text-xs"
            style={{ borderColor: "var(--danger)", color: "var(--danger)" }}
          >
            {errorMsg}
          </div>
        )}

        {(status === "success" || status === "wrong") && result && (
          <div
            className="overflow-x-auto rounded-lg border"
            style={{ borderColor: "var(--console-line)" }}
          >
            <table className="w-full border-collapse font-[family-name:var(--font-mono)] text-xs">
              <thead>
                <tr style={{ background: "var(--console)" }}>
                  {result.columns.map((c) => (
                    <th
                      key={c}
                      className="border-b px-3 py-2 text-left"
                      style={{ borderColor: "var(--console-line)", color: "var(--clearance)" }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="border-b px-3 py-2"
                        style={{ borderColor: "var(--console-line)" }}
                      >
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
                {result.rows.length === 0 && (
                  <tr>
                    <td
                      className="px-3 py-2"
                      style={{ color: "var(--text-lo)" }}
                      colSpan={result.columns.length || 1}
                    >
                      (0 rows)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {status === "wrong" && (
          <p className="mt-2 font-[family-name:var(--font-mono)] text-xs" style={{ color: "var(--danger)" }}>
            Not quite what Director Okafor asked for. Check the objective and try again.
          </p>
        )}

        {status === "success" && (
          <p className="mt-2 font-[family-name:var(--font-mono)] text-xs" style={{ color: "var(--terminal)" }}>
            {alreadyDone ? "Mission already logged." : `Correct. +${mission.xpAward} XP logged.`}
          </p>
        )}
      </div>
    </section>
  );
}