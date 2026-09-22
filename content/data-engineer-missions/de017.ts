import type { Mission } from "../missions/level001";

export const de017: Mission = {
  id: "de-ticket-017",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-017 // Priority: Critical",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "03:00 PM. Internal system. Priority: Critical.",
    "\"Module capstone — full dedup pipeline report. ROW_NUMBER() dedup in a CTE, then aggregate the clean set: row count, total revenue, average order value. This is the shape of every production dedup job's post-load verification query.\"",
  ],
  objective:
    "Using a two-CTE pipeline (ranked then deduped), return one row: clean row count, total revenue, and average order value (2 decimals).",
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
  expectedColumns: ["clean_rows", "total_revenue", "avg_order_value"],
  expectedRows: [
    [7, 59500, 8500],
  ],
  requireRowOrder: false,
  hints: [
    "ranked CTE: ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY created_at). deduped CTE: WHERE rn=1. Final SELECT: COUNT, SUM, ROUND(AVG,2).",
    "Try: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY created_at) AS rn FROM raw_orders_dup), deduped AS (SELECT order_id, customer_id, product, amount FROM ranked WHERE rn=1) SELECT COUNT(*) AS clean_rows, SUM(amount) AS total_revenue, ROUND(AVG(amount),2) AS avg_order_value FROM deduped;",
  ],
  xpAward: 300,
};
