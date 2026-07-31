import type { Mission } from "../missions/level001";

export const junior028: Mission = {
  id: "junior-ticket-028",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-028 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:35 AM. Internal system. Priority: Medium.",
    "\"Add the running average alongside that running total — how the year-to-date average revenue per month has been trending, right next to the cumulative number.\"",
  ],
  objective:
    "Select each month's revenue, running total, and running average revenue through that month.",
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
  expectedColumns: ["month", "revenue", "running_total", "running_avg"],
  expectedRows: [
    ["Jan", 420000, 420000, 420000],
    ["Feb", 385000, 805000, 402500],
    ["Mar", 460000, 1265000, 421666.6666666667],
    ["Apr", 510000, 1775000, 443750],
    ["May", 475000, 2250000, 450000],
    ["Jun", 530000, 2780000, 463333.3333333333],
    ["Jul", 495000, 3275000, 467857.14285714284],
    ["Aug", 560000, 3835000, 479375],
    ["Sep", 545000, 4380000, 486666.6666666667],
    ["Oct", 610000, 4990000, 499000],
    ["Nov", 580000, 5570000, 506363.63636363635],
    ["Dec", 650000, 6220000, 518333.3333333333],
  ],
  requireRowOrder: true,
  hints: [
    "You can put more than one window function in the same SELECT list, each with its own OVER clause.",
    "AVG() OVER (ORDER BY ...) works the same way SUM() did — accumulating through the current row.",
    "Try: SELECT month, revenue, SUM(revenue) OVER (ORDER BY id) AS running_total, AVG(revenue) OVER (ORDER BY id) AS running_avg FROM monthly_metrics ORDER BY id;",
  ],
  xpAward: 175,
};
