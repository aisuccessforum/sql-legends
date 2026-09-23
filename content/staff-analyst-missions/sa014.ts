import type { Mission } from "../missions/level001";

export const sa014: Mission = {
  id: "sa-ticket-014",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-014 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:45 PM.",
    "\"Quartile profile \u2014 instead of showing quartile per row, group by quartile to see the shape of each band. How many customers in each tier? What's the revenue range and average? This table describes the distribution in four rows.\"",
  ],
  objective:
    "For each quartile (1\u20134), show customer count, minimum revenue, maximum revenue, and average revenue (0 decimals) \u2014 sorted by quartile.",
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
  expectedColumns: ["quartile", "customers", "min_rev", "max_rev", "avg_rev"],
  expectedRows: [
    [1, 5, 4500, 12000, 8300],
    [2, 5, 18000, 60000, 37800],
    [3, 5, 66000, 175000, 100500],
    [4, 5, 190000, 420000, 278000],
  ],
  requireRowOrder: true,
  hints: [
    "NTILE can't be used in GROUP BY directly \u2014 put it in a CTE first, then GROUP BY quartile in the outer query.",
    "Try: WITH nt AS (SELECT total_revenue, NTILE(4) OVER (ORDER BY total_revenue) AS quartile FROM customer_orders) SELECT quartile, COUNT(*) AS customers, MIN(total_revenue) AS min_rev, MAX(total_revenue) AS max_rev, ROUND(AVG(total_revenue),0) AS avg_rev FROM nt GROUP BY quartile ORDER BY quartile;",
  ],
  xpAward: 250,
};
