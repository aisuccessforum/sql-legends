import type { Mission } from "../missions/level001";

export const junior027: Mission = {
  id: "junior-ticket-027",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-027 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "New sub-module — time series. Finance wants a cumulative revenue chart for the board deck.",
    "\"Not each month's revenue on its own — the running total as the year builds. January's total is just January. February's total is January plus February. And so on.\"",
    "\"Same SUM() you already know, but instead of collapsing every row into one number, OVER makes it accumulate row by row.\"",
  ],
  objective:
    "Select each month's revenue along with the running total of revenue through that month.",
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
  expectedColumns: ["month", "revenue", "running_total"],
  expectedRows: [
    ["Jan", 420000, 420000],
    ["Feb", 385000, 805000],
    ["Mar", 460000, 1265000],
    ["Apr", 510000, 1775000],
    ["May", 475000, 2250000],
    ["Jun", 530000, 2780000],
    ["Jul", 495000, 3275000],
    ["Aug", 560000, 3835000],
    ["Sep", 545000, 4380000],
    ["Oct", 610000, 4990000],
    ["Nov", 580000, 5570000],
    ["Dec", 650000, 6220000],
  ],
  requireRowOrder: true,
  hints: [
    "SUM() OVER (ORDER BY ...) without PARTITION BY, by default, adds up everything from the start of the ordering through the current row.",
    "The id column preserves the correct chronological order — order by that, not by month name.",
    "Try: SELECT month, revenue, SUM(revenue) OVER (ORDER BY id) AS running_total FROM monthly_metrics ORDER BY id;",
  ],
  xpAward: 175,
};
