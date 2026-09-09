import type { Mission } from "../missions/level001";

export const bi014: Mission = {
  id: "bi-ticket-014",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-014 // Priority: Medium",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "12:45 PM. Internal system. Priority: Medium.",
    "\"Best and worst month per year — two numbers every QBR starts with. RANK() twice in a CTE, CASE in the outer to pivot.\"",
  ],
  objective:
    "For each year, show the period and revenue of the best and worst month, sorted by year.",
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
  expectedColumns: ["year", "best_month", "best_revenue", "worst_month", "worst_revenue"],
  expectedRows: [
    [2025, "2025-12", 310000, "2025-02", 165000],
    [2026, "2026-06", 268000, "2026-02", 182000],
  ],
  requireRowOrder: true,
  hints: [
    "Two RANK() window functions in the same CTE — one ordered by revenue DESC for best, one ASC for worst.",
    "In the outer SELECT, MAX(CASE WHEN best_rank=1 THEN period END) pulls the one matching period per year group.",
    "Try: WITH ranked AS (SELECT year, period, revenue, RANK() OVER (PARTITION BY year ORDER BY revenue DESC) AS best_rank, RANK() OVER (PARTITION BY year ORDER BY revenue ASC) AS worst_rank FROM monthly_revenue) SELECT year, MAX(CASE WHEN best_rank=1 THEN period END) AS best_month, MAX(CASE WHEN best_rank=1 THEN revenue END) AS best_revenue, MAX(CASE WHEN worst_rank=1 THEN period END) AS worst_month, MAX(CASE WHEN worst_rank=1 THEN revenue END) AS worst_revenue FROM ranked GROUP BY year ORDER BY year;",
  ],
  xpAward: 250,
};
