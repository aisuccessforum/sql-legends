import type { Mission } from "../missions/level001";

export const ae043: Mission = {
  id: "ae-ticket-043",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-043 // Final Assessment 1 of 8",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "09:00 AM. Internal system. Final Assessment.",
    "Eight tickets. No module label. No technique named.",
    "\"Stage the raw data — write the staging model as a CTE and return only confirmed orders, all columns cleaned.\"",
  ],
  objective:
    "Using a CTE named 'stg', clean raw_orders (TRIM name, default to Unknown, COALESCE qty/price with defaults, normalise status) and return confirmed orders only — all 8 columns — sorted by order_id.",
  schemaLabel: "raw_orders",
  seedSql: `
    CREATE TABLE raw_orders (order_id TEXT, customer_name TEXT, product TEXT, qty TEXT, unit_price TEXT, order_date TEXT, status TEXT);
    INSERT INTO raw_orders VALUES ('ORD-001','  Apex Corp  ','DataVault Pro','2','4500.00','2026-01-10','CONFIRMED'),('ORD-002','NovaSoft','QueryMaster','5','1200.00','2026-01-15','pending'),('ORD-003','QUANTUM CORP','PipelineX','1','8000.00','2026-01-22','Confirmed'),('ORD-004',NULL,'StreamFlow','3','6500.00','2026-02-03','CONFIRMED'),('ORD-005','TechWave','ReportBuilder',NULL,'2200.00','2026-02-14','CANCELLED'),('ORD-006','  DataFirst  ','DashKit','2',NULL,'2026-02-20','confirmed'),('ORD-007','Metro Analytics','DataVault Pro','4','4500.00','2026-03-05','CONFIRMED'),('ORD-008','Apex Corp','QueryMaster','8','1200.00','2026-03-12','PENDING'),('ORD-009','NovaSoft','PipelineX','1','8000.00','2026-03-18','CONFIRMED'),('ORD-010','Quantum Corp','StreamFlow','2','6500.00','2026-04-02','CONFIRMED');
  `,
  schemaPreview: [{ table: "raw_orders", columns: ["order_id","customer_name","product","qty","unit_price","order_date","status"] }],
  expectedColumns: ["order_id", "customer_name", "product", "qty", "unit_price", "revenue", "order_date", "status"],
  expectedRows: [
    ["ORD-001", "Apex Corp", "DataVault Pro", 2, 4500, 9000, "2026-01-10", "confirmed"],
    ["ORD-003", "QUANTUM CORP", "PipelineX", 1, 8000, 8000, "2026-01-22", "confirmed"],
    ["ORD-004", "Unknown", "StreamFlow", 3, 6500, 19500, "2026-02-03", "confirmed"],
    ["ORD-006", "DataFirst", "DashKit", 2, 0, 0, "2026-02-20", "confirmed"],
    ["ORD-007", "Metro Analytics", "DataVault Pro", 4, 4500, 18000, "2026-03-05", "confirmed"],
    ["ORD-009", "NovaSoft", "PipelineX", 1, 8000, 8000, "2026-03-18", "confirmed"],
    ["ORD-010", "Quantum Corp", "StreamFlow", 2, 6500, 13000, "2026-04-02", "confirmed"],
  ],
  requireRowOrder: true,
  hints: [
    "Build the stg CTE with all cleaning transforms, then SELECT * FROM stg WHERE status='confirmed'.",
    "Try: WITH stg AS (SELECT order_id, TRIM(COALESCE(customer_name,'Unknown')) AS customer_name, product, COALESCE(CAST(qty AS INTEGER),1) AS qty, COALESCE(CAST(unit_price AS REAL),0.00) AS unit_price, COALESCE(CAST(qty AS INTEGER),1)*COALESCE(CAST(unit_price AS REAL),0.00) AS revenue, order_date, CASE UPPER(status) WHEN 'CONFIRMED' THEN 'confirmed' WHEN 'PENDING' THEN 'pending' ELSE 'cancelled' END AS status FROM raw_orders) SELECT * FROM stg WHERE status='confirmed' ORDER BY order_id;",
  ],
  xpAward: 300,
};
