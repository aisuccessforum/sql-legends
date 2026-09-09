import type { Mission } from "../missions/level001";

export const ae049: Mission = {
  id: "ae-ticket-049",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-049 // Final Assessment 7 of 8",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "03:00 PM. Final Assessment.",
    "\"Raw → staged → mart pipeline in one query chain. Stage raw_orders in a CTE (clean + compute revenue), filter to confirmed, then aggregate to a product-level mart with share of total.\"",
  ],
  objective:
    "Using CTEs named stg, confirmed, and fct_product, stage raw_orders, filter to confirmed, then show each product's units, revenue, order count, and share of total revenue (1 decimal) — sorted by revenue descending.",
  schemaLabel: "raw_orders",
  seedSql: `
    CREATE TABLE raw_orders (order_id TEXT, customer_name TEXT, product TEXT, qty TEXT, unit_price TEXT, order_date TEXT, status TEXT);
    INSERT INTO raw_orders VALUES ('ORD-001','  Apex Corp  ','DataVault Pro','2','4500.00','2026-01-10','CONFIRMED'),('ORD-002','NovaSoft','QueryMaster','5','1200.00','2026-01-15','pending'),('ORD-003','QUANTUM CORP','PipelineX','1','8000.00','2026-01-22','Confirmed'),('ORD-004',NULL,'StreamFlow','3','6500.00','2026-02-03','CONFIRMED'),('ORD-005','TechWave','ReportBuilder',NULL,'2200.00','2026-02-14','CANCELLED'),('ORD-006','  DataFirst  ','DashKit','2',NULL,'2026-02-20','confirmed'),('ORD-007','Metro Analytics','DataVault Pro','4','4500.00','2026-03-05','CONFIRMED'),('ORD-008','Apex Corp','QueryMaster','8','1200.00','2026-03-12','PENDING'),('ORD-009','NovaSoft','PipelineX','1','8000.00','2026-03-18','CONFIRMED'),('ORD-010','Quantum Corp','StreamFlow','2','6500.00','2026-04-02','CONFIRMED');
  `,
  schemaPreview: [{ table: "raw_orders", columns: ["order_id","customer_name","product","qty","unit_price","order_date","status"] }],
  expectedColumns: ["product", "units", "revenue", "orders", "pct_of_total"],
  expectedRows: [
    ["StreamFlow", 5, 32500, 2, 43],
    ["DataVault Pro", 6, 27000, 2, 35.8],
    ["PipelineX", 2, 16000, 2, 21.2],
    ["DashKit", 2, 0, 1, 0],
  ],
  requireRowOrder: true,
  hints: [
    "stg CTE: full cleaning. confirmed CTE: WHERE status='confirmed'. fct_product CTE: GROUP BY product with SUM, COUNT. Add SUM(revenue) OVER () in outer SELECT for share.",
    "Try: WITH stg AS (SELECT order_id, product, COALESCE(CAST(qty AS INTEGER),1) AS qty, COALESCE(CAST(unit_price AS REAL),0.00) AS unit_price, COALESCE(CAST(qty AS INTEGER),1)*COALESCE(CAST(unit_price AS REAL),0.00) AS revenue, CASE UPPER(status) WHEN 'CONFIRMED' THEN 'confirmed' WHEN 'PENDING' THEN 'pending' ELSE 'cancelled' END AS status FROM raw_orders), confirmed AS (SELECT * FROM stg WHERE status='confirmed'), fct_product AS (SELECT product, SUM(qty) AS units, SUM(revenue) AS revenue, COUNT(*) AS orders FROM confirmed GROUP BY product) SELECT product, units, revenue, orders, ROUND(100.0*revenue/SUM(revenue) OVER (),1) AS pct_of_total FROM fct_product ORDER BY revenue DESC;",
  ],
  xpAward: 300,
};
