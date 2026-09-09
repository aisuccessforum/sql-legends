import type { Mission } from "../missions/level001";

export const sda028: Mission = {
  id: "sda-ticket-028",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket SDA-028 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "11:15 AM. Client: Nova Retail Pvt Ltd. Priority: High.",
    "\"Growth reporting now. Monthly revenue with the absolute change from the previous month next to it. January has no previous month — its change is honestly NULL, not zero.\"",
  ],
  objective:
    "For each month, select the total and the change from the previous month's total, sorted chronologically.",
  schemaLabel: "orders",
  seedSql: `
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY,
      customer_name TEXT,
      order_date TEXT,
      ship_date TEXT,
      amount INTEGER
    );
    INSERT INTO orders (id, customer_name, order_date, ship_date, amount) VALUES
      (1, 'Ravi Patel', '2026-01-05', '2026-01-08', 4200),
      (2, 'Sunita Devi', '2026-02-14', '2026-02-20', 3100),
      (3, 'Amit Shah', '2026-03-02', NULL, 1800),
      (4, 'Kavya Nair', '2026-03-15', '2026-03-17', 5600),
      (5, 'Rohan Mehta', '2026-04-10', '2026-04-25', 2200),
      (6, 'Priya Iyer', '2026-05-01', NULL, 3300),
      (7, 'Sanjay Gupta', '2026-05-20', '2026-05-22', 4100),
      (8, 'Neha Verma', '2026-06-08', '2026-06-15', 2900),
      (9, 'Karan Malhotra', '2026-06-30', '2026-07-02', 3700),
      (10, 'Divya Kapoor', '2026-07-10', '2026-07-11', 5000);
  `,
  schemaPreview: [
    { table: "orders", columns: ["id", "customer_name", "order_date", "ship_date", "amount"] },
  ],
  expectedColumns: ["month", "total", "change_from_prev"],
  expectedRows: [
    ["2026-01", 4200, null],
    ["2026-02", 3100, -1100],
    ["2026-03", 7400, 4300],
    ["2026-04", 2200, -5200],
    ["2026-05", 7400, 5200],
    ["2026-06", 6600, -800],
    ["2026-07", 5000, -1600],
  ],
  requireRowOrder: true,
  hints: [
    "Collapse to monthly totals in a CTE first, then LAG(total) OVER (ORDER BY month) reaches back one row.",
    "Subtracting LAG from the current total gives the change — and LAG on the first row is NULL, which propagates honestly through the subtraction.",
    "Try: WITH monthly AS (SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS total FROM orders GROUP BY month) SELECT month, total, total - LAG(total) OVER (ORDER BY month) AS change_from_prev FROM monthly ORDER BY month;",
  ],
  xpAward: 250,
};
