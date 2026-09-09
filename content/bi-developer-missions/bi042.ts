import type { Mission } from "../missions/level001";

export const bi042: Mission = {
  id: "bi-ticket-042",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-042 // Priority: Critical",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "12:20 PM. Internal system. Priority: Critical.",
    "\"Trend anomaly detection — flag each month as Above Trend, On Track, or Below Trend based on how far its revenue sits from the rolling 3-month average. Anything more than 15% above is flagged high; more than 15% below is flagged low.\"",
  ],
  objective:
    "For each month, show revenue, its rolling 3-month average (0 decimals), and a trend flag, sorted chronologically.",
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
  expectedColumns: ["month", "revenue", "rolling_3m_avg", "trend_flag"],
  expectedRows: [
    ["2026-01", 23000, 23000, "On Track"],
    ["2026-02", 24100, 24000, "On Track"],
    ["2026-03", 30000, 26000, "Above Trend"],
    ["2026-04", 24400, 26200, "On Track"],
    ["2026-05", 34200, 29500, "Above Trend"],
    ["2026-06", 32800, 30500, "On Track"],
    ["2026-07", 18300, 28400, "Below Trend"],
    ["2026-08", 28600, 26600, "On Track"],
  ],
  requireRowOrder: true,
  hints: [
    "Compute monthly totals first (a base CTE), then add the rolling 3-month average as a second CTE using ROWS BETWEEN 2 PRECEDING AND CURRENT ROW. The CASE goes in the outer SELECT.",
    "15% above = revenue > rolling_avg * 1.15; 15% below = revenue < rolling_avg * 0.85.",
    "Try: WITH monthly AS (SELECT strftime('%Y-%m', sale_date) AS month, SUM(amount) AS revenue FROM fact_sales GROUP BY month), with_rolling AS (SELECT month, revenue, ROUND(AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW),0) AS rolling_3m_avg FROM monthly) SELECT month, revenue, rolling_3m_avg, CASE WHEN revenue > rolling_3m_avg*1.15 THEN 'Above Trend' WHEN revenue < rolling_3m_avg*0.85 THEN 'Below Trend' ELSE 'On Track' END AS trend_flag FROM with_rolling ORDER BY month;",
  ],
  xpAward: 275,
};
