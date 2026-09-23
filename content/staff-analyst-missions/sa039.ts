import type { Mission } from "../missions/level001";

export const sa039: Mission = {
  id: "sa-ticket-039",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-039 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "10:30 AM.",
    "\"Pareto analysis \u2014 the 80/20 rule. Top 20% of customers by revenue should account for ~80% of revenue. In a single row: how many customers are in the top 20%, what's their revenue, and what percentage is that? n/5 gives you the top quintile row count.\"",
  ],
  objective:
    "In a single row, show the count of top-20% customers, their combined revenue, total revenue across all customers, and their revenue percentage (1 decimal).",
  schemaLabel: "customer_orders",
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
`,
  schemaPreview: [{ table: "customer_orders", columns: ["customer_id","customer_name","segment","order_count","total_revenue"] }],
  expectedColumns: ["top_n_customers", "top_revenue", "total_revenue", "top_pct"],
  expectedRows: [
    [4, 1200000, 2123000, 56.5],
  ],
  requireRowOrder: false,
  hints: [
    "ROW_NUMBER() OVER (ORDER BY total_revenue DESC) ranks customers. COUNT() OVER () gives total count. Filter WHERE rn <= n/5 for the top 20%.",
    "Try: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (ORDER BY total_revenue DESC) AS rn, COUNT(*) OVER () AS n, SUM(total_revenue) OVER () AS grand_total FROM customer_orders), top20 AS (SELECT * FROM ranked WHERE rn<=n/5) SELECT COUNT(*) AS top_n_customers, SUM(total_revenue) AS top_revenue, MAX(grand_total) AS total_revenue, ROUND(100.0*SUM(total_revenue)/MAX(grand_total),1) AS top_pct FROM top20;",
  ],
  xpAward: 250,
};
