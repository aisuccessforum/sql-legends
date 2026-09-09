import type { Mission } from "../missions/level001";

export const ae039: Mission = {
  id: "ae-ticket-039",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-039 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "10:30 AM. Internal system. Priority: High.",
    "\"Flatten triple-nested SQL into a 3-CTE chain. The old query had three nested FROM subqueries. Name them stg (enriched join), int_summary (aggregate), fct_regional (roll up). Each CTE does exactly one thing.\"",
  ],
  objective:
    "Using three CTEs named stg, int_summary, and fct_regional, show each region's total revenue, gross margin, and margin percentage for confirmed orders — sorted by total_revenue descending.",
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
  expectedColumns: ["region", "total_revenue", "total_margin", "margin_pct"],
  expectedRows: [
    ["South", 36100, 11300, 31.3],
    ["East", 33000, 12100, 36.7],
    ["North", 31000, 10700, 34.5],
    ["West", 24300, 8100, 33.3],
  ],
  requireRowOrder: true,
  hints: [
    "stg: three-table JOIN + WHERE confirmed. int_summary: GROUP BY region+category, compute revenue and gross_margin. fct_regional: GROUP BY region only, sum both, compute margin_pct.",
    "Try: WITH stg AS (SELECT o.*, c.region, p.category, p.cost FROM stg_orders o JOIN stg_customers c ON o.customer_id=c.customer_id JOIN stg_products p ON o.product_id=p.product_id WHERE o.status='confirmed'), int_summary AS (SELECT region, category, SUM(revenue) AS revenue, SUM((unit_price-cost)*qty) AS gross_margin FROM stg GROUP BY region, category), fct_regional AS (SELECT region, SUM(revenue) AS total_revenue, SUM(gross_margin) AS total_margin, ROUND(100.0*SUM(gross_margin)/SUM(revenue),1) AS margin_pct FROM int_summary GROUP BY region) SELECT region, total_revenue, total_margin, margin_pct FROM fct_regional ORDER BY total_revenue DESC;",
  ],
  xpAward: 275,
};
