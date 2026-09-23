import type { Mission } from "../missions/level001";

export const sa035: Mission = {
  id: "sa-ticket-035",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-035 // Priority: Medium",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:00 PM.",
    "\"Filter to z-score outliers only \u2014 ABS(z) > 2. These are the rows you'd escalate to the business: 'two of your fifteen orders are statistical anomalies.' Short output, high signal.\"",
  ],
  objective:
    "Return only orders where the z-score is more than 2 standard deviations from the mean \u2014 order_id, customer_id, amount, and z-score (2 decimals) \u2014 sorted by z-score descending.",
  schemaLabel: "order_amounts + daily_sessions",
  seedSql: `
  CREATE TABLE order_amounts (order_id TEXT, customer_id TEXT, amount REAL, order_date TEXT);
  INSERT INTO order_amounts VALUES
    ('O001','C001',450,'2026-01-05'),('O002','C002',620,'2026-01-08'),
    ('O003','C003',380,'2026-01-12'),('O004','C004',510,'2026-01-15'),
    ('O005','C005',4800,'2026-01-18'),('O006','C006',430,'2026-01-22'),
    ('O007','C007',590,'2026-01-25'),('O008','C008',470,'2026-02-02'),
    ('O009','C009',540,'2026-02-05'),('O010','C010',490,'2026-02-08'),
    ('O011','C001',520,'2026-02-12'),('O012','C002',3900,'2026-02-15'),
    ('O013','C003',460,'2026-02-18'),('O014','C004',580,'2026-02-22'),
    ('O015','C005',500,'2026-02-25');

  CREATE TABLE daily_sessions (session_date TEXT, sessions INTEGER, revenue REAL);
  INSERT INTO daily_sessions VALUES
    ('2026-01-10',1200,24000),('2026-01-11',1180,23600),('2026-01-12',1250,25000),
    ('2026-01-13',1220,24400),('2026-01-14',3800,76000),
    ('2026-01-15',1190,23800),('2026-01-16',1210,24200),
    ('2026-01-17',1230,24600),('2026-01-18',1200,24000),('2026-01-19',1170,23400);
`,
  schemaPreview: [
    { table: "order_amounts",  columns: ["order_id","customer_id","amount","order_date"] },
    { table: "daily_sessions", columns: ["session_date","sessions","revenue"] },
  ],
  expectedColumns: ["order_id", "customer_id", "amount", "z_score"],
  expectedRows: [
    ["O005", "C005", 4800, 2.87],
    ["O012", "C002", 3900, 2.19],
  ],
  requireRowOrder: true,
  hints: [
    "Same CTE as the previous ticket, add WHERE ABS((amount-m)/sd) > 2 in the outer query.",
    "Try: WITH s AS (...) SELECT order_id, customer_id, amount, ROUND((amount-m)/sd,2) AS z_score FROM order_amounts, s WHERE ABS((amount-m)/sd)>2 ORDER BY z_score DESC;",
  ],
  xpAward: 225,
};
