import type { Mission } from "../missions/level001";

export const bi047: Mission = {
  id: "bi-ticket-047",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-047 // Final Assessment 3 of 6",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "11:00 AM. Internal system. Final Assessment.",
    "\"Regional YTD tracker — per region per month, monthly revenue and the region's running year-to-date total. Each region's YTD resets independently (it's partitioned, not a global running total).\"",
  ],
  objective:
    "For each region and month (in months where that region had sales), show monthly revenue and the region's YTD cumulative, sorted by region then month.",
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
  expectedColumns: ["region", "month", "revenue", "regional_ytd"],
  expectedRows: [
    ["East", "2026-01", 6000, 6000],
    ["East", "2026-02", 13000, 19000],
    ["East", "2026-03", 8000, 27000],
    ["East", "2026-05", 12000, 39000],
    ["East", "2026-06", 4500, 43500],
    ["East", "2026-07", 8000, 51500],
    ["North", "2026-01", 8000, 8000],
    ["North", "2026-03", 12400, 20400],
    ["North", "2026-04", 4400, 24800],
    ["North", "2026-05", 6200, 31000],
    ["North", "2026-08", 6600, 37600],
    ["North", "2026-06", 27500, null],
    ["South", "2026-02", 6600, 6600],
    ["South", "2026-04", 13500, 20100],
    ["South", "2026-05", 16000, 36100],
    ["South", "2026-06", null, null],
    ["West", "2026-01", 9000, 9000],
    ["West", "2026-02", 4500, 13500],
    ["West", "2026-03", 9600, 23100],
    ["West", "2026-04", 6500, 29600],
    ["West", "2026-06", 8800, 38400],
    ["West", "2026-07", 3100, 41500],
    ["West", "2026-08", 9000, 50500],
    ["West", "2026-08", 13000, null],
  ],
  requireRowOrder: false,
  hints: [
    "Aggregate to region+month level first in a CTE, then SUM() OVER (PARTITION BY region ORDER BY month) gives each region's running total independently.",
    "Try: WITH region_month AS (SELECT c.region, strftime('%Y-%m', f.sale_date) AS month, SUM(f.amount) AS revenue FROM fact_sales f JOIN dim_customer c ON f.customer_key=c.customer_key GROUP BY c.region, month) SELECT region, month, revenue, SUM(revenue) OVER (PARTITION BY region ORDER BY month) AS regional_ytd FROM region_month ORDER BY region, month;",
  ],
  xpAward: 300,
};
