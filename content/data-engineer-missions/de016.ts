import type { Mission } from "../missions/level001";

export const de016: Mission = {
  id: "de-ticket-016",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-016 // Priority: Medium",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "02:15 PM. Internal system. Priority: Medium.",
    "\"Before-and-after count — always log the dedup impact. How many raw rows, how many unique records, how many were duplicates? This single-row audit goes to the pipeline log table after every dedup step.\"",
  ],
  objective:
    "In a single row, show raw row count, unique order count, and duplicate row count from raw_orders_dup.",
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
  expectedColumns: ["raw_rows", "unique_orders", "duplicate_rows"],
  expectedRows: [
    [10, 7, 3],
  ],
  requireRowOrder: false,
  hints: [
    "Three scalar expressions: COUNT(*), COUNT(DISTINCT order_id), and their difference.",
    "Try: SELECT (SELECT COUNT(*) FROM raw_orders_dup) AS raw_rows, (SELECT COUNT(DISTINCT order_id) FROM raw_orders_dup) AS unique_orders, (SELECT COUNT(*) FROM raw_orders_dup)-(SELECT COUNT(DISTINCT order_id) FROM raw_orders_dup) AS duplicate_rows;",
  ],
  xpAward: 200,
};
