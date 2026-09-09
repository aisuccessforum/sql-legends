import type { Mission } from "../missions/level001";

export const ae006: Mission = {
  id: "ae-ticket-006",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-006 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "12:45 PM. Internal system. Priority: High.",
    "\"Mini staging model — all four transforms in one SELECT. TRIM + COALESCE on name, COALESCE(CAST()) on qty and price, CASE UPPER() on status. This is the actual shape of a dbt staging model.\"",
  ],
  objective:
    "Select all seven columns cleaned: order_id unchanged, customer_name trimmed and defaulted to 'Unknown', product unchanged, qty as integer (default 1), unit_price as real (default 0.00), order_date unchanged, status normalised to confirmed/pending/cancelled — sorted by order_id.",
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
  expectedColumns: ["order_id", "customer_name", "product", "qty", "unit_price", "order_date", "status"],
  expectedRows: [
    ["ORD-001", "Apex Corp", "DataVault Pro", 2, 4500, "2026-01-10", "confirmed"],
    ["ORD-002", "NovaSoft", "QueryMaster", 5, 1200, "2026-01-15", "pending"],
    ["ORD-003", "QUANTUM CORP", "PipelineX", 1, 8000, "2026-01-22", "confirmed"],
    ["ORD-004", "Unknown", "StreamFlow", 3, 6500, "2026-02-03", "confirmed"],
    ["ORD-005", "TechWave", "ReportBuilder", 1, 2200, "2026-02-14", "cancelled"],
    ["ORD-006", "DataFirst", "DashKit", 2, 0, "2026-02-20", "confirmed"],
    ["ORD-007", "Metro Analytics", "DataVault Pro", 4, 4500, "2026-03-05", "confirmed"],
    ["ORD-008", "Apex Corp", "QueryMaster", 8, 1200, "2026-03-12", "pending"],
    ["ORD-009", "NovaSoft", "PipelineX", 1, 8000, "2026-03-18", "confirmed"],
    ["ORD-010", "Quantum Corp", "StreamFlow", 2, 6500, "2026-04-02", "confirmed"],
  ],
  requireRowOrder: true,
  hints: [
    "Combine all prior techniques: TRIM(COALESCE(customer_name,'Unknown')), COALESCE(CAST(qty AS INTEGER),1), COALESCE(CAST(unit_price AS REAL),0.00), CASE UPPER(status).",
    "Try: SELECT order_id, TRIM(COALESCE(customer_name,'Unknown')) AS customer_name, product, COALESCE(CAST(qty AS INTEGER),1) AS qty, COALESCE(CAST(unit_price AS REAL),0.00) AS unit_price, order_date, CASE UPPER(status) WHEN 'CONFIRMED' THEN 'confirmed' WHEN 'PENDING' THEN 'pending' ELSE 'cancelled' END AS status FROM raw_orders ORDER BY order_id;",
  ],
  xpAward: 250,
};
