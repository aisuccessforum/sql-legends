import type { Mission } from "../missions/level001";

export const junior031: Mission = {
  id: "junior-ticket-031",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-031 // Priority: Low",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "11:20 AM. Internal system. Priority: Low.",
    "\"Flip it around — next month's revenue next to the current one, not the previous. Same idea, opposite direction.\"",
  ],
  objective:
    "Select each month's revenue along with the next month's revenue in the same row.",
  schemaLabel: "monthly_metrics",
  seedSql: `
    CREATE TABLE monthly_metrics (
      id INTEGER PRIMARY KEY,
      month TEXT,
      revenue INTEGER,
      new_clients INTEGER
    );
    INSERT INTO monthly_metrics (id, month, revenue, new_clients) VALUES
      (1, 'Jan', 420000, 4),
      (2, 'Feb', 385000, 3),
      (3, 'Mar', 460000, 5),
      (4, 'Apr', 510000, 6),
      (5, 'May', 475000, 4),
      (6, 'Jun', 530000, 7),
      (7, 'Jul', 495000, 5),
      (8, 'Aug', 560000, 8),
      (9, 'Sep', 545000, 6),
      (10, 'Oct', 610000, 9),
      (11, 'Nov', 580000, 7),
      (12, 'Dec', 650000, 10);
  `,
  schemaPreview: [
    { table: "monthly_metrics", columns: ["id", "month", "revenue", "new_clients"] },
  ],
  expectedColumns: ["month", "revenue", "next_month_revenue"],
  expectedRows: [
    ["Jan", 420000, 385000],
    ["Feb", 385000, 460000],
    ["Mar", 460000, 510000],
    ["Apr", 510000, 475000],
    ["May", 475000, 530000],
    ["Jun", 530000, 495000],
    ["Jul", 495000, 560000],
    ["Aug", 560000, 545000],
    ["Sep", 545000, 610000],
    ["Oct", 610000, 580000],
    ["Nov", 580000, 650000],
    ["Dec", 650000, null],
  ],
  requireRowOrder: true,
  hints: [
    "LEAD is LAG's mirror image — it reaches forward instead of back.",
    "This time it's December with nothing after it, so December's next_month_revenue will be NULL.",
    "Try: SELECT month, revenue, LEAD(revenue) OVER (ORDER BY id) AS next_month_revenue FROM monthly_metrics ORDER BY id;",
  ],
  xpAward: 175,
};
