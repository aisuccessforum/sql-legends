import type { Mission } from "../missions/level001";

export const ae001: Mission = {
  id: "ae-ticket-001",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-001 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"Analytics Engineer — welcome. I'm Aryan, Data Platform Lead. You don't query dashboards at this level. You build the models that feed every dashboard in this company.\"",
    "\"First concept: staging. Raw data lands in the warehouse dirty — whitespace, mixed case, wrong types. The staging model is the cleaning layer. Start simple: TRIM whitespace from customer names.\"",
  ],
  objective:
    "Select each order's ID and customer name with leading/trailing whitespace removed, sorted by order_id.",
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
  expectedColumns: ["order_id", "customer_name"],
  expectedRows: [
    ["ORD-001", "Apex Corp"],
    ["ORD-002", "NovaSoft"],
    ["ORD-003", "QUANTUM CORP"],
    ["ORD-004", null],
    ["ORD-005", "TechWave"],
    ["ORD-006", "DataFirst"],
    ["ORD-007", "Metro Analytics"],
    ["ORD-008", "Apex Corp"],
    ["ORD-009", "NovaSoft"],
    ["ORD-010", "Quantum Corp"],
  ],
  requireRowOrder: true,
  hints: [
    "TRIM(column) removes leading and trailing spaces. NULL values pass through as NULL — TRIM(NULL) returns NULL.",
    "Try: SELECT order_id, TRIM(customer_name) AS customer_name FROM raw_orders ORDER BY order_id;",
  ],
  xpAward: 200,
};
