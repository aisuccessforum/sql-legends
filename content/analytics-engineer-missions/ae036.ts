import type { Mission } from "../missions/level001";

export const ae036: Mission = {
  id: "ae-ticket-036",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-036 // Priority: Critical",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "12:45 PM. Internal system. Priority: Critical.",
    "\"Module capstone — full incremental load manifest. Two CTEs identify what needs to be processed: new records (not yet loaded) and changed records (amount differs). UNION ALL combines them into one pending-work list. This is the query that drives the load decision.\"",
  ],
  objective:
    "Using two CTEs (new_records via anti-join, changed via amount mismatch), produce a unified list of orders to process with their load_type label ('new' or 'changed') — sorted by order_id.",
  schemaLabel: "orders_raw, orders_loaded",
  seedSql: `
    CREATE TABLE orders_raw (order_id TEXT, customer_id TEXT, amount REAL, created_at TEXT);
    CREATE TABLE orders_loaded (order_id TEXT PRIMARY KEY, customer_id TEXT, amount REAL, loaded_at TEXT);
    INSERT INTO orders_raw VALUES ('ORD-001','C001',9500,'2026-01-10'),('ORD-002','C002',6000,'2026-01-15'),('ORD-003','C003',8200,'2026-01-22'),('ORD-004','C004',6600,'2026-02-03');
    INSERT INTO orders_loaded VALUES ('ORD-001','C001',9000,'2026-02-01'),('ORD-002','C002',6000,'2026-02-01'),('ORD-003','C003',8000,'2026-02-01'),('ORD-004','C004',6600,'2026-02-01');
  `,
  schemaPreview: [
    { table: "orders_raw",    columns: ["order_id","customer_id","amount","created_at"] },
    { table: "orders_loaded", columns: ["order_id","customer_id","amount","loaded_at"] },
  ],
  expectedColumns: ["order_id", "customer_id", "amount", "load_type"],
  expectedRows: [
    ["ORD-001", "C001", 9500, "changed"],
    ["ORD-003", "C003", 8200, "changed"],
  ],
  requireRowOrder: true,
  hints: [
    "new_records CTE: anti-join (LEFT JOIN, l.order_id IS NULL). changed CTE: inner JOIN, WHERE r.amount<>l.amount. UNION ALL both, label each with a literal.",
    "Try: WITH new_records AS (SELECT r.order_id, r.customer_id, r.amount, 'new' AS load_type FROM orders_raw r LEFT JOIN orders_loaded l ON r.order_id=l.order_id WHERE l.order_id IS NULL), changed AS (SELECT r.order_id, r.customer_id, r.amount, 'changed' AS load_type FROM orders_raw r JOIN orders_loaded l ON r.order_id=l.order_id WHERE r.amount<>l.amount), all_pending AS (SELECT * FROM new_records UNION ALL SELECT * FROM changed) SELECT order_id, customer_id, amount, load_type FROM all_pending ORDER BY order_id;",
  ],
  xpAward: 300,
};
