import type { Mission } from "../missions/level001";

export const da019: Mission = {
  id: "da-ticket-019",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket DA-019 // Priority: High",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:10 AM. Client: Nova Retail Pvt Ltd. Priority: High.",
    "\"Operations wants to know how long shipping actually takes, order by order — the gap in days between when an order was placed and when it shipped. Only orders that have actually shipped, obviously.\"",
    "\"julianday() converts a date into a single number representing days since a fixed reference point. Subtract one from another and you get the number of days between them.\"",
  ],
  objective:
    "For orders that have shipped, select the customer name and the number of days between order_date and ship_date.",
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
  expectedColumns: ["customer_name", "days_to_ship"],
  expectedRows: [
    ["Ravi Patel", 3],
    ["Sunita Devi", 6],
    ["Kavya Nair", 2],
    ["Rohan Mehta", 15],
    ["Sanjay Gupta", 2],
    ["Neha Verma", 7],
    ["Karan Malhotra", 2],
    ["Divya Kapoor", 1],
  ],
  requireRowOrder: false,
  hints: [
    "Filter to orders that actually have a ship_date first — unshipped orders don't have a meaningful gap to calculate.",
    "julianday(ship_date) - julianday(order_date) gives you the day count directly.",
    "Try: SELECT customer_name, julianday(ship_date) - julianday(order_date) AS days_to_ship FROM orders WHERE ship_date IS NOT NULL;",
  ],
  xpAward: 200,
};
