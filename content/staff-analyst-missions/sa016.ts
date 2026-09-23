import type { Mission } from "../missions/level001";

export const sa016: Mission = {
  id: "sa-ticket-016",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-016 // Priority: Critical",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "02:15 PM. Priority: Critical.",
    "\"Module capstone \u2014 full customer percentile profile. Three window functions in a CTE to avoid SQLite's alias-reuse restriction, then expose all columns. This is the customer distribution table before a pricing review.\"",
  ],
  objective:
    "Show each customer's ID, name, segment, total revenue, quartile, percent rank (1 decimal, 0\u2013100 scale), and cumulative distribution pct (1 decimal) \u2014 sorted by total revenue descending.",
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
  expectedColumns: ["customer_id", "customer_name", "segment", "total_revenue", "quartile", "pct_rank", "cume_dist_pct"],
  expectedRows: [
    ["CU15", "OmniPath", "Enterprise", 420000, 4, 100, 100],
    ["CU07", "GlobalNet", "Enterprise", 330000, 4, 94.7, 95],
    ["CU01", "Apex Corp", "Enterprise", 240000, 4, 89.5, 90],
    ["CU11", "KineticLab", "Enterprise", 210000, 4, 84.2, 85],
    ["CU19", "StreamLine", "Enterprise", 190000, 4, 78.9, 80],
    ["CU04", "DataDriven", "Enterprise", 175000, 3, 73.7, 75],
    ["CU13", "MetaPulse", "Mid-Market", 90000, 3, 68.4, 70],
    ["CU09", "InfoSys", "Mid-Market", 87500, 3, 63.2, 65],
    ["CU20", "TechForge", "Mid-Market", 84000, 3, 57.9, 60],
    ["CU05", "EdgeTech", "Mid-Market", 66000, 3, 52.6, 55],
    ["CU17", "QuantumJet", "Mid-Market", 60000, 2, 47.4, 50],
    ["CU06", "FocusGroup", "Mid-Market", 45000, 2, 42.1, 45],
    ["CU02", "BlueSky", "SMB", 36000, 2, 36.8, 40],
    ["CU12", "LeadWave", "SMB", 30000, 2, 31.6, 35],
    ["CU16", "PeakView", "SMB", 18000, 2, 26.3, 30],
    ["CU08", "HighPoint", "SMB", 12000, 1, 21.1, 25],
    ["CU14", "NodeFlow", "SMB", 10500, 1, 15.8, 20],
    ["CU03", "CloudBase", "SMB", 8500, 1, 10.5, 15],
    ["CU18", "RealEdge", "SMB", 6000, 1, 5.3, 10],
    ["CU10", "JumpStart", "SMB", 4500, 1, 0, 5],
  ],
  requireRowOrder: true,
  hints: [
    "Compute NTILE, PERCENT_RANK*100, and CUME_DIST*100 inside a CTE (named 'profile'), then SELECT from it. This avoids the SQLite alias-reuse error.",
    "Try: WITH profile AS (SELECT ..., NTILE(4) OVER (...) AS quartile, ROUND(PERCENT_RANK() OVER (...)*100,1) AS pct_rank, ROUND(CUME_DIST() OVER (...)*100,1) AS cume_dist_pct FROM customer_orders) SELECT ... FROM profile ORDER BY total_revenue DESC;",
  ],
  xpAward: 300,
};
