import type { Mission } from "../missions/level001";

export const sa034: Mission = {
  id: "sa-ticket-034",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-034 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "11:15 AM.",
    "\"Day-over-day spike detection \u2014 LAG() gets yesterday's value; a 50% single-day jump is almost always noise, error, or an untriggered campaign. Flag those days for investigation.\"",
  ],
  objective:
    "Find days in daily_sessions where session volume was more than 50% above the prior day \u2014 showing session_date, current sessions, prior sessions, percentage change (1 decimal), and a 'Volume Spike' flag.",
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
  expectedColumns: ["session_date", "sessions", "prev_sessions", "pct_change", "flag"],
  expectedRows: [
    ["2026-01-14", 3800, 1220, 211.5, "Volume Spike"],
  ],
  requireRowOrder: true,
  hints: [
    "LAG(sessions) OVER (ORDER BY session_date) gets the prior row's value. Filter WHERE sessions > prev_sessions*1.5.",
    "Try: WITH prev AS (SELECT session_date, sessions, LAG(sessions) OVER (ORDER BY session_date) AS prev_sessions FROM daily_sessions) SELECT session_date, sessions, prev_sessions, ROUND(100.0*(sessions-prev_sessions)/prev_sessions,1) AS pct_change, 'Volume Spike' AS flag FROM prev WHERE prev_sessions IS NOT NULL AND sessions>prev_sessions*1.5;",
  ],
  xpAward: 250,
};
