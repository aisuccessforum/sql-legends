import type { Mission } from "../missions/level001";

export const da018: Mission = {
  id: "da-ticket-018",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket DA-018 // Priority: Low",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:35 AM. Client: Nova Retail Pvt Ltd. Priority: Low.",
    "\"Same idea, but the month this time — as a two-digit number.\"",
  ],
  objective: "Select every order's customer name and the month it was placed, as a two-digit number.",
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
  expectedColumns: ["customer_name", "order_month"],
  expectedRows: [
    ["Ravi Patel", "01"],
    ["Sunita Devi", "02"],
    ["Amit Shah", "03"],
    ["Kavya Nair", "03"],
    ["Rohan Mehta", "04"],
    ["Priya Iyer", "05"],
    ["Sanjay Gupta", "05"],
    ["Neha Verma", "06"],
    ["Karan Malhotra", "06"],
    ["Divya Kapoor", "07"],
  ],
  requireRowOrder: false,
  hints: [
    "Same function as last ticket, different format code.",
    "%m is the two-digit month code — it comes back as text like '03', not the number 3.",
    "Try: SELECT customer_name, strftime('%m', order_date) AS order_month FROM orders;",
  ],
  xpAward: 150,
};
