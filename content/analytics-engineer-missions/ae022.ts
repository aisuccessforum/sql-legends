import type { Mission } from "../missions/level001";

export const ae022: Mission = {
  id: "ae-ticket-022",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-022 // Priority: Critical",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "12:45 PM. Internal system. Priority: Critical.",
    "\"Module capstone — category mart with segment split and margin. Enterprise vs SMB revenue side by side, total, and margin percentage. This is the mart every C-suite dashboard reads from.\"",
  ],
  objective:
    "For confirmed orders, show each product category's Enterprise revenue, SMB revenue, total revenue, and gross margin percentage (1 decimal) — sorted by total_revenue descending.",
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
  expectedColumns: ["category", "enterprise_rev", "smb_rev", "total_revenue", "margin_pct"],
  expectedRows: [
    ["Data Engineering", 14500, 37000, 51500, 32.8],
    ["Visualisation", 31800, 6600, 38400, 35.9],
    ["Analytics", 9000, 25500, 34500, 33.3],
  ],
  requireRowOrder: true,
  hints: [
    "Join all three staged tables, WHERE confirmed, GROUP BY category. Conditional SUM for Enterprise/SMB pivot. Margin = ROUND(100.0*SUM((unit_price-cost)*qty)/SUM(revenue),1).",
    "Try: SELECT p.category, SUM(CASE WHEN c.segment='Enterprise' THEN o.revenue ELSE 0 END) AS enterprise_rev, SUM(CASE WHEN c.segment='SMB' THEN o.revenue ELSE 0 END) AS smb_rev, SUM(o.revenue) AS total_revenue, ROUND(100.0*SUM((o.unit_price-p.cost)*o.qty)/SUM(o.revenue),1) AS margin_pct FROM stg_orders o JOIN stg_products p ON o.product_id=p.product_id JOIN stg_customers c ON o.customer_id=c.customer_id WHERE o.status='confirmed' GROUP BY p.category ORDER BY total_revenue DESC;",
  ],
  xpAward: 300,
};
