import type { Mission } from "../missions/level001";

export const de010: Mission = {
  id: "de-ticket-010",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-010 // Priority: Medium",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "09:45 AM. Internal system. Priority: Medium.",
    "\"Exact dedup with DISTINCT — when every column of a duplicate row is identical, SELECT DISTINCT removes the extras in one step. Only works when duplicates are true exact copies.\"",
  ],
  objective:
    "Return one row per unique order using DISTINCT — all five columns — sorted by order_id.",
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
    "SELECT DISTINCT col1, col2, ... FROM table removes rows where every selected column is an exact copy.",
    "Try: SELECT DISTINCT order_id, customer_id, product, amount, created_at FROM raw_orders_dup ORDER BY order_id;",
  ],
  xpAward: 200,
};
