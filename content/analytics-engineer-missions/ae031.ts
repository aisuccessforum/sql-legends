import type { Mission } from "../missions/level001";

export const ae031: Mission = {
  id: "ae-ticket-031",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-031 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"New module — incremental logic. Full table refreshes get expensive as data grows. Incremental models only process rows newer than the last load. The watermark pattern: filter WHERE created_at > last_loaded_at. Here the watermark is 2026-02-01.\"",
  ],
  objective:
    "Return all orders from orders_raw where created_at is after '2026-02-01 00:00:00', sorted by created_at.",
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
    ["ORD-004", "C004", 6600, "2026-02-03 10:00:00"],
    ["ORD-005", "C005", 4500, "2026-02-14 16:20:00"],
    ["ORD-006", "C006", 13000, "2026-02-20 09:45:00"],
    ["ORD-007", "C007", 12400, "2026-03-05 13:10:00"],
    ["ORD-008", "C001", 9600, "2026-03-12 11:00:00"],
    ["ORD-009", "C002", 8000, "2026-03-18 15:30:00"],
    ["ORD-010", "C003", 4400, "2026-04-02 09:00:00"],
  ],
  requireRowOrder: true,
  hints: [
    "WHERE created_at > '2026-02-01 00:00:00' — text ISO datetime comparison works in SQLite (lexicographic order matches chronological order for ISO format).",
    "Try: SELECT order_id, customer_id, amount, created_at FROM orders_raw WHERE created_at > '2026-02-01 00:00:00' ORDER BY created_at;",
  ],
  xpAward: 200,
};
