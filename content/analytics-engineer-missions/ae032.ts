import type { Mission } from "../missions/level001";

export const ae032: Mission = {
  id: "ae-ticket-032",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-032 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "09:45 AM. Internal system. Priority: High.",
    "\"Anti-join pattern — identify orders present in orders_raw but absent from orders_loaded. These are the records the next load run needs to process. LEFT JOIN + IS NULL filter is the canonical anti-join.\"",
  ],
  objective:
    "Return orders from orders_raw that have not yet been loaded into orders_loaded, sorted by order_id.",
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
  expectedColumns: ["order_id", "customer_id", "amount", "created_at"],
  expectedRows: [
    ["ORD-006", "C006", 13000, "2026-02-20 09:45:00"],
    ["ORD-007", "C007", 12400, "2026-03-05 13:10:00"],
    ["ORD-008", "C001", 9600, "2026-03-12 11:00:00"],
    ["ORD-009", "C002", 8000, "2026-03-18 15:30:00"],
    ["ORD-010", "C003", 4400, "2026-04-02 09:00:00"],
  ],
  requireRowOrder: true,
  hints: [
    "LEFT JOIN orders_raw to orders_loaded on order_id — rows where l.order_id IS NULL after the join exist only in the raw table.",
    "Try: SELECT r.order_id, r.customer_id, r.amount, r.created_at FROM orders_raw r LEFT JOIN orders_loaded l ON r.order_id=l.order_id WHERE l.order_id IS NULL ORDER BY r.order_id;",
  ],
  xpAward: 225,
};
