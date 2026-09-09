import type { Mission } from "../missions/level001";

export const ae035: Mission = {
  id: "ae-ticket-035",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-035 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "12:00 PM. Internal system. Priority: High.",
    "\"Change detection — when the source amount differs from what was loaded, the row needs to be re-processed. JOIN raw to loaded on order_id and filter WHERE amounts differ. This is how slowly-changing-dimension updates are triggered.\"",
  ],
  objective:
    "Find orders where the amount in orders_raw differs from what is in orders_loaded, showing order_id, loaded amount, new amount, and the delta.",
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
  expectedColumns: ["order_id", "loaded_amount", "new_amount", "delta"],
  expectedRows: [
    ["ORD-001", 9000, 9500, 500],
    ["ORD-003", 8000, 8200, 200],
  ],
  requireRowOrder: true,
  hints: [
    "JOIN on order_id (both tables must have the row for a change to be detectable), then WHERE r.amount <> l.amount. Delta = r.amount - l.amount.",
    "Try: SELECT r.order_id, l.amount AS loaded_amount, r.amount AS new_amount, r.amount-l.amount AS delta FROM orders_raw r JOIN orders_loaded l ON r.order_id=l.order_id WHERE r.amount<>l.amount ORDER BY r.order_id;",
  ],
  xpAward: 250,
};
