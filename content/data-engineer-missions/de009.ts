import type { Mission } from "../missions/level001";

export const de009: Mission = {
  id: "de-ticket-009",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-009 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"New module — deduplication. Raw data arrives with duplicate rows. Upstream ETL bugs, retry loops, double-submissions — whatever the cause, duplicates corrupt every aggregate downstream. First step: find them.\"",
  ],
  objective:
    "Find any order_id that appears more than once in raw_orders_dup, showing the id and how many times it appears.",
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
  expectedColumns: ["order_id", "occurrences"],
  expectedRows: [
    ["ORD-001", 2],
    ["ORD-003", 2],
    ["ORD-006", 2],
  ],
  requireRowOrder: false,
  hints: [
    "GROUP BY order_id, HAVING COUNT(*) > 1.",
    "Try: SELECT order_id, COUNT(*) AS occurrences FROM raw_orders_dup GROUP BY order_id HAVING COUNT(*) > 1 ORDER BY order_id;",
  ],
  xpAward: 200,
};
