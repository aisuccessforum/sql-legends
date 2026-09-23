import type { Mission } from "../missions/level001";

export const sa036: Mission = {
  id: "sa-ticket-036",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-036 // Priority: Critical",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:45 PM. Priority: Critical.",
    "\"Module capstone \u2014 full outlier audit. Every order, its z-score, its IQR flag, and its z-score flag side by side. Both methods agree on O005 (4800) and O012 (3900) \u2014 that convergence is the signal.\"",
  ],
  objective:
    "For every order show order_id, customer_id, amount, z-score (2 decimals), IQR flag ('IQR Outlier' or 'Normal'), and z-score flag ('Z Outlier' or 'Normal') \u2014 sorted by amount descending.",
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
  expectedColumns: ["order_id", "customer_id", "amount", "z_score", "iqr_flag", "z_flag"],
  expectedRows: [
    ["O005", "C005", 4800, 2.87, "IQR Outlier", "Z Outlier"],
    ["O012", "C002", 3900, 2.19, "IQR Outlier", "Z Outlier"],
    ["O002", "C002", 620, -0.3, "Normal", "Normal"],
    ["O007", "C007", 590, -0.32, "Normal", "Normal"],
    ["O014", "C004", 580, -0.33, "Normal", "Normal"],
    ["O009", "C009", 540, -0.36, "Normal", "Normal"],
    ["O011", "C001", 520, -0.38, "Normal", "Normal"],
    ["O004", "C004", 510, -0.38, "Normal", "Normal"],
    ["O015", "C005", 500, -0.39, "Normal", "Normal"],
    ["O010", "C010", 490, -0.4, "Normal", "Normal"],
    ["O008", "C008", 470, -0.41, "Normal", "Normal"],
    ["O013", "C003", 460, -0.42, "Normal", "Normal"],
    ["O001", "C001", 450, -0.43, "Normal", "Normal"],
    ["O006", "C006", 430, -0.44, "Normal", "Normal"],
    ["O003", "C003", 380, -0.48, "Normal", "Normal"],
  ],
  requireRowOrder: true,
  hints: [
    "Combine IQR fences and stats CTEs, then join to order_amounts with two CASE expressions for the flags.",
    "Try: WITH nt/b/fences CTEs for IQR, stats CTE for mean+stddev, then SELECT with CASE WHEN amount<lo OR amount>hi THEN 'IQR Outlier' and CASE WHEN ABS(z)>2 THEN 'Z Outlier';",
  ],
  xpAward: 300,
};
