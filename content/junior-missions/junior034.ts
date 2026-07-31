import type { Mission } from "../missions/level001";

export const junior034: Mission = {
  id: "junior-ticket-034",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-034 // Priority: Critical",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "01:50 PM. Internal system. Priority: Critical.",
    "\"Last one on time-series functions. Full monthly report for the board, one query: revenue, running total for the year, 3-month rolling average, and month-over-month change. Everything from this whole module, together.\"",
  ],
  objective:
    "Select each month's revenue, running total, 3-month rolling average, and month-over-month change, all in one query.",
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
  expectedColumns: ["month", "revenue", "running_total", "rolling_3mo_avg", "mom_change"],
  expectedRows: [
    ["Jan", 420000, 420000, 420000, null],
    ["Feb", 385000, 805000, 402500, -35000],
    ["Mar", 460000, 1265000, 421666.6666666667, 75000],
    ["Apr", 510000, 1775000, 451666.6666666667, 50000],
    ["May", 475000, 2250000, 481666.6666666667, -35000],
    ["Jun", 530000, 2780000, 505000, 55000],
    ["Jul", 495000, 3275000, 500000, -35000],
    ["Aug", 560000, 3835000, 528333.3333333334, 65000],
    ["Sep", 545000, 4380000, 533333.3333333334, -15000],
    ["Oct", 610000, 4990000, 571666.6666666666, 65000],
    ["Nov", 580000, 5570000, 578333.3333333334, -30000],
    ["Dec", 650000, 6220000, 613333.3333333334, 70000],
  ],
  requireRowOrder: true,
  hints: [
    "Four separate window functions in one SELECT list — SUM, AVG with a frame, and revenue minus LAG. Build each piece separately first if it helps, then combine.",
    "Each one uses its own OVER clause; they don't interact with or interfere with each other.",
    "Try: SELECT month, revenue, SUM(revenue) OVER (ORDER BY id) AS running_total, AVG(revenue) OVER (ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_3mo_avg, revenue - LAG(revenue) OVER (ORDER BY id) AS mom_change FROM monthly_metrics ORDER BY id;",
  ],
  xpAward: 225,
};
