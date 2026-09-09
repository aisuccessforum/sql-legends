import type { Mission } from "../missions/level001";

export const ae016: Mission = {
  id: "ae-ticket-016",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-016 // Priority: Critical",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "02:15 PM. Internal system. Priority: Critical.",
    "\"Module capstone — the fully enriched intermediate order model. All three staged tables joined, gross margin computed, 13 columns. This is the view every mart model in the company builds on.\"",
  ],
  objective:
    "Join all three staged tables and return the 13-column enriched order line: order_id, customer_name, segment, region, product_name, category, qty, unit_price, cost, gross_margin ((unit_price-cost)×qty rounded to 2 decimal), revenue, order_date, status — sorted by order_id.",
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
  expectedColumns: ["order_id", "customer_name", "segment", "region", "product_name", "category", "qty", "unit_price", "cost", "gross_margin", "revenue", "order_date", "status"],
  expectedRows: [
    ["ORD-001", "Apex Innovations", "Enterprise", "West", "DataVault Pro", "Analytics", 2, 4500, 3200, 2600, 9000, "2026-01-10", "confirmed"],
    ["ORD-002", "NovaSoft", "SMB", "East", "QueryMaster", "Analytics", 5, 1200, 700, 2500, 6000, "2026-01-15", "pending"],
    ["ORD-003", "Quantum Corp", "Enterprise", "North", "PipelineX", "Data Engineering", 1, 8000, 5500, 2500, 8000, "2026-01-22", "confirmed"],
    ["ORD-004", "Bright Ideas Ltd", "SMB", "South", "ReportBuilder", "Visualisation", 3, 2200, 1400, 2400, 6600, "2026-02-03", "confirmed"],
    ["ORD-005", "TechWave", "Enterprise", "West", "DataVault Pro", "Analytics", 1, 4500, 3200, 1300, 4500, "2026-02-14", "cancelled"],
    ["ORD-006", "DataFirst", "SMB", "East", "StreamFlow", "Data Engineering", 2, 6500, 4200, 4600, 13000, "2026-02-20", "confirmed"],
    ["ORD-007", "Metro Analytics", "Enterprise", "North", "DashKit", "Visualisation", 4, 3100, 2000, 4400, 12400, "2026-03-05", "confirmed"],
    ["ORD-008", "Apex Innovations", "Enterprise", "West", "QueryMaster", "Analytics", 8, 1200, 700, 4000, 9600, "2026-03-12", "pending"],
    ["ORD-009", "NovaSoft", "SMB", "East", "PipelineX", "Data Engineering", 1, 8000, 5500, 2500, 8000, "2026-03-18", "confirmed"],
    ["ORD-010", "Quantum Corp", "Enterprise", "North", "ReportBuilder", "Visualisation", 2, 2200, 1400, 1600, 4400, "2026-04-02", "confirmed"],
    ["ORD-011", "Bright Ideas Ltd", "SMB", "South", "DataVault Pro", "Analytics", 3, 4500, 3200, 3900, 13500, "2026-04-09", "confirmed"],
    ["ORD-012", "TechWave", "Enterprise", "West", "StreamFlow", "Data Engineering", 1, 6500, 4200, 2300, 6500, "2026-04-22", "confirmed"],
    ["ORD-013", "DataFirst", "SMB", "East", "QueryMaster", "Analytics", 10, 1200, 700, 5000, 12000, "2026-05-06", "confirmed"],
    ["ORD-014", "Metro Analytics", "Enterprise", "North", "DashKit", "Visualisation", 2, 3100, 2000, 2200, 6200, "2026-05-15", "confirmed"],
    ["ORD-015", "Sunrise Systems", "SMB", "South", "PipelineX", "Data Engineering", 2, 8000, 5500, 5000, 16000, "2026-05-28", "confirmed"],
    ["ORD-016", "Apex Innovations", "Enterprise", "West", "ReportBuilder", "Visualisation", 4, 2200, 1400, 3200, 8800, "2026-06-04", "confirmed"],
  ],
  requireRowOrder: true,
  hints: [
    "Three JOINs from stg_orders, ROUND((unit_price-cost)*qty,2) for gross_margin. All other columns come directly from the three staged tables.",
    "Try: SELECT o.order_id, c.customer_name, c.segment, c.region, p.product_name, p.category, o.qty, o.unit_price, p.cost, ROUND((o.unit_price-p.cost)*o.qty,2) AS gross_margin, o.revenue, o.order_date, o.status FROM stg_orders o JOIN stg_customers c ON o.customer_id=c.customer_id JOIN stg_products p ON o.product_id=p.product_id ORDER BY o.order_id;",
  ],
  xpAward: 300,
};
