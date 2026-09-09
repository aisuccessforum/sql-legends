import type { Mission } from "../missions/level001";

export const bi012: Mission = {
  id: "bi-ticket-012",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-012 // Priority: Critical",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "11:15 AM. Internal system. Priority: Critical.",
    "\"Same period last year (SPLY) — the comparison every board member asks for. Join the table to itself on matching month but adjacent year, then show the change and the growth rate.\"",
  ],
  objective:
    "For each 2026 period, show current revenue, prior year revenue, the absolute change, and YoY growth percentage (1 decimal), sorted by period.",
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
  expectedColumns: ["period", "current_rev", "prior_year_rev", "yoy_change", "yoy_pct"],
  expectedRows: [
    ["2026-01", 195000, 180000, 15000, 8.3],
    ["2026-02", 182000, 165000, 17000, 10.3],
    ["2026-03", 228000, 210000, 18000, 8.6],
    ["2026-04", 210000, 195000, 15000, 7.7],
    ["2026-05", 245000, 220000, 25000, 11.4],
    ["2026-06", 268000, 240000, 28000, 11.7],
    ["2026-07", 222000, 205000, 17000, 8.3],
    ["2026-08", 238000, 215000, 23000, 10.7],
    ["2026-09", 255000, 235000, 20000, 8.5],
  ],
  requireRowOrder: true,
  hints: [
    "Self-join the monthly_revenue table — current year alias 'c', prior year alias 'p' — matching on c.month = p.month AND c.year = p.year + 1.",
    "Divide (current - prior) by prior for the percentage; NULLIF guard isn't needed here since 2025 has all 12 months.",
    "Try: SELECT c.period, c.revenue AS current_rev, p.revenue AS prior_year_rev, c.revenue-p.revenue AS yoy_change, ROUND(100.0*(c.revenue-p.revenue)/p.revenue,1) AS yoy_pct FROM monthly_revenue c JOIN monthly_revenue p ON c.month=p.month AND c.year=p.year+1 ORDER BY c.period;",
  ],
  xpAward: 275,
};
