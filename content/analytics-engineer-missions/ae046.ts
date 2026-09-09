import type { Mission } from "../missions/level001";

export const ae046: Mission = {
  id: "ae-ticket-046",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-046 // Final Assessment 4 of 8",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "12:00 PM. Internal system. Final Assessment.",
    "\"Incremental load audit — before the pipeline runs, count unloaded orders and total their amount. If unloaded_count is 0, skip the load.\"",
  ],
  objective:
    "Show the count of orders in orders_raw not yet in orders_loaded, and their total amount.",
  schemaLabel: "orders_raw, orders_loaded",
  seedSql: `
    CREATE TABLE orders_raw (order_id TEXT, customer_id TEXT, amount REAL, created_at TEXT);
    CREATE TABLE orders_loaded (order_id TEXT PRIMARY KEY, customer_id TEXT, amount REAL, loaded_at TEXT);
    INSERT INTO orders_raw VALUES ('ORD-001','C001',9000,'2026-01-10 09:15:00'),('ORD-002','C002',6000,'2026-01-15 11:30:00'),('ORD-003','C003',8000,'2026-01-22 14:00:00'),('ORD-004','C004',6600,'2026-02-03 10:00:00'),('ORD-005','C005',4500,'2026-02-14 16:20:00'),('ORD-006','C006',13000,'2026-02-20 09:45:00'),('ORD-007','C007',12400,'2026-03-05 13:10:00'),('ORD-008','C001',9600,'2026-03-12 11:00:00'),('ORD-009','C002',8000,'2026-03-18 15:30:00'),('ORD-010','C003',4400,'2026-04-02 09:00:00');
    INSERT INTO orders_loaded VALUES ('ORD-001','C001',9000,'2026-02-01 00:00:00'),('ORD-002','C002',6000,'2026-02-01 00:00:00'),('ORD-003','C003',8000,'2026-02-01 00:00:00'),('ORD-004','C004',6600,'2026-02-01 00:00:00'),('ORD-005','C005',4500,'2026-02-01 00:00:00');
  `,
  schemaPreview: [
    { table: "orders_raw",    columns: ["order_id","customer_id","amount","created_at"] },
    { table: "orders_loaded", columns: ["order_id","customer_id","amount","loaded_at"] },
  ],
  expectedColumns: ["unloaded_count", "unloaded_revenue"],
  expectedRows: [
    [5, 47400],
  ],
  requireRowOrder: false,
  hints: [
    "LEFT JOIN orders_raw to orders_loaded, WHERE l.order_id IS NULL. SUM(r.amount) for total.",
    "Try: SELECT COUNT(*) AS unloaded_count, SUM(r.amount) AS unloaded_revenue FROM orders_raw r LEFT JOIN orders_loaded l ON r.order_id=l.order_id WHERE l.order_id IS NULL;",
  ],
  xpAward: 275,
};
