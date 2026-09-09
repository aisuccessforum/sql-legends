import type { Mission } from "../missions/level001";

export const bi044: Mission = {
  id: "bi-ticket-044",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-044 // Priority: Critical",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "01:40 PM. Internal system. Priority: Critical.",
    "\"Module capstone — the single-row executive summary. Total revenue, transaction count, average deal, total units, top category, and top region — all in one row. This is the headline card on the CEO dashboard.\"",
  ],
  objective:
    "In a single row, show total revenue, total transactions, average deal (0 decimals), total units, top revenue category, and top revenue region.",
  schemaLabel: "dim_product, dim_customer, fact_sales",
  seedSql: `
    CREATE TABLE dim_product (
      product_key INTEGER PRIMARY KEY, product_name TEXT, category TEXT, unit_price REAL
    );
    CREATE TABLE dim_customer (
      customer_key INTEGER PRIMARY KEY, customer_name TEXT, segment TEXT, region TEXT
    );
    CREATE TABLE fact_sales (
      sale_id INTEGER PRIMARY KEY, sale_date TEXT, customer_key INTEGER,
      product_key INTEGER, quantity INTEGER, amount INTEGER
    );
    INSERT INTO dim_product (product_key, product_name, category, unit_price) VALUES
      (1,'DataVault Pro','Analytics',4500),(2,'QueryMaster','Analytics',1200),
      (3,'PipelineX','Data Engineering',8000),(4,'StreamFlow','Data Engineering',6500),
      (5,'ReportBuilder','Visualisation',2200),(6,'DashKit','Visualisation',3100);
    INSERT INTO dim_customer (customer_key, customer_name, segment, region) VALUES
      (1,'Apex Innovations','Enterprise','West'),(2,'NovaSoft','SMB','East'),
      (3,'Quantum Corp','Enterprise','North'),(4,'Bright Ideas Ltd','SMB','South'),
      (5,'TechWave','Enterprise','West'),(6,'DataFirst','SMB','East'),
      (7,'Metro Analytics','Enterprise','North'),(8,'Sunrise Systems','SMB','South');
    INSERT INTO fact_sales (sale_id, sale_date, customer_key, product_key, quantity, amount) VALUES
      (1,'2026-01-10',1,1,2,9000),(2,'2026-01-15',2,2,5,6000),(3,'2026-01-22',3,3,1,8000),
      (4,'2026-02-03',4,5,3,6600),(5,'2026-02-14',5,1,1,4500),(6,'2026-02-20',6,4,2,13000),
      (7,'2026-03-05',7,6,4,12400),(8,'2026-03-12',1,2,8,9600),(9,'2026-03-18',2,3,1,8000),
      (10,'2026-04-02',3,5,2,4400),(11,'2026-04-09',4,1,3,13500),(12,'2026-04-22',5,4,1,6500),
      (13,'2026-05-06',6,2,10,12000),(14,'2026-05-15',7,6,2,6200),(15,'2026-05-28',8,3,2,16000),
      (16,'2026-06-04',1,5,4,8800),(17,'2026-06-11',2,1,1,4500),(18,'2026-06-25',3,4,3,19500),
      (19,'2026-07-08',4,2,6,7200),(20,'2026-07-17',5,6,1,3100),(21,'2026-07-25',6,3,1,8000),
      (22,'2026-08-05',7,5,3,6600),(23,'2026-08-14',8,1,2,9000),(24,'2026-08-22',1,4,2,13000);
  `,
  schemaPreview: [
    { table: "dim_product", columns: ["product_key","product_name","category","unit_price"] },
    { table: "dim_customer", columns: ["customer_key","customer_name","segment","region"] },
    { table: "fact_sales", columns: ["sale_id","sale_date","customer_key","product_key","quantity","amount"] },
  ],
  expectedColumns: ["total_rev", "total_txns", "avg_deal", "total_units", "top_category", "top_region"],
  expectedRows: [
    [215400, 24, 8975, 70, "Data Engineering", "North"],
  ],
  requireRowOrder: false,
  hints: [
    "Scalar subqueries pull the top category and top region: (SELECT category FROM ... ORDER BY SUM(amount) DESC LIMIT 1).",
    "Try: SELECT SUM(f.amount) AS total_rev, COUNT(*) AS total_txns, ROUND(AVG(f.amount),0) AS avg_deal, SUM(f.quantity) AS total_units, (SELECT p.category FROM fact_sales f2 JOIN dim_product p ON f2.product_key=p.product_key GROUP BY p.category ORDER BY SUM(f2.amount) DESC LIMIT 1) AS top_category, (SELECT c.region FROM fact_sales f3 JOIN dim_customer c ON f3.customer_key=c.customer_key GROUP BY c.region ORDER BY SUM(f3.amount) DESC LIMIT 1) AS top_region FROM fact_sales f;",
  ],
  xpAward: 300,
};
