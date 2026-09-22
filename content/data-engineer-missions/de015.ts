import type { Mission } from "../missions/level001";

export const de015: Mission = {
  id: "de-ticket-015",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-015 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "01:30 PM. Internal system. Priority: High.",
    "\"Dedup then aggregate — the correct pipeline order. Always dedup first in a CTE, then aggregate from the clean output. Aggregating raw duplicated data inflates every count and sum.\"",
  ],
  objective:
    "Deduplicate raw_orders_dup using DISTINCT, then aggregate per customer: order count and total amount — sorted by total_amount descending.",
  schemaLabel: "raw_orders_dup",
  seedSql: `
    CREATE TABLE raw_orders_dup (order_id TEXT, customer_id TEXT, product TEXT, amount REAL, created_at TEXT);
    INSERT INTO raw_orders_dup (order_id, customer_id, product, amount, created_at) VALUES
      ('ORD-001','C001','DataVault Pro',9000,'2026-01-10 09:00'),('ORD-001','C001','DataVault Pro',9000,'2026-01-10 09:00'),
      ('ORD-002','C002','QueryMaster',6000,'2026-01-15 11:00'),
      ('ORD-003','C003','PipelineX',8000,'2026-01-22 14:00'),('ORD-003','C003','PipelineX',8000,'2026-01-22 14:00'),
      ('ORD-004','C004','ReportBuilder',6600,'2026-02-03 10:00'),('ORD-005','C005','DataVault Pro',4500,'2026-02-14 16:00'),
      ('ORD-006','C006','StreamFlow',13000,'2026-02-20 09:00'),('ORD-006','C006','StreamFlow',13000,'2026-02-20 09:00'),
      ('ORD-007','C007','DashKit',12400,'2026-03-05 13:00');
  `,
  schemaPreview: [{ table: "raw_orders_dup", columns: ["order_id","customer_id","product","amount","created_at"] }],
  expectedColumns: ["customer_id", "orders", "total_amount"],
  expectedRows: [
    ["C006", 1, 13000],
    ["C007", 1, 12400],
    ["C001", 1, 9000],
    ["C003", 1, 8000],
    ["C004", 1, 6600],
    ["C002", 1, 6000],
    ["C005", 1, 4500],
  ],
  requireRowOrder: true,
  hints: [
    "WITH deduped AS (SELECT DISTINCT order_id, customer_id, amount FROM raw_orders_dup) — then GROUP BY customer_id on the deduplicated result.",
    "Try: WITH deduped AS (SELECT DISTINCT order_id, customer_id, amount FROM raw_orders_dup) SELECT customer_id, COUNT(*) AS orders, SUM(amount) AS total_amount FROM deduped GROUP BY customer_id ORDER BY total_amount DESC;",
  ],
  xpAward: 225,
};
