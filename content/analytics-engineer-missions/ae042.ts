import type { Mission } from "../missions/level001";

export const ae042: Mission = {
  id: "ae-ticket-042",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-042 // Priority: Critical",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "12:45 PM. Internal system. Priority: Critical.",
    "\"Module capstone — the full 4-CTE pipeline. stg_enriched (join + enrich), int_confirmed (filter), int_metrics (aggregate by category+segment), fct_report (add margin_pct, share of category, rank within category). No raw table access after stg_.\"",
  ],
  objective:
    "Build a 4-CTE pipeline and return: category, segment, units, revenue, gross_margin, margin_pct (1 decimal), pct_of_category (1 decimal), rank_in_category — sorted by category then revenue descending.",
  schemaLabel: "stg_orders, stg_customers, stg_products",
  seedSql: `
    CREATE TABLE stg_orders (order_id TEXT, customer_id TEXT, product_id TEXT, qty INTEGER, unit_price REAL, order_date TEXT, status TEXT, revenue REAL);
    CREATE TABLE stg_customers (customer_id TEXT, customer_name TEXT, region TEXT, segment TEXT);
    CREATE TABLE stg_products (product_id TEXT, product_name TEXT, category TEXT, cost REAL);
    INSERT INTO stg_customers VALUES ('C001','Apex Innovations','West','Enterprise'),('C002','NovaSoft','East','SMB'),('C003','Quantum Corp','North','Enterprise'),('C004','Bright Ideas Ltd','South','SMB'),('C005','TechWave','West','Enterprise'),('C006','DataFirst','East','SMB'),('C007','Metro Analytics','North','Enterprise'),('C008','Sunrise Systems','South','SMB');
    INSERT INTO stg_products VALUES ('P001','DataVault Pro','Analytics',3200.00),('P002','QueryMaster','Analytics',700.00),('P003','PipelineX','Data Engineering',5500.00),('P004','StreamFlow','Data Engineering',4200.00),('P005','ReportBuilder','Visualisation',1400.00),('P006','DashKit','Visualisation',2000.00);
    INSERT INTO stg_orders VALUES ('ORD-001','C001','P001',2,4500.00,'2026-01-10','confirmed',9000.00),('ORD-002','C002','P002',5,1200.00,'2026-01-15','pending',6000.00),('ORD-003','C003','P003',1,8000.00,'2026-01-22','confirmed',8000.00),('ORD-004','C004','P005',3,2200.00,'2026-02-03','confirmed',6600.00),('ORD-005','C005','P001',1,4500.00,'2026-02-14','cancelled',4500.00),('ORD-006','C006','P004',2,6500.00,'2026-02-20','confirmed',13000.00),('ORD-007','C007','P006',4,3100.00,'2026-03-05','confirmed',12400.00),('ORD-008','C001','P002',8,1200.00,'2026-03-12','pending',9600.00),('ORD-009','C002','P003',1,8000.00,'2026-03-18','confirmed',8000.00),('ORD-010','C003','P005',2,2200.00,'2026-04-02','confirmed',4400.00),('ORD-011','C004','P001',3,4500.00,'2026-04-09','confirmed',13500.00),('ORD-012','C005','P004',1,6500.00,'2026-04-22','confirmed',6500.00),('ORD-013','C006','P002',10,1200.00,'2026-05-06','confirmed',12000.00),('ORD-014','C007','P006',2,3100.00,'2026-05-15','confirmed',6200.00),('ORD-015','C008','P003',2,8000.00,'2026-05-28','confirmed',16000.00),('ORD-016','C001','P005',4,2200.00,'2026-06-04','confirmed',8800.00);
  `,
  schemaPreview: [
    { table: "stg_orders",    columns: ["order_id","customer_id","product_id","qty","unit_price","order_date","status","revenue"] },
    { table: "stg_customers", columns: ["customer_id","customer_name","region","segment"] },
    { table: "stg_products",  columns: ["product_id","product_name","category","cost"] },
  ],
  expectedColumns: ["category", "segment", "units", "revenue", "gross_margin", "margin_pct", "pct_of_category", "rank_in_category"],
  expectedRows: [
    ["Analytics", "SMB", 13, 25500, 8900, 34.9, 73.9, 1],
    ["Analytics", "Enterprise", 2, 9000, 2600, 28.9, 26.1, 2],
    ["Data Engineering", "SMB", 5, 37000, 12100, 32.7, 71.8, 1],
    ["Data Engineering", "Enterprise", 2, 14500, 4800, 33.1, 28.2, 2],
    ["Visualisation", "Enterprise", 12, 31800, 11400, 35.8, 82.8, 1],
    ["Visualisation", "SMB", 3, 6600, 2400, 36.4, 17.2, 2],
  ],
  requireRowOrder: true,
  hints: [
    "4 CTEs: stg_enriched = 3-table join; int_confirmed = WHERE status='confirmed'; int_metrics = GROUP BY category, segment with revenue + gross_margin; fct_report = add margin_pct, ROUND(100.0*revenue/SUM(revenue) OVER (PARTITION BY category),1) for share, RANK() OVER (PARTITION BY category ORDER BY revenue DESC) for rank.",
    "Try: WITH stg_enriched AS (SELECT o.order_id, c.segment, p.category, o.qty, o.unit_price, p.cost, o.revenue, o.status FROM stg_orders o JOIN stg_customers c ON o.customer_id=c.customer_id JOIN stg_products p ON o.product_id=p.product_id), int_confirmed AS (SELECT * FROM stg_enriched WHERE status='confirmed'), int_metrics AS (SELECT category, segment, SUM(qty) AS units, SUM(revenue) AS revenue, ROUND(SUM((unit_price-cost)*qty),2) AS gross_margin FROM int_confirmed GROUP BY category, segment), fct_report AS (SELECT category, segment, units, revenue, gross_margin, ROUND(100.0*gross_margin/revenue,1) AS margin_pct, ROUND(100.0*revenue/SUM(revenue) OVER (PARTITION BY category),1) AS pct_of_category, RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS rank_in_category FROM int_metrics) SELECT category, segment, units, revenue, gross_margin, margin_pct, pct_of_category, rank_in_category FROM fct_report ORDER BY category, revenue DESC;",
  ],
  xpAward: 300,
};
