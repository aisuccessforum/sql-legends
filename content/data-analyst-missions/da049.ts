import type { Mission } from "../missions/level001";

export const da049: Mission = {
  id: "da-ticket-049",
  world: "Nova Retail Pvt Ltd",
  levelLabel: "Ticket DA-049 // Final Assessment 5 of 6",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "01:00 PM. Client: Nova Retail Pvt Ltd. Priority: Critical.",
    "\"Ops wants a reusable shipped_orders_view — shipped orders only, with each order's days-to-ship precomputed as a column. Then, from that view, the average shipping time per month.\"",
    "\"The whole point of the view is that whoever queries it next month never re-derives the day math.\"",
  ],
  objective:
    "Create a view called shipped_orders_view containing shipped orders with a precomputed days_to_ship column, then select the average days to ship per month from it, sorted chronologically.",
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
  expectedColumns: ["month", "avg_days"],
  expectedRows: [
    ["2026-01", 3],
    ["2026-02", 6],
    ["2026-03", 2],
    ["2026-04", 15],
    ["2026-05", 2],
    ["2026-06", 4.5],
    ["2026-07", 1],
  ],
  requireRowOrder: true,
  hints: [
    "The view filters to shipped orders and carries the day-gap calculation as its own named column — both pieces you've built separately before.",
    "The second statement then just groups the view by month and averages the precomputed column.",
    "Try: CREATE VIEW shipped_orders_view AS SELECT id, customer_name, order_date, ship_date, amount, julianday(ship_date) - julianday(order_date) AS days_to_ship FROM orders WHERE ship_date IS NOT NULL; SELECT strftime('%Y-%m', order_date) AS month, AVG(days_to_ship) AS avg_days FROM shipped_orders_view GROUP BY month ORDER BY month;",
  ],
  xpAward: 275,
};
