import type { Mission } from "../missions/level001";

export const bi010: Mission = {
  id: "bi-ticket-010",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-010 // Priority: Medium",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "09:45 AM. Internal system. Priority: Medium.",
    "\"Quarter labels — tag every month with its quarter. Used in every BI tool as a drill-down layer between year and month. CASE on the month number is the SQLite way; most cloud warehouses have a QUARTER() function.\"",
  ],
  objective:
    "Select every period's year, month, revenue, and its quarter label (Q1/Q2/Q3/Q4), sorted chronologically.",
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
  expectedColumns: ["period", "year", "month", "revenue", "quarter"],
  expectedRows: [
    ["2025-01", 2025, 1, 180000, "Q1"],
    ["2025-02", 2025, 2, 165000, "Q1"],
    ["2025-03", 2025, 3, 210000, "Q1"],
    ["2025-04", 2025, 4, 195000, "Q2"],
    ["2025-05", 2025, 5, 220000, "Q2"],
    ["2025-06", 2025, 6, 240000, "Q2"],
    ["2025-07", 2025, 7, 205000, "Q3"],
    ["2025-08", 2025, 8, 215000, "Q3"],
    ["2025-09", 2025, 9, 235000, "Q3"],
    ["2025-10", 2025, 10, 250000, "Q4"],
    ["2025-11", 2025, 11, 280000, "Q4"],
    ["2025-12", 2025, 12, 310000, "Q4"],
    ["2026-01", 2026, 1, 195000, "Q1"],
    ["2026-02", 2026, 2, 182000, "Q1"],
    ["2026-03", 2026, 3, 228000, "Q1"],
    ["2026-04", 2026, 4, 210000, "Q2"],
    ["2026-05", 2026, 5, 245000, "Q2"],
    ["2026-06", 2026, 6, 268000, "Q2"],
    ["2026-07", 2026, 7, 222000, "Q3"],
    ["2026-08", 2026, 8, 238000, "Q3"],
    ["2026-09", 2026, 9, 255000, "Q3"],
  ],
  requireRowOrder: true,
  hints: [
    "CASE WHEN month <= 3 THEN 'Q1' WHEN month <= 6 THEN 'Q2' WHEN month <= 9 THEN 'Q3' ELSE 'Q4' END — a computed column, no aggregate needed.",
    "Try: SELECT period, year, month, revenue, CASE WHEN month<=3 THEN 'Q1' WHEN month<=6 THEN 'Q2' WHEN month<=9 THEN 'Q3' ELSE 'Q4' END AS quarter FROM monthly_revenue ORDER BY period;",
  ],
  xpAward: 200,
};
