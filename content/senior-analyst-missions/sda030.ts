import type { Mission } from "../missions/level001";

export const sda030: Mission = {
  id: "sda-ticket-030",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket SDA-030 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "12:45 PM. Client: Nova Retail Pvt Ltd. Priority: Medium.",
    "\"Which months carried the year? Each month's revenue as a share of the seven-month total — the empty-OVER trick again, this time on top of grouped rows.\"",
  ],
  objective:
    "For each month, select the total and its percentage of all revenue (rounded to 1 decimal), sorted chronologically.",
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
  expectedColumns: ["month", "total", "pct_of_year"],
  expectedRows: [
    ["2026-01", 4200, 11.7],
    ["2026-02", 3100, 8.6],
    ["2026-03", 7400, 20.6],
    ["2026-04", 2200, 6.1],
    ["2026-05", 7400, 20.6],
    ["2026-06", 6600, 18.4],
    ["2026-07", 5000, 13.9],
  ],
  requireRowOrder: true,
  hints: [
    "Same CTE-then-window shape as the growth tickets — the grand-total window just replaces the LAG.",
    "SUM(total) OVER () spans all the monthly rows produced by the CTE.",
    "Try: WITH monthly AS (SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS total FROM orders GROUP BY month) SELECT month, total, ROUND(100.0 * total / SUM(total) OVER (), 1) AS pct_of_year FROM monthly ORDER BY month;",
  ],
  xpAward: 250,
};
