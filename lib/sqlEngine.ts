import type { Database, SqlJsStatic } from "sql.js";

let sqlPromise: Promise<SqlJsStatic> | null = null;

/**
 * Lazily loads the sql.js WASM runtime exactly once per browser session.
 * The .wasm binary is served from /public/sql-wasm so no CDN is required.
 */
function loadSqlJs(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = import("sql.js").then((mod) =>
      mod.default({
        locateFile: (file: string) => `/sql-wasm/${file}`,
      })
    );
  }
  return sqlPromise;
}

export interface QueryResult {
  columns: string[];
  rows: unknown[][];
}

export interface RunOutcome {
  ok: boolean;
  results: QueryResult[];
  error?: string;
}

/**
 * Spins up a fresh in-memory database seeded with the given SQL, then
 * runs the player's query against it. Each mission gets its own database
 * so player queries can never corrupt seed data between attempts.
 */
export async function runMissionQuery(
  seedSql: string,
  playerQuery: string
): Promise<RunOutcome> {
  const SQL = await loadSqlJs();
  const db: Database = new SQL.Database();

  try {
    db.run(seedSql);
  } catch (err) {
    db.close();
    return {
      ok: false,
      results: [],
      error: `Internal seed error: ${(err as Error).message}`,
    };
  }

  try {
    const raw = db.exec(playerQuery);
    const results: QueryResult[] = raw.map((r) => ({
      columns: r.columns,
      rows: r.values,
    }));
    db.close();
    return { ok: true, results };
  } catch (err) {
    db.close();
    return { ok: false, results: [], error: (err as Error).message };
  }
}

/**
 * Order-insensitive comparison of a player's result set against the
 * mission's expected rows. Column order matters (SELECT order is part
 * of the skill being taught); row order does not unless the mission
 * explicitly requires ORDER BY.
 */
export function resultsMatch(
  actual: QueryResult | undefined,
  expectedColumns: string[],
  expectedRows: unknown[][],
  requireRowOrder: boolean
): boolean {
  if (!actual) return false;
  if (actual.columns.length !== expectedColumns.length) return false;
  const colsMatch = actual.columns.every(
    (c, i) => c.toLowerCase() === expectedColumns[i].toLowerCase()
  );
  if (!colsMatch) return false;
  if (actual.rows.length !== expectedRows.length) return false;

  const normalize = (rows: unknown[][]) =>
    rows.map((row) => JSON.stringify(row)).sort();

  if (requireRowOrder) {
    return JSON.stringify(actual.rows) === JSON.stringify(expectedRows);
  }
  const a = normalize(actual.rows);
  const b = normalize(expectedRows);
  return JSON.stringify(a) === JSON.stringify(b);
}
