import type { Mission } from "../missions/level001";

export const bi048: Mission = {
  id: "bi-ticket-048",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-048 // Final Assessment 4 of 6",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "12:00 PM. Internal system. Final Assessment.",
    "\"Region × category cross-tab with subtotals — region+category detail rows, region subtotal rows, and a grand total. Four modules combined: star schema JOIN, conditional aggregation, subtotal union, report ordering.\"",
  ],
  objective:
    "Build a UNION ALL report: region+category detail rows, region subtotal rows (category='ALL'), and a grand total, ordered by row type then region.",
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
  expectedColumns: ["region", "category", "revenue", "row_type"],
  expectedRows: [
    ["East", "Analytics", 22500, "Detail"],
    ["East", "Data Engineering", 29000, "Detail"],
    ["North", "Analytics", null, "Detail"],
    ["North", "Data Engineering", 27500, "Detail"],
    ["North", "Visualisation", 29600, "Detail"],
    ["South", "Analytics", 29700, "Detail"],
    ["South", "Data Engineering", 16000, "Detail"],
    ["South", "Visualisation", 6600, "Detail"],
    ["West", "Analytics", 23100, "Detail"],
    ["West", "Data Engineering", 19500, "Detail"],
    ["West", "Visualisation", 11900, "Detail"],
    ["East", "ALL", 51500, "Region Total"],
    ["North", "ALL", 57100, "Region Total"],
    ["South", "ALL", 52300, "Region Total"],
    ["West", "ALL", 54500, "Region Total"],
    ["ALL", "ALL", 215400, "Grand Total"],
  ],
  requireRowOrder: false,
  hints: [
    "Build the region+category aggregates from the star schema in a CTE, then UNION ALL three SELECT blocks: detail, region subtotals (GROUP BY region), grand total.",
    "ORDER BY 4 DESC, 1, 2 sorts Grand Total last, Region Total before Detail (alphabetically), regions and categories alphabetically within.",
    "Try: WITH region_cat AS (SELECT c.region, p.category, SUM(f.amount) AS revenue FROM fact_sales f JOIN dim_product p ON f.product_key=p.product_key JOIN dim_customer c ON f.customer_key=c.customer_key GROUP BY c.region, p.category) SELECT region, category, revenue, 'Detail' AS row_type FROM region_cat UNION ALL SELECT region, 'ALL', SUM(revenue), 'Region Total' FROM region_cat GROUP BY region UNION ALL SELECT 'ALL','ALL', SUM(revenue), 'Grand Total' FROM region_cat ORDER BY 4 DESC, 1, 2;",
  ],
  xpAward: 300,
};
