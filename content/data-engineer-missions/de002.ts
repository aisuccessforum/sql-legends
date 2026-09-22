import type { Mission } from "../missions/level001";

export const de002: Mission = {
  id: "de-ticket-002",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-002 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "09:45 AM. Internal system. Priority: High.",
    "\"Transform layer — filter to completed events and add an event_category column. Purchases are 'revenue', refunds are 'adjustment', signups are 'engagement'. This classification is what downstream models use.\"",
  ],
  objective:
    "Using a CTE named 'stg', clean raw_events, then select completed events only with an event_category column (purchase→revenue, refund→adjustment, else engagement) — sorted by event_id.",
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
  expectedColumns: ["event_id", "user_id", "event_type", "event_category", "revenue", "event_date"],
  expectedRows: [
    ["E001", "U001", "purchase", "revenue", 4500, "2026-01-10"],
    ["E002", "U002", "purchase", "revenue", 1200, "2026-01-10"],
    ["E003", "U003", "refund", "adjustment", -800, "2026-01-11"],
    ["E004", "U001", "signup", "engagement", 0, "2026-01-12"],
    ["E006", "U002", "purchase", "revenue", 6500, "2026-01-14"],
    ["E007", "U005", "refund", "adjustment", -300, "2026-01-15"],
    ["E008", "U003", "purchase", "revenue", 3100, "2026-01-15"],
    ["E009", "U001", "purchase", "revenue", 2200, "2026-01-16"],
    ["E010", "U006", "purchase", "revenue", 9000, "2026-01-17"],
    ["E011", "U004", "signup", "engagement", 0, "2026-01-18"],
  ],
  requireRowOrder: true,
  hints: [
    "Build the stg CTE (extract + clean), then add a CASE event_type WHEN 'purchase' THEN 'revenue' ... END as event_category in the outer SELECT, filtering WHERE status='completed'.",
    "Try: WITH stg AS (SELECT event_id, user_id, event_type, CAST(COALESCE(revenue,'0') AS REAL) AS revenue, DATE(event_ts) AS event_date, LOWER(status) AS status FROM raw_events) SELECT event_id, user_id, event_type, CASE WHEN event_type='purchase' THEN 'revenue' WHEN event_type='refund' THEN 'adjustment' ELSE 'engagement' END AS event_category, revenue, event_date FROM stg WHERE status='completed' ORDER BY event_id;",
  ],
  xpAward: 225,
};
