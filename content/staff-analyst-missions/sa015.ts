import type { Mission } from "../missions/level001";

export const sa015: Mission = {
  id: "sa-ticket-015",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-015 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "01:30 PM.",
    "\"Segment concentration \u2014 do Enterprise customers generate 80% of revenue from 30% of the count? SUM(SUM(revenue)) OVER () gives the grand total from within a GROUP BY. This is the table that drives pricing tier decisions.\"",
  ],
  objective:
    "For each segment, show customer count, total revenue, average revenue (0 decimals), and revenue share (1 decimal %) \u2014 sorted by total revenue descending.",
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
  expectedColumns: ["segment", "customers", "segment_revenue", "avg_revenue", "revenue_share"],
  expectedRows: [
    ["Enterprise", 6, 1565000, 260833, 73.7],
    ["Mid-Market", 6, 432500, 72083, 20.4],
    ["SMB", 8, 125500, 15688, 5.9],
  ],
  requireRowOrder: true,
  hints: [
    "ROUND(100.0*SUM(total_revenue)/SUM(SUM(total_revenue)) OVER (),1) \u2014 the outer SUM() OVER () sums the GROUP BY aggregates globally.",
    "Try: SELECT segment, COUNT(*) AS customers, SUM(total_revenue) AS segment_revenue, ROUND(AVG(total_revenue),0) AS avg_revenue, ROUND(100.0*SUM(total_revenue)/SUM(SUM(total_revenue)) OVER (),1) AS revenue_share FROM customer_orders GROUP BY segment ORDER BY segment_revenue DESC;",
  ],
  xpAward: 250,
};
