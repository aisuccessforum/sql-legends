import type { Mission } from "../missions/level001";

export const bi015: Mission = {
  id: "bi-ticket-015",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-015 // Priority: Medium",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "01:30 PM. Internal system. Priority: Medium.",
    "\"Target tracking — which was the first month where YTD revenue crossed 1,500,000 in 2025? Finance uses this to confirm pacing against annual targets.\"",
  ],
  objective:
    "Find the first period in 2025 where the YTD cumulative revenue reached or exceeded 1,500,000.",
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
  expectedColumns: ["period", "cumulative"],
  expectedRows: [
    ["2025-08", 1630000],
  ],
  requireRowOrder: false,
  hints: [
    "Build the YTD cumulative in a CTE (partitioned by year, ordered by period), then filter the outer query to 2025 rows where cumulative >= 1500000, and take the first one with LIMIT 1 ORDER BY period.",
    "Try: WITH ytd AS (SELECT period, year, revenue, SUM(revenue) OVER (PARTITION BY year ORDER BY period) AS cumulative FROM monthly_revenue WHERE year=2025) SELECT period, cumulative FROM ytd WHERE cumulative>=1500000 ORDER BY period LIMIT 1;",
  ],
  xpAward: 225,
};
