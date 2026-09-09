import type { Mission } from "../missions/level001";

export const bi016: Mission = {
  id: "bi-ticket-016",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-016 // Priority: Critical",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "02:15 PM. Internal system. Priority: Critical.",
    "\"Module capstone — full time intelligence dashboard for 2026. YTD, rolling 3-month average, SPLY, and YoY growth percentage, side by side, one row per month. Every BI time-series dashboard starts with this exact query shape.\"",
  ],
  objective:
    "For each 2026 period, select revenue, YTD cumulative, rolling 3-month average (0 decimals), prior year revenue, and YoY growth percentage (1 decimal), sorted chronologically.",
  schemaLabel: "monthly_revenue",
  seedSql: `
    CREATE TABLE monthly_revenue (
      id INTEGER PRIMARY KEY, period TEXT, year INTEGER,
      month INTEGER, revenue INTEGER
    );
    INSERT INTO monthly_revenue (id, period, year, month, revenue) VALUES
      (1,'2025-01',2025,1,180000),(2,'2025-02',2025,2,165000),
      (3,'2025-03',2025,3,210000),(4,'2025-04',2025,4,195000),
      (5,'2025-05',2025,5,220000),(6,'2025-06',2025,6,240000),
      (7,'2025-07',2025,7,205000),(8,'2025-08',2025,8,215000),
      (9,'2025-09',2025,9,235000),(10,'2025-10',2025,10,250000),
      (11,'2025-11',2025,11,280000),(12,'2025-12',2025,12,310000),
      (13,'2026-01',2026,1,195000),(14,'2026-02',2026,2,182000),
      (15,'2026-03',2026,3,228000),(16,'2026-04',2026,4,210000),
      (17,'2026-05',2026,5,245000),(18,'2026-06',2026,6,268000),
      (19,'2026-07',2026,7,222000),(20,'2026-08',2026,8,238000),
      (21,'2026-09',2026,9,255000);
  `,
  schemaPreview: [{ table: "monthly_revenue", columns: ["id","period","year","month","revenue"] }],
  expectedColumns: ["period", "revenue", "ytd", "rolling_3m", "sply", "yoy_pct"],
  expectedRows: [
    ["2026-01", 195000, 195000, 195000, 180000, 8.3],
    ["2026-02", 182000, 377000, 189000, 165000, 10.3],
    ["2026-03", 228000, 605000, 202000, 210000, 8.6],
    ["2026-04", 210000, 815000, 207000, 195000, 7.7],
    ["2026-05", 245000, 1060000, 228000, 220000, 11.4],
    ["2026-06", 268000, 1328000, 241000, 240000, 11.7],
    ["2026-07", 222000, 1550000, 245000, 205000, 8.3],
    ["2026-08", 238000, 1788000, 243000, 215000, 10.7],
    ["2026-09", 255000, 2043000, 238000, 235000, 8.5],
  ],
  requireRowOrder: true,
  hints: [
    "Four metrics, one query: YTD uses PARTITION BY year ORDER BY period window; rolling 3m uses ROWS BETWEEN 2 PRECEDING AND CURRENT ROW; SPLY comes from a self-join on month + year+1; YoY is the ratio of their difference.",
    "Build the self-join for SPLY first (LEFT JOIN so months without a prior year still appear), then add the window expressions as columns in the same SELECT.",
    "Try: SELECT c.period, c.revenue, SUM(c.revenue) OVER (PARTITION BY c.year ORDER BY c.period) AS ytd, ROUND(AVG(c.revenue) OVER (ORDER BY c.period ROWS BETWEEN 2 PRECEDING AND CURRENT ROW),0) AS rolling_3m, p.revenue AS sply, ROUND(100.0*(c.revenue-p.revenue)/p.revenue,1) AS yoy_pct FROM monthly_revenue c LEFT JOIN monthly_revenue p ON c.month=p.month AND c.year=p.year+1 WHERE c.year=2026 ORDER BY c.period;",
  ],
  xpAward: 300,
};
