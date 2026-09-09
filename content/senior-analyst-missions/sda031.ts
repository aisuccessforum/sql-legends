import type { Mission } from "../missions/level001";

export const sda031: Mission = {
  id: "sda-ticket-031",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket SDA-031 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "01:30 PM. Client: Nova Retail Pvt Ltd. Priority: Medium.",
    "\"One row for the ops dashboard: what percentage of total order value has actually shipped, and what percentage is still stuck? Conditional sums over the same denominator — pivot thinking meets ratio thinking.\"",
  ],
  objective:
    "In a single row, show the shipped and unshipped percentages of total order value, each rounded to 1 decimal.",
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
  expectedColumns: ["shipped_value_pct", "unshipped_value_pct"],
  expectedRows: [
    [85.8, 14.2],
  ],
  requireRowOrder: false,
  hints: [
    "Two conditional SUMs from the pivot module divided by one plain SUM — no windows needed when the whole table is one group.",
    "The two percentages should sum to 100 — another built-in sanity check.",
    "Try: SELECT ROUND(100.0 * SUM(CASE WHEN ship_date IS NOT NULL THEN amount ELSE 0 END) / SUM(amount), 1) AS shipped_value_pct, ROUND(100.0 * SUM(CASE WHEN ship_date IS NULL THEN amount ELSE 0 END) / SUM(amount), 1) AS unshipped_value_pct FROM orders;",
  ],
  xpAward: 250,
};
