import type { Mission } from "../missions/level001";

export const bi013: Mission = {
  id: "bi-ticket-013",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-013 // Priority: Medium",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "12:00 PM. Internal system. Priority: Medium.",
    "\"Rolling 3-month average — smooths out the noise so the trend line is readable. ROWS BETWEEN 2 PRECEDING AND CURRENT ROW is the frame spec for 'me plus two months back'.\"",
  ],
  objective:
    "Select every period's revenue and its rolling 3-month average (rounded to 0 decimals), sorted chronologically.",
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
  expectedColumns: ["period", "revenue", "rolling_3m_avg"],
  expectedRows: [
    ["2025-01", 180000, 180000],
    ["2025-02", 165000, 173000],
    ["2025-03", 210000, 185000],
    ["2025-04", 195000, 190000],
    ["2025-05", 220000, 208000],
    ["2025-06", 240000, 218000],
    ["2025-07", 205000, 222000],
    ["2025-08", 215000, 220000],
    ["2025-09", 235000, 218000],
    ["2025-10", 250000, 233000],
    ["2025-11", 280000, 255000],
    ["2025-12", 310000, 280000],
    ["2026-01", 195000, 272000],
    ["2026-02", 182000, 229000],
    ["2026-03", 228000, 202000],
    ["2026-04", 210000, 207000],
    ["2026-05", 245000, 228000],
    ["2026-06", 268000, 241000],
    ["2026-07", 222000, 245000],
    ["2026-08", 238000, 243000],
    ["2026-09", 255000, 238000],
  ],
  requireRowOrder: true,
  hints: [
    "AVG(revenue) OVER (ORDER BY period ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) — the frame clause 'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW' is what makes it exactly 3 months.",
    "The first two rows have fewer than 3 predecessors so they average over 1 and 2 rows respectively — that's correct frame behaviour.",
    "Try: SELECT period, revenue, ROUND(AVG(revenue) OVER (ORDER BY period ROWS BETWEEN 2 PRECEDING AND CURRENT ROW),0) AS rolling_3m_avg FROM monthly_revenue ORDER BY period;",
  ],
  xpAward: 250,
};
