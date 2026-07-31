import type { Mission } from "../missions/level001";

export const junior033: Mission = {
  id: "junior-ticket-033",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-033 // Priority: Critical",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "01:00 PM. Internal system. Priority: Critical.",
    "\"Find every month where revenue actually dropped from the month before — not the amount, just which months.\"",
    "\"Same rule as always: a window function's result can't be filtered directly in WHERE. Compute it in a CTE, then filter the CTE.\"",
  ],
  objective:
    "Using a CTE with each month's previous-month revenue, select every month where revenue was lower than the previous month.",
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
  expectedColumns: ["month", "revenue", "prev"],
  expectedRows: [
    ["Feb", 385000, 420000],
    ["May", 475000, 510000],
    ["Jul", 495000, 530000],
    ["Sep", 545000, 560000],
    ["Nov", 580000, 610000],
  ],
  requireRowOrder: false,
  hints: [
    "Build the CTE with LAG(revenue) OVER (ORDER BY id) AS prev, alongside month and revenue.",
    "The outer query filters on revenue < prev — a comparison that only makes sense once prev is a real column.",
    "Try: WITH momo AS (SELECT month, revenue, LAG(revenue) OVER (ORDER BY id) AS prev FROM monthly_metrics) SELECT month, revenue, prev FROM momo WHERE revenue < prev;",
  ],
  xpAward: 200,
};
