import type { Mission } from "../missions/level001";

export const bi011: Mission = {
  id: "bi-ticket-011",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-011 // Priority: High",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "10:30 AM. Internal system. Priority: High.",
    "\"Quarterly revenue pivot per year — boards think in quarters, not months. One row per year, Q1 through Q4 as columns, plus annual total.\"",
  ],
  objective:
    "For each year, show Q1, Q2, Q3, and Q4 revenue totals, plus the annual total, sorted by year.",
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
  expectedColumns: ["year", "q1", "q2", "q3", "q4", "annual_total"],
  expectedRows: [
    [2025, 555000, 655000, 655000, 840000, 2705000],
    [2026, 605000, 723000, 715000, 0, 2043000],
  ],
  requireRowOrder: true,
  hints: [
    "Conditional SUM per quarter column using the CASE month logic from the last ticket, inside SUM.",
    "2026's Q4 is 0 because data only runs through September — that's correct, not a bug.",
    "Try: SELECT year, SUM(CASE WHEN month<=3 THEN revenue ELSE 0 END) AS q1, SUM(CASE WHEN month BETWEEN 4 AND 6 THEN revenue ELSE 0 END) AS q2, SUM(CASE WHEN month BETWEEN 7 AND 9 THEN revenue ELSE 0 END) AS q3, SUM(CASE WHEN month>=10 THEN revenue ELSE 0 END) AS q4, SUM(revenue) AS annual_total FROM monthly_revenue GROUP BY year ORDER BY year;",
  ],
  xpAward: 250,
};
