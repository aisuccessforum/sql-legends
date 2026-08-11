import type { Mission } from "../missions/level001";

export const da017: Mission = {
  id: "da-ticket-017",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket DA-017 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:00 AM. Client: Nova Retail Pvt Ltd. Priority: Medium.",
    "New module — real dates this time, not text labels. Nova Retail's order history uses proper ISO dates, so date math actually works on it.",
    "\"Finance wants every order tagged with just the year it happened, pulled straight out of the date.\"",
  ],
  objective: "Select every order's customer name and the year it was placed.",
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
  expectedColumns: ["customer_name", "order_year"],
  expectedRows: [
    ["Ravi Patel", "2026"],
    ["Sunita Devi", "2026"],
    ["Amit Shah", "2026"],
    ["Kavya Nair", "2026"],
    ["Rohan Mehta", "2026"],
    ["Priya Iyer", "2026"],
    ["Sanjay Gupta", "2026"],
    ["Neha Verma", "2026"],
    ["Karan Malhotra", "2026"],
    ["Divya Kapoor", "2026"],
  ],
  requireRowOrder: false,
  hints: [
    "SQLite dates are stored as plain text in YYYY-MM-DD format — strftime() reads a format code and a date, and pulls out the piece you ask for.",
    "%Y is the format code for a 4-digit year.",
    "Try: SELECT customer_name, strftime('%Y', order_date) AS order_year FROM orders;",
  ],
  xpAward: 175,
};
