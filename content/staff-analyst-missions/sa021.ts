import type { Mission } from "../missions/level001";

export const sa021: Mission = {
  id: "sa-ticket-021",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-021 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:00 PM.",
    "\"Lift \u2014 the incremental gain. Conversion lift = treatment rate \u2212 control rate, in percentage points. Revenue lift = (treatment ARPU \u2212 control ARPU) / control ARPU \u00d7 100. Both in a single row.\"",
  ],
  objective:
    "In a single row, show control conversion rate, treatment conversion rate, conversion lift in percentage points (1 decimal), and revenue lift percentage (1 decimal).",
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
  expectedColumns: ["ctrl_cr", "trt_cr", "conv_lift_pp", "revenue_lift_pct"],
  expectedRows: [
    [50, 70, 20, 100],
  ],
  requireRowOrder: false,
  hints: [
    "Use GROUP BY variant with conditional SUM/AVG for per-variant metrics.",
    "Try: WITH g AS (SELECT variant, ROUND(100.0*SUM(converted)/COUNT(*),1) AS cr, ROUND(SUM(revenue...",
  ],
  xpAward: 250,
};
