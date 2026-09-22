import type { Mission } from "../missions/level001";

export const de011: Mission = {
  id: "de-ticket-011",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-011 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "10:30 AM. Internal system. Priority: High.",
    "\"ROW_NUMBER() dedup — keep first by timestamp. When you need to know which row 'won', DISTINCT doesn't give you control. ROW_NUMBER() OVER (PARTITION BY key ORDER BY ts) tags each copy; filter to rn=1.\"",
  ],
  objective:
    "Use ROW_NUMBER() partitioned by order_id (ordered by created_at) to return the first occurrence of each order — all five columns — sorted by order_id.",
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
  expectedColumns: ["order_id", "customer_id", "product", "amount", "created_at"],
  expectedRows: [
    ["ORD-001", "C001", "DataVault Pro", 9000, "2026-01-10 09:00"],
    ["ORD-002", "C002", "QueryMaster", 6000, "2026-01-15 11:00"],
    ["ORD-003", "C003", "PipelineX", 8000, "2026-01-22 14:00"],
    ["ORD-004", "C004", "ReportBuilder", 6600, "2026-02-03 10:00"],
    ["ORD-005", "C005", "DataVault Pro", 4500, "2026-02-14 16:00"],
    ["ORD-006", "C006", "StreamFlow", 13000, "2026-02-20 09:00"],
    ["ORD-007", "C007", "DashKit", 12400, "2026-03-05 13:00"],
  ],
  requireRowOrder: true,
  hints: [
    "WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY created_at) AS rn FROM raw_orders_dup) SELECT ... WHERE rn=1.",
    "Try: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY created_at) AS rn FROM raw_orders_dup) SELECT order_id, customer_id, product, amount, created_at FROM ranked WHERE rn=1 ORDER BY order_id;",
  ],
  xpAward: 225,
};
