import type { Mission } from "../missions/level001";

export const da020: Mission = {
  id: "da-ticket-020",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket DA-020 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:45 AM. Client: Nova Retail Pvt Ltd. Priority: Medium.",
    "\"Which orders are still sitting unshipped right now? Warehouse wants to know what's stuck.\"",
  ],
  objective: "Select the customer name of every order with no ship date recorded.",
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
  expectedColumns: ["customer_name"],
  expectedRows: [["Amit Shah"], ["Priya Iyer"]],
  requireRowOrder: false,
  hints: [
    "No date functions needed here at all — just a familiar NULL check.",
    "The column to check is ship_date, not order_date — every order has an order_date, only some have shipped.",
    "Try: SELECT customer_name FROM orders WHERE ship_date IS NULL;",
  ],
  xpAward: 125,
};
