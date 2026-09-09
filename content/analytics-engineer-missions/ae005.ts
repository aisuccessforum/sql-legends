import type { Mission } from "../missions/level001";

export const ae005: Mission = {
  id: "ae-ticket-005",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-005 // Priority: Medium",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "12:00 PM. Internal system. Priority: Medium.",
    "\"Status normalisation with CASE — LOWER() is fine for simple cases, but when source data has inconsistent spelling and you want a controlled vocabulary, CASE UPPER(col) WHEN ... gives you explicit mapping.\"",
  ],
  objective:
    "Select each order's ID and a clean_status derived from the raw status using CASE UPPER(status) — mapping 'CONFIRMED' to confirmed, 'PENDING' to pending, anything else to cancelled — sorted by order_id.",
  schemaLabel: "raw_orders",
  seedSql: `
    CREATE TABLE raw_orders (
      order_id TEXT, customer_name TEXT, product TEXT,
      qty TEXT, unit_price TEXT, order_date TEXT, status TEXT
    );
    INSERT INTO raw_orders (order_id, customer_name, product, qty, unit_price, order_date, status) VALUES
      ('ORD-001','  Apex Corp  ','DataVault Pro','2','4500.00','2026-01-10','CONFIRMED'),
      ('ORD-002','NovaSoft','QueryMaster','5','1200.00','2026-01-15','pending'),
      ('ORD-003','QUANTUM CORP','PipelineX','1','8000.00','2026-01-22','Confirmed'),
      ('ORD-004',NULL,'StreamFlow','3','6500.00','2026-02-03','CONFIRMED'),
      ('ORD-005','TechWave','ReportBuilder',NULL,'2200.00','2026-02-14','CANCELLED'),
      ('ORD-006','  DataFirst  ','DashKit','2',NULL,'2026-02-20','confirmed'),
      ('ORD-007','Metro Analytics','DataVault Pro','4','4500.00','2026-03-05','CONFIRMED'),
      ('ORD-008','Apex Corp','QueryMaster','8','1200.00','2026-03-12','PENDING'),
      ('ORD-009','NovaSoft','PipelineX','1','8000.00','2026-03-18','CONFIRMED'),
      ('ORD-010','Quantum Corp','StreamFlow','2','6500.00','2026-04-02','CONFIRMED');
  `,
  schemaPreview: [{ table: "raw_orders", columns: ["order_id","customer_name","product","qty","unit_price","order_date","status"] }],
  expectedColumns: ["order_id", "clean_status"],
  expectedRows: [
    ["ORD-001", "confirmed"],
    ["ORD-002", "pending"],
    ["ORD-003", "confirmed"],
    ["ORD-004", "confirmed"],
    ["ORD-005", "cancelled"],
    ["ORD-006", "confirmed"],
    ["ORD-007", "confirmed"],
    ["ORD-008", "pending"],
    ["ORD-009", "confirmed"],
    ["ORD-010", "confirmed"],
  ],
  requireRowOrder: true,
  hints: [
    "CASE UPPER(status) WHEN 'CONFIRMED' THEN 'confirmed' WHEN 'PENDING' THEN 'pending' ELSE 'cancelled' END — UPPER normalises the input before matching.",
    "Try: SELECT order_id, CASE UPPER(status) WHEN 'CONFIRMED' THEN 'confirmed' WHEN 'PENDING' THEN 'pending' ELSE 'cancelled' END AS clean_status FROM raw_orders ORDER BY order_id;",
  ],
  xpAward: 200,
};
