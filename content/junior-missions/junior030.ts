import type { Mission } from "../missions/level001";

export const junior030: Mission = {
  id: "junior-ticket-030",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-030 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "10:50 AM. Internal system. Priority: High.",
    "\"Don't just show the previous month next to the current one — calculate the actual change. Positive means growth, negative means it dropped.\"",
  ],
  objective:
    "Select each month's revenue along with the change in revenue from the previous month.",
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
  expectedColumns: ["month", "revenue", "mom_change"],
  expectedRows: [
    ["Jan", 420000, null],
    ["Feb", 385000, -35000],
    ["Mar", 460000, 75000],
    ["Apr", 510000, 50000],
    ["May", 475000, -35000],
    ["Jun", 530000, 55000],
    ["Jul", 495000, -35000],
    ["Aug", 560000, 65000],
    ["Sep", 545000, -15000],
    ["Oct", 610000, 65000],
    ["Nov", 580000, -30000],
    ["Dec", 650000, 70000],
  ],
  requireRowOrder: true,
  hints: [
    "The window function result can be used directly in arithmetic, right in the SELECT list.",
    "Current month's revenue minus LAG(revenue) gives you the change.",
    "Try: SELECT month, revenue, revenue - LAG(revenue) OVER (ORDER BY id) AS mom_change FROM monthly_metrics ORDER BY id;",
  ],
  xpAward: 200,
};
