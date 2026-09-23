import type { Mission } from "../missions/level001";

export const sa022: Mission = {
  id: "sa-ticket-022",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-022 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:45 PM.",
    "\"Average active days per variant \u2014 a secondary metric. If treatment users are more active but don't convert more, the feature is engaging but not monetising. Always report secondary metrics alongside the primary.\"",
  ],
  objective:
    "For each variant, show user count, average days active (1 decimal), converters, and conversion rate (1 decimal %) \u2014 sorted by variant.",
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
  expectedColumns: ["variant", "users", "avg_days_active", "converters", "conversion_rate"],
  expectedRows: [
    ["control", 10, 12.2, 5, 50],
    ["treatment", 10, 15.6, 7, 70],
  ],
  requireRowOrder: true,
  hints: [
    "Use GROUP BY variant with conditional SUM/AVG for per-variant metrics.",
    "Try: SELECT variant, COUNT(*) AS users, ROUND(AVG(days_active),1) AS avg_days_active, SUM(conve...",
  ],
  xpAward: 225,
};
