import type { Mission } from "../missions/level001";

export const ae041: Mission = {
  id: "ae-ticket-041",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-041 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "12:00 PM. Internal system. Priority: High.",
    "\"Replace a correlated subquery with a CTE join. The old query used (SELECT SUM(revenue) FROM stg_orders WHERE customer_id = o.customer_id AND status='confirmed') inside the SELECT — once per row. Replace it with a customer_totals CTE joined once.\"",
  ],
  objective:
    "For each confirmed order, show order_id, customer_id, revenue, the customer's total confirmed revenue, and this order's percentage of that customer total (1 decimal) — sorted by customer_id then order_id.",
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
  expectedColumns: ["order_id", "customer_id", "revenue", "customer_total", "pct_of_customer_total"],
  expectedRows: [
    ["ORD-001", "C001", 9000, 17800, 50.6],
    ["ORD-016", "C001", 8800, 17800, 49.4],
    ["ORD-009", "C002", 8000, 8000, 100],
    ["ORD-003", "C003", 8000, 12400, 64.5],
    ["ORD-010", "C003", 4400, 12400, 35.5],
    ["ORD-004", "C004", 6600, 20100, 32.8],
    ["ORD-011", "C004", 13500, 20100, 67.2],
    ["ORD-012", "C005", 6500, 6500, 100],
    ["ORD-006", "C006", 13000, 25000, 52],
    ["ORD-013", "C006", 12000, 25000, 48],
    ["ORD-007", "C007", 12400, 18600, 66.7],
    ["ORD-014", "C007", 6200, 18600, 33.3],
    ["ORD-015", "C008", 16000, 16000, 100],
  ],
  requireRowOrder: true,
  hints: [
    "WITH customer_totals AS (SELECT customer_id, SUM(revenue) AS customer_total FROM stg_orders WHERE status='confirmed' GROUP BY customer_id), then JOIN it to stg_orders on customer_id.",
    "Try: WITH customer_totals AS (SELECT customer_id, SUM(revenue) AS customer_total FROM stg_orders WHERE status='confirmed' GROUP BY customer_id) SELECT o.order_id, o.customer_id, o.revenue, ct.customer_total, ROUND(100.0*o.revenue/ct.customer_total,1) AS pct_of_customer_total FROM stg_orders o JOIN customer_totals ct ON o.customer_id=ct.customer_id WHERE o.status='confirmed' ORDER BY o.customer_id, o.order_id;",
  ],
  xpAward: 275,
};
