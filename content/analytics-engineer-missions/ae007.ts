import type { Mission } from "../missions/level001";

export const ae007: Mission = {
  id: "ae-ticket-007",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-007 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "01:30 PM. Internal system. Priority: High.",
    "\"Revenue column — a derived column calculated from qty × unit_price. When either input is NULL, the product is NULL too (NULL arithmetic). That's the correct behaviour in staging: don't hide missing data with a zero.\"",
  ],
  objective:
    "Select order_id, qty as integer, unit_price as real, and revenue (qty × unit_price — NULL when either is missing), sorted by order_id.",
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
  expectedColumns: ["order_id", "qty", "unit_price", "revenue"],
  expectedRows: [
    ["ORD-001", 2, 4500, 9000],
    ["ORD-002", 5, 1200, 6000],
    ["ORD-003", 1, 8000, 8000],
    ["ORD-004", 3, 6500, 19500],
    ["ORD-005", null, 2200, null],
    ["ORD-006", 2, null, null],
    ["ORD-007", 4, 4500, 18000],
    ["ORD-008", 8, 1200, 9600],
    ["ORD-009", 1, 8000, 8000],
    ["ORD-010", 2, 6500, 13000],
  ],
  requireRowOrder: true,
  hints: [
    "CAST(qty AS INTEGER) * CAST(unit_price AS REAL) — SQLite propagates NULL through multiplication automatically.",
    "Try: SELECT order_id, CAST(qty AS INTEGER) AS qty, CAST(unit_price AS REAL) AS unit_price, CAST(qty AS INTEGER)*CAST(unit_price AS REAL) AS revenue FROM raw_orders ORDER BY order_id;",
  ],
  xpAward: 225,
};
