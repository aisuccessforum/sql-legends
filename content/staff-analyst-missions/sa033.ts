import type { Mission } from "../missions/level001";

export const sa033: Mission = {
  id: "sa-ticket-033",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-033 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "10:30 AM.",
    "\"Z-score outliers \u2014 different method, same question. Z = (x \u2212 \u03bc) / \u03c3. Compute mean and stddev in a CTE (using the computational formula), then apply per row. Z > 2 or Z < \u22122 flags statistical outliers.\"",
  ],
  objective:
    "Show each order's ID, customer_id, amount, and z-score (2 decimals) \u2014 sorted by z-score descending.",
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
    ["O002", "C002", 620, -0.3],
    ["O007", "C007", 590, -0.32],
    ["O014", "C004", 580, -0.33],
    ["O009", "C009", 540, -0.36],
    ["O004", "C004", 510, -0.38],
    ["O011", "C001", 520, -0.38],
    ["O015", "C005", 500, -0.39],
    ["O010", "C010", 490, -0.4],
    ["O008", "C008", 470, -0.41],
    ["O013", "C003", 460, -0.42],
    ["O001", "C001", 450, -0.43],
    ["O006", "C006", 430, -0.44],
    ["O003", "C003", 380, -0.48],
  ],
  requireRowOrder: true,
  hints: [
    "WITH s AS (SELECT AVG(amount) AS m, SQRT(SUM(amount*amount)/COUNT(*)-AVG(amount)*AVG(amount)) AS sd FROM order_amounts), then (amount-m)/sd per row.",
    "Try: WITH s AS (SELECT AVG(amount) AS m, SQRT(SUM(amount*amount)*1.0/COUNT(*)-AVG(amount)*AVG(amount)) AS sd FROM order_amounts) SELECT order_id, customer_id, amount, ROUND((amount-m)/sd,2) AS z_score FROM order_amounts, s ORDER BY z_score DESC;",
  ],
  xpAward: 250,
};
