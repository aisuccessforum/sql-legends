import type { Mission } from "../missions/level001";

export const bi050: Mission = {
  id: "bi-ticket-050",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-050 // Final Assessment 6 of 6",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "02:00 PM. Internal system. Final Assessment.",
    "\"The complete BI Developer report. Monthly time-series: revenue, YTD, MoM growth %, share of total, revenue rank — plus two context columns that appear on every row: the top-selling category and top region for the entire period. Everything this rank taught, one query.\"",
    "\"After this: Analytics Engineer.\"",
  ],
  objective:
    "For each month, show revenue, YTD, MoM growth % (1 decimal), share of total (1 decimal), revenue rank, top revenue category (overall period), top revenue region (overall period), total transactions, and total revenue — sorted chronologically.",
  schemaLabel: "dim_product, dim_customer, fact_sales",
  seedSql: `
    CREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, product_name TEXT, category TEXT, unit_price REAL);
    CREATE TABLE dim_customer (customer_key INTEGER PRIMARY KEY, customer_name TEXT, segment TEXT, region TEXT);
    CREATE TABLE fact_sales (sale_id INTEGER PRIMARY KEY, sale_date TEXT, customer_key INTEGER, product_key INTEGER, quantity INTEGER, amount INTEGER);
    INSERT INTO dim_product (product_key, product_name, category, unit_price) VALUES (1,'DataVault Pro','Analytics',4500),(2,'QueryMaster','Analytics',1200),(3,'PipelineX','Data Engineering',8000),(4,'StreamFlow','Data Engineering',6500),(5,'ReportBuilder','Visualisation',2200),(6,'DashKit','Visualisation',3100);
    INSERT INTO dim_customer (customer_key, customer_name, segment, region) VALUES (1,'Apex Innovations','Enterprise','West'),(2,'NovaSoft','SMB','East'),(3,'Quantum Corp','Enterprise','North'),(4,'Bright Ideas Ltd','SMB','South'),(5,'TechWave','Enterprise','West'),(6,'DataFirst','SMB','East'),(7,'Metro Analytics','Enterprise','North'),(8,'Sunrise Systems','SMB','South');
    INSERT INTO fact_sales (sale_id, sale_date, customer_key, product_key, quantity, amount) VALUES (1,'2026-01-10',1,1,2,9000),(2,'2026-01-15',2,2,5,6000),(3,'2026-01-22',3,3,1,8000),(4,'2026-02-03',4,5,3,6600),(5,'2026-02-14',5,1,1,4500),(6,'2026-02-20',6,4,2,13000),(7,'2026-03-05',7,6,4,12400),(8,'2026-03-12',1,2,8,9600),(9,'2026-03-18',2,3,1,8000),(10,'2026-04-02',3,5,2,4400),(11,'2026-04-09',4,1,3,13500),(12,'2026-04-22',5,4,1,6500),(13,'2026-05-06',6,2,10,12000),(14,'2026-05-15',7,6,2,6200),(15,'2026-05-28',8,3,2,16000),(16,'2026-06-04',1,5,4,8800),(17,'2026-06-11',2,1,1,4500),(18,'2026-06-25',3,4,3,19500),(19,'2026-07-08',4,2,6,7200),(20,'2026-07-17',5,6,1,3100),(21,'2026-07-25',6,3,1,8000),(22,'2026-08-05',7,5,3,6600),(23,'2026-08-14',8,1,2,9000),(24,'2026-08-22',1,4,2,13000);
  `,
  schemaPreview: [
    { table: "dim_product", columns: ["product_key","product_name","category","unit_price"] },
    { table: "dim_customer", columns: ["customer_key","customer_name","segment","region"] },
    { table: "fact_sales", columns: ["sale_id","sale_date","customer_key","product_key","quantity","amount"] },
  ],
  expectedColumns: ["month", "revenue", "ytd", "mom_pct", "pct_of_total", "revenue_rank", "top_category", "top_region", "total_txns", "total_rev"],
  expectedRows: [
    ["2026-01", 23000, 23000, null, 10.7, 7, "Data Engineering", "North", 24, 215400],
    ["2026-02", 24100, 47100, 4.8, 11.2, 6, "Data Engineering", "North", 24, 215400],
    ["2026-03", 30000, 77100, 24.5, 13.9, 3, "Data Engineering", "North", 24, 215400],
    ["2026-04", 24400, 101500, -18.7, 11.3, 5, "Data Engineering", "North", 24, 215400],
    ["2026-05", 34200, 135700, 40.2, 15.9, 1, "Data Engineering", "North", 24, 215400],
    ["2026-06", 32800, 168500, -4.1, 15.2, 2, "Data Engineering", "North", 24, 215400],
    ["2026-07", 18300, 186800, -44.2, 8.5, 8, "Data Engineering", "North", 24, 215400],
    ["2026-08", 28600, 215400, 56.3, 13.3, 4, "Data Engineering", "North", 24, 215400],
  ],
  requireRowOrder: true,
  hints: [
    "Two building blocks in CTEs: monthly time-series (revenue, YTD, MoM, share, rank) and top-stats (scalar subqueries for top category and region, total counts). Cross-join them in the final SELECT.",
    "The top_stats CTE produces exactly one row — cross-joining it appends those constant columns to every month row without any GROUP BY.",
    "Try: WITH monthly AS (SELECT strftime('%Y-%m', sale_date) AS month, SUM(amount) AS revenue FROM fact_sales GROUP BY month), time_layer AS (SELECT month, revenue, SUM(revenue) OVER (ORDER BY month) AS ytd, ROUND(100.0*(revenue-LAG(revenue) OVER (ORDER BY month))/NULLIF(LAG(revenue) OVER (ORDER BY month),0),1) AS mom_pct, ROUND(100.0*revenue/SUM(revenue) OVER (),1) AS pct_of_total, RANK() OVER (ORDER BY revenue DESC) AS revenue_rank FROM monthly), top_stats AS (SELECT (SELECT p.category FROM fact_sales f JOIN dim_product p ON f.product_key=p.product_key GROUP BY p.category ORDER BY SUM(f.amount) DESC LIMIT 1) AS top_category, (SELECT c.region FROM fact_sales f JOIN dim_customer c ON f.customer_key=c.customer_key GROUP BY c.region ORDER BY SUM(f.amount) DESC LIMIT 1) AS top_region, (SELECT COUNT(*) FROM fact_sales) AS total_txns, (SELECT SUM(amount) FROM fact_sales) AS total_rev) SELECT t.month, t.revenue, t.ytd, t.mom_pct, t.pct_of_total, t.revenue_rank, s.top_category, s.top_region, s.total_txns, s.total_rev FROM time_layer t, top_stats s ORDER BY t.month;",
  ],
  xpAward: 300,
};
