import type { Mission } from "../missions/level001";

export const junior029: Mission = {
  id: "junior-ticket-029",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-029 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "10:10 AM. Internal system. Priority: Medium.",
    "\"Different tool now. Put each month's revenue next to the PREVIOUS month's, in the same row — nobody should have to scroll up to compare.\"",
    "\"LAG reaches back to an earlier row in the ordering. January has nothing before it, so expect a blank there — that's correct, not a bug.\"",
  ],
  objective:
    "Select each month's revenue along with the previous month's revenue in the same row.",
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
  expectedColumns: ["month", "revenue", "prev_month_revenue"],
  expectedRows: [
    ["Jan", 420000, null],
    ["Feb", 385000, 420000],
    ["Mar", 460000, 385000],
    ["Apr", 510000, 460000],
    ["May", 475000, 510000],
    ["Jun", 530000, 475000],
    ["Jul", 495000, 530000],
    ["Aug", 560000, 495000],
    ["Sep", 545000, 560000],
    ["Oct", 610000, 545000],
    ["Nov", 580000, 610000],
    ["Dec", 650000, 580000],
  ],
  requireRowOrder: true,
  hints: [
    "LAG(column) OVER (ORDER BY ...) pulls the value from one row back in that ordering.",
    "The very first row in the ordering has no row before it — LAG returns NULL there, which is expected.",
    "Try: SELECT month, revenue, LAG(revenue) OVER (ORDER BY id) AS prev_month_revenue FROM monthly_metrics ORDER BY id;",
  ],
  xpAward: 175,
};
