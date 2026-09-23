import type { Mission } from "../missions/level001";

export const sa012: Mission = {
  id: "sa-ticket-012",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-012 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "11:15 AM.",
    "\"Median \u2014 the middle value. SQLite has no MEDIAN(), so you compute it by selecting the middle row(s) using ROW_NUMBER() and COUNT(). For even N, average the two middle rows.\"",
  ],
  objective:
    "Return the approximate median total revenue of all customers in a single row.",
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
  expectedColumns: ["median"],
  expectedRows: [
    [63000],
  ],
  requireRowOrder: false,
  hints: [
    "NTILE, PERCENT_RANK, CUME_DIST are window functions \u2014 add OVER (ORDER BY total_revenue).",
    "Try: SELECT AVG(total_revenue) AS median FROM (SELECT total_revenue, ROW_NUMBER() OVE...",
  ],
  xpAward: 250,
};
