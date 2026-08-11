import type { Mission } from "../missions/level001";

export const da024: Mission = {
  id: "da-ticket-024",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket DA-024 // Priority: Critical",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "01:30 PM. Client: Nova Retail Pvt Ltd. Priority: Critical.",
    "\"Last one on dates. Full monthly operations report: order count, total revenue, and average shipping time — only counting orders that actually shipped for that last number — all grouped by month.\"",
  ],
  objective:
    "For each month, select the order count, total order amount, and average days to ship (counting only shipped orders), sorted chronologically.",
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
  expectedColumns: ["month", "order_count", "total_amount", "avg_days_to_ship"],
  expectedRows: [
    ["2026-01", 1, 4200, 3],
    ["2026-02", 1, 3100, 6],
    ["2026-03", 2, 7400, 2],
    ["2026-04", 1, 2200, 15],
    ["2026-05", 2, 7400, 2],
    ["2026-06", 2, 6600, 4.5],
    ["2026-07", 1, 5000, 1],
  ],
  requireRowOrder: true,
  hints: [
    "GROUP BY the year-month label, same as Ticket DA-022, with COUNT and SUM added on top.",
    "The tricky part is the average — an unshipped order shouldn't count as a 0-day shipping time and shouldn't be excluded from the group entirely either. A CASE inside AVG() lets you contribute a real value only when ship_date exists, and skip it (as NULL) otherwise, without dropping the whole row from the count and sum.",
    "Try: SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS order_count, SUM(amount) AS total_amount, AVG(CASE WHEN ship_date IS NOT NULL THEN julianday(ship_date) - julianday(order_date) END) AS avg_days_to_ship FROM orders GROUP BY month ORDER BY month;",
  ],
  xpAward: 275,
};
