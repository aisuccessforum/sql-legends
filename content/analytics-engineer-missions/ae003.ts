import type { Mission } from "../missions/level001";

export const ae003: Mission = {
  id: "ae-ticket-003",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-003 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "10:30 AM. Internal system. Priority: High.",
    "\"Type mismatch — qty and unit_price landed as TEXT. SQL can't do arithmetic on text. CAST converts them to the right type; NULL values from non-numeric text pass through as NULL.\"",
  ],
  objective:
    "Select each order's ID, qty as an integer, and unit_price as a real number, sorted by order_id.",
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
  expectedColumns: ["order_id", "qty_int", "price_real"],
  expectedRows: [
    ["ORD-001", 2, 4500],
    ["ORD-002", 5, 1200],
    ["ORD-003", 1, 8000],
    ["ORD-004", 3, 6500],
    ["ORD-005", null, 2200],
    ["ORD-006", 2, null],
    ["ORD-007", 4, 4500],
    ["ORD-008", 8, 1200],
    ["ORD-009", 1, 8000],
    ["ORD-010", 2, 6500],
  ],
  requireRowOrder: true,
  hints: [
    "CAST(column AS INTEGER) and CAST(column AS REAL) — if the text can't convert (e.g. NULL), the result is NULL.",
    "Try: SELECT order_id, CAST(qty AS INTEGER) AS qty_int, CAST(unit_price AS REAL) AS price_real FROM raw_orders ORDER BY order_id;",
  ],
  xpAward: 225,
};
