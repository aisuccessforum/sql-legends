import type { Mission } from "../missions/level001";

export const sa040: Mission = {
  id: "sa-ticket-040",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-040 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "11:15 AM.",
    "\"Lorenz-style cumulative revenue \u2014 rank customers by revenue and show the running share. At what rank does cumulative_pct pass 50%? 80%? This curve tells you how concentrated your revenue is. Useful for ARR risk analysis.\"",
  ],
  objective:
    "Show each customer's rank, customer_id, total revenue, and cumulative revenue percentage (1 decimal) \u2014 sorted by rank.",
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
  expectedColumns: ["rank", "customer_id", "total_revenue", "cumulative_pct"],
  expectedRows: [
    [1, "CU15", 420000, 19.8],
    [2, "CU07", 330000, 35.3],
    [3, "CU01", 240000, 46.6],
    [4, "CU11", 210000, 56.5],
    [5, "CU19", 190000, 65.5],
    [6, "CU04", 175000, 73.7],
    [7, "CU13", 90000, 78],
    [8, "CU09", 87500, 82.1],
    [9, "CU20", 84000, 86],
    [10, "CU05", 66000, 89.1],
    [11, "CU17", 60000, 92],
    [12, "CU06", 45000, 94.1],
    [13, "CU02", 36000, 95.8],
    [14, "CU12", 30000, 97.2],
    [15, "CU16", 18000, 98],
    [16, "CU08", 12000, 98.6],
    [17, "CU14", 10500, 99.1],
    [18, "CU03", 8500, 99.5],
    [19, "CU18", 6000, 99.8],
    [20, "CU10", 4500, 100],
  ],
  requireRowOrder: true,
  hints: [
    "ROW_NUMBER() OVER (ORDER BY total_revenue DESC) for rank. SUM(total_revenue) OVER (ORDER BY total_revenue DESC) for running total. Divide by grand SUM OVER () for percentage.",
    "Try: WITH ranked AS (SELECT customer_id, total_revenue, ROW_NUMBER() OVER (...) AS rn, SUM(total_revenue) OVER (ORDER BY total_revenue DESC) AS running_rev, SUM(total_revenue) OVER () AS grand_total FROM customer_orders) SELECT rn AS rank, customer_id, total_revenue, ROUND(100.0*running_rev/grand_total,1) AS cumulative_pct FROM ranked ORDER BY rn;",
  ],
  xpAward: 275,
};
