import type { Mission } from "../missions/level001";

export const sa044: Mission = {
  id: "sa-ticket-044",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-044 // Priority: Critical",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "02:15 PM. Priority: Critical.",
    "\"Module capstone \u2014 VP one-pager. Monthly revenue mean + stddev, A/B conversion lift, and top-20% revenue share in four numbers. This is what the CEO sees first. One row, maximum signal.\"",
  ],
  objective:
    "In a single row, show the monthly revenue mean (0 decimals), monthly revenue stddev (0 decimals), A/B conversion lift in pp (1 decimal), and top-20% customer revenue share (1 decimal %).",
  schemaLabel: "customer_orders + monthly_sales + ab_experiment",
  seedSql: `
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

  CREATE TABLE monthly_sales (month_num INTEGER, month_label TEXT, revenue REAL, users INTEGER);
  INSERT INTO monthly_sales VALUES
    (1,'Jan',42000,420),(2,'Feb',45000,450),(3,'Mar',48000,480),
    (4,'Apr',50000,510),(5,'May',53000,540),(6,'Jun',56000,565),
    (7,'Jul',55000,555),(8,'Aug',59000,590),(9,'Sep',62000,620),
    (10,'Oct',65000,655),(11,'Nov',68000,685),(12,'Dec',72000,720);

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
`,
  schemaPreview: [
    { table: "customer_orders", columns: ["customer_id","customer_name","segment","order_count","total_revenue"] },
    { table: "monthly_sales",   columns: ["month_num","month_label","revenue","users"] },
    { table: "ab_experiment",   columns: ["user_id","variant","converted","revenue","days_active"] },
  ],
  expectedColumns: ["monthly_mean", "monthly_stddev", "conv_lift_pp", "top20_pct"],
  expectedRows: [
    [56250, 8908, 20, 56.5],
  ],
  requireRowOrder: false,
  hints: [
    "Three CTEs: sales_stats for mean/stddev from monthly_sales, ab_lift for conversion rate difference from ab_experiment, pareto for top-20% concentration from customer_orders. Cross-join in the final SELECT.",
    "Try: WITH sales_stats AS (...), ab_lift AS (...), pareto AS (...) SELECT s.monthly_mean, s.monthly_stddev, a.conv_lift_pp, p.top20_pct FROM sales_stats s, ab_lift a, pareto p;",
  ],
  xpAward: 300,
};
