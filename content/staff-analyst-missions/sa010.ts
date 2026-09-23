import type { Mission } from "../missions/level001";

export const sa010: Mission = {
  id: "sa-ticket-010",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-010 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "09:45 AM.",
    "\"PERCENT_RANK() returns each row's position relative to the rest: (rank \u2212 1) / (n \u2212 1). The first row gets 0.0, the last gets 1.0. Use it to say 'this customer is at the 80th percentile' without external tools.\"",
  ],
  objective:
    "Show each customer's ID, name, total revenue, and their percent rank (3 decimals) \u2014 sorted by total revenue ascending.",
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
  expectedColumns: ["customer_id", "customer_name", "total_revenue", "pct_rank"],
  expectedRows: [
    ["CU10", "JumpStart", 4500, 0],
    ["CU18", "RealEdge", 6000, 0.053],
    ["CU03", "CloudBase", 8500, 0.105],
    ["CU14", "NodeFlow", 10500, 0.158],
    ["CU08", "HighPoint", 12000, 0.211],
    ["CU16", "PeakView", 18000, 0.263],
    ["CU12", "LeadWave", 30000, 0.316],
    ["CU02", "BlueSky", 36000, 0.368],
    ["CU06", "FocusGroup", 45000, 0.421],
    ["CU17", "QuantumJet", 60000, 0.474],
    ["CU05", "EdgeTech", 66000, 0.526],
    ["CU20", "TechForge", 84000, 0.579],
    ["CU09", "InfoSys", 87500, 0.632],
    ["CU13", "MetaPulse", 90000, 0.684],
    ["CU04", "DataDriven", 175000, 0.737],
    ["CU19", "StreamLine", 190000, 0.789],
    ["CU11", "KineticLab", 210000, 0.842],
    ["CU01", "Apex Corp", 240000, 0.895],
    ["CU07", "GlobalNet", 330000, 0.947],
    ["CU15", "OmniPath", 420000, 1],
  ],
  requireRowOrder: false,
  hints: [
    "NTILE, PERCENT_RANK, CUME_DIST are window functions \u2014 add OVER (ORDER BY total_revenue).",
    "Try: SELECT customer_id, customer_name, total_revenue, ROUND(PERCENT_RANK() OVER (ORD...",
  ],
  xpAward: 225,
};
