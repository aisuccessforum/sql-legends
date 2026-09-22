import type { Mission } from "../missions/level001";

export const de004: Mission = {
  id: "de-ticket-004",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-004 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "11:15 AM. Internal system. Priority: High.",
    "\"Load step — INSERT INTO ... SELECT. This is how you materialise a staging model: run your SELECT into a pre-created target table. Run the INSERT, then SELECT to verify: row count and total revenue must match expectations.\"",
  ],
  objective:
    "INSERT completed events into stg_events (pre-created), then select the loaded row count and total revenue to confirm.",
  schemaLabel: "raw_events + stg_events (pre-created)",
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
  
    CREATE TABLE stg_events (event_id TEXT, user_id TEXT, event_type TEXT, revenue REAL, event_date TEXT, status TEXT);`,
  schemaPreview: [
    { table: "raw_events", columns: ["event_id","user_id","event_type","revenue","event_ts","status"] },
    { table: "stg_events",  columns: ["event_id","user_id","event_type","revenue","event_date","status"] },
  ],
  expectedColumns: ["loaded_rows", "total_revenue"],
  expectedRows: [
    [10, 25400],
  ],
  requireRowOrder: false,
  hints: [
    "INSERT INTO stg_events SELECT event_id, user_id, event_type, CAST(COALESCE(revenue,'0') AS REAL), DATE(event_ts), LOWER(status) FROM raw_events WHERE LOWER(status)='completed'. Then SELECT COUNT(*), SUM(revenue) FROM stg_events.",
    "Try: INSERT INTO stg_events SELECT event_id, user_id, event_type, CAST(COALESCE(revenue,'0') AS REAL) AS revenue, DATE(event_ts) AS event_date, LOWER(status) AS status FROM raw_events WHERE LOWER(status)='completed'; SELECT COUNT(*) AS loaded_rows, SUM(CAST(COALESCE(revenue,0) AS REAL)) AS total_revenue FROM stg_events;",
  ],
  xpAward: 250,
};
