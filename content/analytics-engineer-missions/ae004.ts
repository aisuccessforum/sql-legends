import type { Mission } from "../missions/level001";

export const ae004: Mission = {
  id: "ae-ticket-004",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-004 // Priority: Medium",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "11:15 AM. Internal system. Priority: Medium.",
    "\"NULL substitution — COALESCE returns the first non-NULL argument. Missing customer gets 'Unknown'. Missing qty defaults to 1 (assume single unit). Missing price defaults to 0.00.\"",
  ],
  objective:
    "Select each order's ID, customer name (defaulting to 'Unknown'), qty as integer (defaulting to 1), and unit_price as real (defaulting to 0.00), sorted by order_id.",
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
  expectedColumns: ["order_id", "customer_name", "qty", "unit_price"],
  expectedRows: [
    ["ORD-001", "  Apex Corp  ", 2, 4500],
    ["ORD-002", "NovaSoft", 5, 1200],
    ["ORD-003", "QUANTUM CORP", 1, 8000],
    ["ORD-004", "Unknown", 3, 6500],
    ["ORD-005", "TechWave", 1, 2200],
    ["ORD-006", "  DataFirst  ", 2, 0],
    ["ORD-007", "Metro Analytics", 4, 4500],
    ["ORD-008", "Apex Corp", 8, 1200],
    ["ORD-009", "NovaSoft", 1, 8000],
    ["ORD-010", "Quantum Corp", 2, 6500],
  ],
  requireRowOrder: true,
  hints: [
    "COALESCE(col, default) — put the CAST inside if the column is text: COALESCE(CAST(qty AS INTEGER), 1).",
    "Try: SELECT order_id, COALESCE(customer_name,'Unknown') AS customer_name, COALESCE(CAST(qty AS INTEGER),1) AS qty, COALESCE(CAST(unit_price AS REAL),0.00) AS unit_price FROM raw_orders ORDER BY order_id;",
  ],
  xpAward: 225,
};
