import type { Mission } from "../missions/level001";

export const sa020: Mission = {
  id: "sa-ticket-020",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-020 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "11:15 AM.",
    "\"Revenue per converter (ARPPU) \u2014 average revenue among buyers only. A high ARPPU with low conversion rate means you're selling well to a narrow audience. SUM(revenue)/SUM(converted) \u2014 only where converted=1.\"",
  ],
  objective:
    "For each variant, show converter count and average revenue per converter (2 decimals) \u2014 sorted by variant.",
  schemaLabel: "ab_experiment",
  seedSql: `
  CREATE TABLE ab_experiment (user_id TEXT, variant TEXT, converted INTEGER, revenue REAL, days_active INTEGER);
  INSERT INTO ab_experiment VALUES
    ('U001','control',1,45.00,12),('U002','control',0,0.00,3),
    ('U003','control',1,30.00,18),('U004','control',0,0.00,1),
    ('U005','control',1,60.00,25),('U006','control',0,0.00,5),
    ('U007','control',0,0.00,2),('U008','control',1,90.00,30),
    ('U009','control',0,0.00,4),('U010','control',1,75.00,22),
    ('U011','treatment',1,65.00,15),('U012','treatment',1,80.00,20),
    ('U013','treatment',0,0.00,2),('U014','treatment',1,110.00,28),
    ('U015','treatment',1,55.00,12),('U016','treatment',0,0.00,3),
    ('U017','treatment',1,95.00,22),('U018','treatment',0,0.00,1),
    ('U019','treatment',1,120.00,35),('U020','treatment',1,75.00,18);
`,
  schemaPreview: [{ table: "ab_experiment", columns: ["user_id","variant","converted","revenue","days_active"] }],
  expectedColumns: ["variant", "converters", "arppu"],
  expectedRows: [
    ["control", 5, 60],
    ["treatment", 7, 85.71],
  ],
  requireRowOrder: true,
  hints: [
    "Use GROUP BY variant with conditional SUM/AVG for per-variant metrics.",
    "Try: SELECT variant, SUM(converted) AS converters, ROUND(SUM(revenue)/NULLIF(SUM(converted),0),...",
  ],
  xpAward: 225,
};
