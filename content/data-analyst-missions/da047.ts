import type { Mission } from "../missions/level001";

export const da047: Mission = {
  id: "da-ticket-047",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket DA-047 // Final Assessment 3 of 6",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "11:00 AM. Client: Nova Retail Pvt Ltd. Priority: Critical.",
    "\"Board wants monthly revenue AND the cumulative year-to-date figure side by side, month by month. Real dates, real buckets — then the running number building on top.\"",
  ],
  objective:
    "For each month, select the monthly total order amount and the running cumulative total through that month, sorted chronologically.",
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
  expectedColumns: ["month", "total", "running_total"],
  expectedRows: [
    ["2026-01", 4200, 4200],
    ["2026-02", 3100, 7300],
    ["2026-03", 7400, 14700],
    ["2026-04", 2200, 16900],
    ["2026-05", 7400, 24300],
    ["2026-06", 6600, 30900],
    ["2026-07", 5000, 35900],
  ],
  requireRowOrder: true,
  hints: [
    "Two layers: first collapse orders into monthly totals (you built exactly this in the dates module), then a second layer runs the accumulation over those monthly rows.",
    "The monthly grouping goes in a named building block; the running calculation reads from it, ordered by the month label.",
    "Try: WITH monthly AS (SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS total FROM orders GROUP BY month) SELECT month, total, SUM(total) OVER (ORDER BY month) AS running_total FROM monthly ORDER BY month;",
  ],
  xpAward: 275,
};
