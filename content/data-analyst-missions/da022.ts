import type { Mission } from "../missions/level001";

export const da022: Mission = {
  id: "da-ticket-022",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket DA-022 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:00 PM. Client: Nova Retail Pvt Ltd. Priority: Medium.",
    "\"Total order value per month, oldest month first — a real revenue trend line, not a single lump number.\"",
  ],
  objective:
    "Select the total order amount for each month, labeled by year and month, sorted chronologically.",
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
  expectedColumns: ["month", "total"],
  expectedRows: [
    ["2026-01", 4200],
    ["2026-02", 3100],
    ["2026-03", 7400],
    ["2026-04", 2200],
    ["2026-05", 7400],
    ["2026-06", 6600],
    ["2026-07", 5000],
  ],
  requireRowOrder: true,
  hints: [
    "strftime('%Y-%m', order_date) turns every date into a year-month label — group by that instead of the full date, and every order in the same month lands in the same group.",
    "Because the labels sort as plain text (2026-01, 2026-02, ...), ordering by that column also happens to be chronological order.",
    "Try: SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS total FROM orders GROUP BY month ORDER BY month;",
  ],
  xpAward: 225,
};
