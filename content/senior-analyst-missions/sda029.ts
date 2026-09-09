import type { Mission } from "../missions/level001";

export const sda029: Mission = {
  id: "sda-ticket-029",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket SDA-029 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "12:00 PM. Client: Nova Retail Pvt Ltd. Priority: High.",
    "\"Same report as a percentage — month-over-month growth rate, one decimal. Divide the change by the previous month's total, and guard the denominator with NULLIF like you did in the audit module.\"",
  ],
  objective:
    "For each month, select the total and the month-over-month growth percentage (rounded to 1 decimal), sorted chronologically.",
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
  expectedColumns: ["month", "total", "growth_pct"],
  expectedRows: [
    ["2026-01", 4200, null],
    ["2026-02", 3100, -26.2],
    ["2026-03", 7400, 138.7],
    ["2026-04", 2200, -70.3],
    ["2026-05", 7400, 236.4],
    ["2026-06", 6600, -10.8],
    ["2026-07", 5000, -24.2],
  ],
  requireRowOrder: true,
  hints: [
    "The formula is 100.0 * (current - previous) / previous, with LAG supplying 'previous' twice.",
    "NULLIF(LAG(...), 0) protects against a zero-revenue month ever crashing the division — defensive habits from the audit module apply everywhere.",
    "Try: WITH monthly AS (SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS total FROM orders GROUP BY month) SELECT month, total, ROUND(100.0 * (total - LAG(total) OVER (ORDER BY month)) / NULLIF(LAG(total) OVER (ORDER BY month), 0), 1) AS growth_pct FROM monthly ORDER BY month;",
  ],
  xpAward: 275,
};
