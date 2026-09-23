import type { Mission } from "../missions/level001";

export const sa011: Mission = {
  id: "sa-ticket-011",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-011 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "10:30 AM.",
    "\"CUME_DIST() \u2014 cumulative distribution. Unlike PERCENT_RANK, it answers: what fraction of rows have a value \u2264 this one? It includes the current row, so the maximum is always 1.0.\"",
  ],
  objective:
    "Show each customer's ID, name, total revenue, and their cumulative distribution (3 decimals) \u2014 sorted by total revenue ascending.",
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
  expectedColumns: ["customer_id", "customer_name", "total_revenue", "cume_dist"],
  expectedRows: [
    ["CU10", "JumpStart", 4500, 0.05],
    ["CU18", "RealEdge", 6000, 0.1],
    ["CU03", "CloudBase", 8500, 0.15],
    ["CU14", "NodeFlow", 10500, 0.2],
    ["CU08", "HighPoint", 12000, 0.25],
    ["CU16", "PeakView", 18000, 0.3],
    ["CU12", "LeadWave", 30000, 0.35],
    ["CU02", "BlueSky", 36000, 0.4],
    ["CU06", "FocusGroup", 45000, 0.45],
    ["CU17", "QuantumJet", 60000, 0.5],
    ["CU05", "EdgeTech", 66000, 0.55],
    ["CU20", "TechForge", 84000, 0.6],
    ["CU09", "InfoSys", 87500, 0.65],
    ["CU13", "MetaPulse", 90000, 0.7],
    ["CU04", "DataDriven", 175000, 0.75],
    ["CU19", "StreamLine", 190000, 0.8],
    ["CU11", "KineticLab", 210000, 0.85],
    ["CU01", "Apex Corp", 240000, 0.9],
    ["CU07", "GlobalNet", 330000, 0.95],
    ["CU15", "OmniPath", 420000, 1],
  ],
  requireRowOrder: false,
  hints: [
    "NTILE, PERCENT_RANK, CUME_DIST are window functions \u2014 add OVER (ORDER BY total_revenue).",
    "Try: SELECT customer_id, customer_name, total_revenue, ROUND(CUME_DIST() OVER (ORDER ...",
  ],
  xpAward: 225,
};
