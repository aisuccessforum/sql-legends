import type { Mission } from "../missions/level001";

export const sa023: Mission = {
  id: "sa-ticket-023",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-023 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "01:30 PM.",
    "\"Multi-metric A/B comparison \u2014 all key metrics in one table. Users, conversion rate, ARPU, ARPPU, average engagement side by side. When you present this to a PM, every decision variable is visible at a glance.\"",
  ],
  objective:
    "For each variant, show users, conversion rate (1 decimal), ARPU (2 decimals), ARPPU (2 decimals), and average days active (1 decimal) \u2014 sorted by variant.",
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
  expectedColumns: ["variant", "users", "conversion_rate", "arpu", "arppu", "avg_days_active"],
  expectedRows: [
    ["control", 10, 50, 30, 60, 12.2],
    ["treatment", 10, 70, 60, 85.71, 15.6],
  ],
  requireRowOrder: true,
  hints: [
    "Use GROUP BY variant with conditional SUM/AVG for per-variant metrics.",
    "Try: SELECT variant, COUNT(*) AS users, ROUND(100.0*SUM(converted)/COUNT(*),1) AS conversion_ra...",
  ],
  xpAward: 250,
};
