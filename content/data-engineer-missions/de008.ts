import type { Mission } from "../missions/level001";

export const de008: Mission = {
  id: "de-ticket-008",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-008 // Priority: Critical",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "02:15 PM. Internal system. Priority: Critical.",
    "\"Module capstone — full 4-layer ETL pipeline as a CTE chain. stg→int_completed→int_user→fct_summary. User events, net revenue, rank, share of total in one query.\"",
  ],
  objective:
    "Build a 4-layer CTE (stg→int_completed→int_user→fct_summary) and return each user's event count, net revenue, revenue rank, and share of total revenue (1 decimal) — sorted by rank.",
  schemaLabel: "raw_events",
  seedSql: `
    CREATE TABLE raw_events (
      event_id TEXT, user_id TEXT, event_type TEXT,
      revenue TEXT, event_ts TEXT, status TEXT
    );
    INSERT INTO raw_events (event_id, user_id, event_type, revenue, event_ts, status) VALUES
      ('E001','U001','purchase','4500.00','2026-01-10 09:15:22','COMPLETED'),
      ('E002','U002','purchase','1200.00','2026-01-10 11:30:05','completed'),
      ('E003','U003','refund','-800.00','2026-01-11 14:00:10','COMPLETED'),
      ('E004','U001','signup',NULL,'2026-01-12 08:45:00','Completed'),
      ('E005','U004','purchase','8000.00','2026-01-13 10:00:00','FAILED'),
      ('E006','U002','purchase','6500.00','2026-01-14 13:20:00','completed'),
      ('E007','U005','refund','-300.00','2026-01-15 16:00:00','COMPLETED'),
      ('E008','U003','purchase','3100.00','2026-01-15 17:30:00','COMPLETED'),
      ('E009','U001','purchase','2200.00','2026-01-16 09:00:00','completed'),
      ('E010','U006','purchase','9000.00','2026-01-17 11:00:00','COMPLETED'),
      ('E011','U004','signup',NULL,'2026-01-18 08:00:00','completed'),
      ('E012','U002','purchase','1800.00','2026-01-19 14:30:00','FAILED');
  `,
  schemaPreview: [{ table: "raw_events", columns: ["event_id","user_id","event_type","revenue","event_ts","status"] }],
  expectedColumns: ["user_id", "events", "net_revenue", "revenue_rank", "pct_of_total"],
  expectedRows: [
    ["U006", 1, 9000, 1, 35.4],
    ["U002", 2, 7700, 2, 30.3],
    ["U001", 3, 6700, 3, 26.4],
    ["U003", 2, 2300, 4, 9.1],
    ["U004", 1, 0, 5, 0],
    ["U005", 1, -300, 6, -1.2],
  ],
  requireRowOrder: true,
  hints: [
    "4 CTEs: stg = extract+clean; int_completed = WHERE status='completed'; int_user = GROUP BY user_id; fct_summary = RANK() + ROUND(100.0*net_revenue/SUM(net_revenue) OVER (),1).",
    "Try: WITH stg AS (SELECT event_id, user_id, event_type, CAST(COALESCE(revenue,'0') AS REAL) AS revenue, LOWER(status) AS status FROM raw_events), int_completed AS (SELECT * FROM stg WHERE status='completed'), int_user AS (SELECT user_id, COUNT(*) AS events, SUM(revenue) AS net_revenue FROM int_completed GROUP BY user_id), fct_summary AS (SELECT user_id, events, net_revenue, RANK() OVER (ORDER BY net_revenue DESC) AS revenue_rank, ROUND(100.0*net_revenue/SUM(net_revenue) OVER (),1) AS pct_of_total FROM int_user) SELECT user_id, events, net_revenue, revenue_rank, pct_of_total FROM fct_summary ORDER BY revenue_rank;",
  ],
  xpAward: 300,
};
