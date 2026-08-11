import type { Mission } from "../missions/level001";

export const da021: Mission = {
  id: "da-ticket-021",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket DA-021 // Priority: High",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "11:20 AM. Client: Nova Retail Pvt Ltd. Priority: High.",
    "\"Board meeting is July 15th. Pull every order placed in the 30 days leading up to that date — recent activity only.\"",
    "\"DATE() can take a modifier like '-30 days' and shift a date by that much, instead of you calculating it by hand.\"",
  ],
  objective:
    "Select the customer name and order date for every order placed within 30 days before July 15, 2026 (inclusive).",
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
  expectedColumns: ["customer_name", "order_date"],
  expectedRows: [
    ["Karan Malhotra", "2026-06-30"],
    ["Divya Kapoor", "2026-07-10"],
  ],
  requireRowOrder: false,
  hints: [
    "DATE('2026-07-15', '-30 days') calculates the date 30 days before July 15th — you don't have to work out the exact date yourself.",
    "You need two boundaries: order_date on or after that calculated start point, and order_date on or before July 15th itself.",
    "Try: SELECT customer_name, order_date FROM orders WHERE order_date >= DATE('2026-07-15', '-30 days') AND order_date <= '2026-07-15';",
  ],
  xpAward: 225,
};
