import type { Mission } from "../missions/level001";

export const sa043: Mission = {
  id: "sa-ticket-043",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-043 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "01:30 PM.",
    "\"Customer LTV by segment \u2014 lifetime value per account. Average total_revenue is LTV. Average revenue/order_count is average order size. High LTV + high order size = defend that segment at all costs.\"",
  ],
  objective:
    "For each segment, show customer count, average LTV (0 decimals), average order value (2 decimals), and revenue share (1 decimal %) \u2014 sorted by average LTV descending.",
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
  expectedColumns: ["segment", "customers", "avg_ltv", "avg_order_value", "revenue_share"],
  expectedRows: [
    ["Enterprise", 6, 260833, 5500, 73.7],
    ["Mid-Market", 6, 72083, 3000, 20.4],
    ["SMB", 8, 15688, 1812.5, 5.9],
  ],
  requireRowOrder: true,
  hints: [
    "AVG(total_revenue) for LTV, AVG(1.0*total_revenue/order_count) for order value. Revenue share = SUM(total_revenue)/SUM(SUM(total_revenue)) OVER ().",
    "Try: SELECT segment, COUNT(*) AS customers, ROUND(AVG(total_revenue),0) AS avg_ltv, ROUND(AVG(1.0*total_revenue/order_count),2) AS avg_order_value, ROUND(100.0*SUM(total_revenue)/SUM(SUM(total_revenue)) OVER (),1) AS revenue_share FROM customer_orders GROUP BY segment ORDER BY avg_ltv DESC;",
  ],
  xpAward: 250,
};
