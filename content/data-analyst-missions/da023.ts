import type { Mission } from "../missions/level001";

export const da023: Mission = {
  id: "da-ticket-023",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket DA-023 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:40 PM. Client: Nova Retail Pvt Ltd. Priority: Medium.",
    "\"One number for the SLA review — average shipping time across every order that's actually shipped so far.\"",
  ],
  objective:
    "Calculate the average number of days between order_date and ship_date, across every shipped order.",
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
  expectedColumns: ["avg_days_to_ship"],
  expectedRows: [[4.75]],
  requireRowOrder: false,
  hints: [
    "Filter to shipped orders first, exactly like Ticket DA-019 — then wrap the whole day-gap calculation in AVG() instead of returning it per row.",
    "AVG() works over the entire result set as one summary number, same as it always has.",
    "Try: SELECT AVG(julianday(ship_date) - julianday(order_date)) AS avg_days_to_ship FROM orders WHERE ship_date IS NOT NULL;",
  ],
  xpAward: 175,
};
