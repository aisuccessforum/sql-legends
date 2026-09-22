import type { Mission } from "../missions/level001";

export const de003: Mission = {
  id: "de-ticket-003",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-003 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "10:30 AM. Internal system. Priority: High.",
    "\"Aggregate layer — user-level revenue summary from completed events. Gross revenue counts only purchases; refunds tracked separately; net is the sum of all revenue values. Finance reads this every morning.\"",
  ],
  objective:
    "Using a two-layer CTE (stg then aggregation), show each user's completed-event count, gross revenue (purchases only), refund total, and net revenue — sorted by net_revenue descending.",
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
  expectedColumns: ["user_id", "events", "gross_revenue", "refunds", "net_revenue"],
  expectedRows: [
    ["U006", 1, 9000, 0, 9000],
    ["U002", 2, 7700, 0, 7700],
    ["U001", 3, 6700, 0, 6700],
    ["U003", 2, 3100, 800, 2300],
    ["U004", 1, 0, 0, 0],
    ["U005", 1, 0, 300, -300],
  ],
  requireRowOrder: true,
  hints: [
    "stg CTE cleans data. Outer: GROUP BY user_id with SUM(CASE WHEN event_type='purchase' THEN revenue ELSE 0 END) for gross, SUM(CASE WHEN event_type='refund' THEN ABS(revenue) ELSE 0 END) for refunds, plain SUM(revenue) for net.",
    "Try: WITH stg AS (SELECT event_id, user_id, event_type, CAST(COALESCE(revenue,'0') AS REAL) AS revenue, LOWER(status) AS status FROM raw_events) SELECT user_id, COUNT(*) AS events, SUM(CASE WHEN event_type='purchase' THEN revenue ELSE 0 END) AS gross_revenue, SUM(CASE WHEN event_type='refund' THEN ABS(revenue) ELSE 0 END) AS refunds, SUM(revenue) AS net_revenue FROM stg WHERE status='completed' GROUP BY user_id ORDER BY net_revenue DESC;",
  ],
  xpAward: 250,
};
