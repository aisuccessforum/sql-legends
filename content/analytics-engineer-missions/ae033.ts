import type { Mission } from "../missions/level001";

export const ae033: Mission = {
  id: "ae-ticket-033",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-033 // Priority: Medium",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "10:30 AM. Internal system. Priority: Medium.",
    "\"Load audit — before running the incremental load, confirm how many records are new vs already loaded. One row, two counts. This is the check you log before every pipeline run.\"",
  ],
  objective:
    "In a single row, show the count of orders_raw records not yet in orders_loaded (new_records) and those already loaded (already_loaded).",
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
  expectedColumns: ["new_records", "already_loaded"],
  expectedRows: [
    [5, 5],
  ],
  requireRowOrder: false,
  hints: [
    "LEFT JOIN, CASE WHEN l.order_id IS NULL THEN 1 END for new, CASE WHEN l.order_id IS NOT NULL THEN 1 END for loaded — each wrapped in SUM().",
    "Try: SELECT SUM(CASE WHEN l.order_id IS NULL THEN 1 ELSE 0 END) AS new_records, SUM(CASE WHEN l.order_id IS NOT NULL THEN 1 ELSE 0 END) AS already_loaded FROM orders_raw r LEFT JOIN orders_loaded l ON r.order_id=l.order_id;",
  ],
  xpAward: 200,
};
