import type { Mission } from "../missions/level001";

export const sa013: Mission = {
  id: "sa-ticket-013",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-013 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:00 PM.",
    "\"IQR \u2014 interquartile range. Q1 = top of first NTILE quartile, Q3 = top of third. IQR = Q3 \u2212 Q1. Fences = Q1 \u2212 1.5\u00d7IQR and Q3 + 1.5\u00d7IQR. Any customer outside those fences is a statistical outlier by the Tukey definition.\"",
  ],
  objective:
    "In a single row, return Q1, Q3, IQR, lower outlier fence, and upper outlier fence based on customer total revenue.",
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
  expectedColumns: ["q1", "q3", "iqr", "lower_fence", "upper_fence"],
  expectedRows: [
    [12000, 175000, 163000, -232500, 419500],
  ],
  requireRowOrder: false,
  hints: [
    "Use NTILE(4) in a CTE to assign quartiles, then MAX(CASE WHEN q=1 ...) and MAX(CASE WHEN q=3 ...) to extract boundaries.",
    "Try: WITH nt AS (...NTILE(4)...), bounds AS (SELECT MAX(CASE WHEN q=1 THEN total_revenue END) AS q1, MAX(CASE WHEN q=3 THEN total_revenue END) AS q3 FROM nt) SELECT q1, q3, q3-q1 AS iqr, q1-1.5*(q3-q1) AS lower_fence, q3+1.5*(q3-q1) AS upper_fence FROM bounds;",
  ],
  xpAward: 250,
};
