import type { Mission } from "../missions/level001";

export const sa046: Mission = {
  id: "sa-ticket-046",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-046 // Capstone Assessment",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "\"Second question: the full A/B test summary in one row.\"",
    "\"Control vs treatment \u2014 sample sizes, conversion rates, ARPUs, conversion lift in pp, and revenue lift percentage. The pivot uses MAX(CASE WHEN variant=... THEN metric END) to rotate group rows into columns.\"",
  ],
  objective:
    "In a single row: control count, control conversion rate, control ARPU, treatment count, treatment conversion rate, treatment ARPU, conversion lift pp (1 decimal), and revenue lift pct (1 decimal).",
  schemaLabel: "All capstone tables (5 tables)",
  seedSql: `
  CREATE TABLE sales_reps (rep_id TEXT, rep_name TEXT, region TEXT, revenue INTEGER, calls INTEGER, quota INTEGER);
  INSERT INTO sales_reps VALUES
    ('R01','Alice','North',95000,125,80000),('R02','Bob','South',62000,95,70000),
    ('R03','Carol','East',94000,140,85000),('R04','David','West',54000,88,60000),
    ('R05','Eve','North',78000,115,75000),('R06','Frank','South',43000,72,65000),
    ('R07','Grace','East',105000,150,90000),('R08','Henry','West',71000,105,70000),
    ('R09','Iris','North',88000,130,80000),('R10','Jack','South',35000,60,55000);

  CREATE TABLE customer_orders (customer_id TEXT, customer_name TEXT, segment TEXT, order_count INTEGER, total_revenue REAL);
  INSERT INTO customer_orders VALUES
    ('CU01','Apex Corp','Enterprise',48,240000),('CU02','BlueSky','SMB',12,36000),
    ('CU03','CloudBase','SMB',5,8500),('CU04','DataDriven','Enterprise',35,175000),
    ('CU05','EdgeTech','Mid-Market',22,66000),('CU06','FocusGroup','Mid-Market',18,45000),
    ('CU07','GlobalNet','Enterprise',55,330000),('CU08','HighPoint','SMB',8,12000),
    ('CU09','InfoSys','Mid-Market',25,87500),('CU10','JumpStart','SMB',3,4500),
    ('CU11','KineticLab','Enterprise',42,210000),('CU12','LeadWave','SMB',15,30000),
    ('CU13','MetaPulse','Mid-Market',30,90000),('CU14','NodeFlow','SMB',7,10500),
    ('CU15','OmniPath','Enterprise',60,420000),('CU16','PeakView','SMB',10,18000),
    ('CU17','QuantumJet','Mid-Market',20,60000),('CU18','RealEdge','SMB',4,6000),
    ('CU19','StreamLine','Enterprise',38,190000),('CU20','TechForge','Mid-Market',28,84000);

  CREATE TABLE ab_experiment (user_id TEXT, variant TEXT, converted INTEGER, revenue REAL, days_active INTEGER);
  INSERT INTO ab_experiment VALUES
    ('U001','control',1,45.00,12),('U002','control',0,0.00,3),
    ('U003','control',1,30.00,18),('U004','control',0,0.00,1),
    ('U005','control',1,60.00,25),('U006','control',0,0.00,5),
    ('U007','control',0,0.00,2),('U008','control',1,90.00,30),
    ('U009','control',0,0.00,4),('U010','control',1,75.00,22),
    ('U011','treatment',1,65.00,15),('U012','treatment',1,80.00,20),
    ('U013','treatment',0,0.00,2),('U014','treatment',1,110.00,28),
    ('U015','treatment',1,55.00,12),('U016','treatment',0,0.00,3),
    ('U017','treatment',1,95.00,22),('U018','treatment',0,0.00,1),
    ('U019','treatment',1,120.00,35),('U020','treatment',1,75.00,18);

  CREATE TABLE monthly_sales (month_num INTEGER, month_label TEXT, revenue REAL, users INTEGER);
  INSERT INTO monthly_sales VALUES
    (1,'Jan',42000,420),(2,'Feb',45000,450),(3,'Mar',48000,480),
    (4,'Apr',50000,510),(5,'May',53000,540),(6,'Jun',56000,565),
    (7,'Jul',55000,555),(8,'Aug',59000,590),(9,'Sep',62000,620),
    (10,'Oct',65000,655),(11,'Nov',68000,685),(12,'Dec',72000,720);

  CREATE TABLE order_amounts (order_id TEXT, customer_id TEXT, amount REAL, order_date TEXT);
  INSERT INTO order_amounts VALUES
    ('O001','C001',450,'2026-01-05'),('O002','C002',620,'2026-01-08'),
    ('O003','C003',380,'2026-01-12'),('O004','C004',510,'2026-01-15'),
    ('O005','C005',4800,'2026-01-18'),('O006','C006',430,'2026-01-22'),
    ('O007','C007',590,'2026-01-25'),('O008','C008',470,'2026-02-02'),
    ('O009','C009',540,'2026-02-05'),('O010','C010',490,'2026-02-08'),
    ('O011','C001',520,'2026-02-12'),('O012','C002',3900,'2026-02-15'),
    ('O013','C003',460,'2026-02-18'),('O014','C004',580,'2026-02-22'),
    ('O015','C005',500,'2026-02-25');
`,
  schemaPreview: [
    { table: "sales_reps",      columns: ["rep_id","rep_name","region","revenue","calls","quota"] },
    { table: "customer_orders", columns: ["customer_id","customer_name","segment","order_count","total_revenue"] },
    { table: "ab_experiment",   columns: ["user_id","variant","converted","revenue","days_active"] },
    { table: "monthly_sales",   columns: ["month_num","month_label","revenue","users"] },
    { table: "order_amounts",   columns: ["order_id","customer_id","amount","order_date"] },
  ],
  expectedColumns: ["ctrl_n", "ctrl_cr", "ctrl_arpu", "trt_n", "trt_cr", "trt_arpu", "conv_lift_pp", "rev_lift_pct"],
  expectedRows: [
    [10, 50, 30, 10, 70, 60, 20, 100],
  ],
  requireRowOrder: false,
  hints: [
    "Build a CTE with GROUP BY variant computing n, cr, arpu. Then pivot into a single row using MAX(CASE WHEN variant='control' THEN ...) etc.",
    "Try: WITH g AS (SELECT variant, COUNT(*) AS n, ROUND(100.0*SUM(converted)/COUNT(*),1) AS cr, ROUND(SUM(revenue)/COUNT(*),2) AS arpu FROM ab_experiment GROUP BY variant) SELECT MAX(CASE WHEN variant='control' THEN n END) AS ctrl_n, ... FROM g;",
  ],
  xpAward: 350,
};
