import type { Mission } from "../missions/level001";

export const sa031: Mission = {
  id: "sa-ticket-031",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-031 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "09:00 AM. Priority: High.",
    "\"New module \u2014 outlier detection. IQR method: Q1=top of bottom quartile, Q3=top of third quartile, IQR=Q3\u2212Q1. Tukey fences: Q1\u22121.5\u00d7IQR (lower), Q3+1.5\u00d7IQR (upper). Values outside those fences are statistical outliers.\"",
  ],
  objective:
    "In a single row, compute Q1, Q3, IQR, lower fence, and upper fence for order amounts.",
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
  expectedColumns: ["q1", "q3", "iqr", "lower_fence", "upper_fence"],
  expectedRows: [
    [460, 590, 130, 265, 785],
  ],
  requireRowOrder: false,
  hints: [
    "NTILE(4) OVER (ORDER BY amount) labels each row's quartile. Then MAX(CASE WHEN q=1...) gives you the Q1 boundary.",
    "Try: WITH nt AS (SELECT amount, NTILE(4) OVER (ORDER BY amount) AS q FROM order_amounts), b AS (SELECT MAX(CASE WHEN q=1 THEN amount END) AS q1, MAX(CASE WHEN q=3 THEN amount END) AS q3 FROM nt) SELECT q1, q3, q3-q1 AS iqr, q1-1.5*(q3-q1) AS lower_fence, q3+1.5*(q3-q1) AS upper_fence FROM b;",
  ],
  xpAward: 225,
};
