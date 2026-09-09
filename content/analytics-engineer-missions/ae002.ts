import type { Mission } from "../missions/level001";

export const ae002: Mission = {
  id: "ae-ticket-002",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-002 // Priority: Medium",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "09:45 AM. Internal system. Priority: Medium.",
    "\"Status values — six spellings of the same three states. LOWER() collapses them into one canonical form. Every staging model has this pattern.\"",
  ],
  objective:
    "Select each order's ID and status converted to lowercase, sorted by order_id.",
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
  expectedColumns: ["order_id", "status"],
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
    "LOWER(status) lowercases every character. UPPER() would work for the inverse.",
    "Try: SELECT order_id, LOWER(status) AS status FROM raw_orders ORDER BY order_id;",
  ],
  xpAward: 200,
};
