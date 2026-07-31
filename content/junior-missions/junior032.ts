import type { Mission } from "../missions/level001";

export const junior032: Mission = {
  id: "junior-ticket-032",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-032 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "12:00 PM. Internal system. Priority: High.",
    "\"Single months are noisy. Give me a 3-month rolling average — each month's average revenue including itself and the two months before it, not the whole year to date.\"",
    "\"This needs a frame — telling the window function exactly how far back to look, instead of the default 'everything so far.'\"",
  ],
  objective:
    "Select each month's revenue along with a 3-month rolling average (the current month and the two before it).",
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
  expectedColumns: ["month", "revenue", "rolling_3mo_avg"],
  expectedRows: [
    ["Jan", 420000, 420000],
    ["Feb", 385000, 402500],
    ["Mar", 460000, 421666.6666666667],
    ["Apr", 510000, 451666.6666666667],
    ["May", 475000, 481666.6666666667],
    ["Jun", 530000, 505000],
    ["Jul", 495000, 500000],
    ["Aug", 560000, 528333.3333333334],
    ["Sep", 545000, 533333.3333333334],
    ["Oct", 610000, 571666.6666666666],
    ["Nov", 580000, 578333.3333333334],
    ["Dec", 650000, 613333.3333333334],
  ],
  requireRowOrder: true,
  hints: [
    "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW explicitly limits the window to 3 rows total — the current one plus the two before it.",
    "Early months (Jan, Feb) don't have 2 full months before them yet — the frame just uses whatever's actually available, which is why their averages look different from a true 3-month window.",
    "Try: SELECT month, revenue, AVG(revenue) OVER (ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_3mo_avg FROM monthly_metrics ORDER BY id;",
  ],
  xpAward: 200,
};
