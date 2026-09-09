import type { Mission } from "../missions/level001";

export const bi009: Mission = {
  id: "bi-ticket-009",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-009 // Priority: High",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"New module — time intelligence. Revenue numbers without time context are noise. First pattern: YTD, partitioned by year so January of 2026 resets to zero instead of carrying forward 2025's total.\"",
  ],
  objective:
    "Select every period's revenue and its year-to-date cumulative total, partitioned by year, sorted chronologically.",
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
  expectedColumns: ["year", "period", "revenue", "ytd_revenue"],
  expectedRows: [
    [2025, "2025-01", 180000, 180000],
    [2025, "2025-02", 165000, 345000],
    [2025, "2025-03", 210000, 555000],
    [2025, "2025-04", 195000, 750000],
    [2025, "2025-05", 220000, 970000],
    [2025, "2025-06", 240000, 1210000],
    [2025, "2025-07", 205000, 1415000],
    [2025, "2025-08", 215000, 1630000],
    [2025, "2025-09", 235000, 1865000],
    [2025, "2025-10", 250000, 2115000],
    [2025, "2025-11", 280000, 2395000],
    [2025, "2025-12", 310000, 2705000],
    [2026, "2026-01", 195000, 195000],
    [2026, "2026-02", 182000, 377000],
    [2026, "2026-03", 228000, 605000],
    [2026, "2026-04", 210000, 815000],
    [2026, "2026-05", 245000, 1060000],
    [2026, "2026-06", 268000, 1328000],
    [2026, "2026-07", 222000, 1550000],
    [2026, "2026-08", 238000, 1788000],
    [2026, "2026-09", 255000, 2043000],
  ],
  requireRowOrder: true,
  hints: [
    "SUM(revenue) OVER (PARTITION BY year ORDER BY period) — the PARTITION BY year is what makes January 2026 start fresh at zero instead of continuing from December 2025.",
    "Without PARTITION BY year this would be a running total across all 21 rows — technically a running total, but useless as a BI metric.",
    "Try: SELECT year, period, revenue, SUM(revenue) OVER (PARTITION BY year ORDER BY period) AS ytd_revenue FROM monthly_revenue ORDER BY period;",
  ],
  xpAward: 225,
};
