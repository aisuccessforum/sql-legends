import type { Mission } from "../missions/level001";

export const de001: Mission = {
  id: "de-ticket-001",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-001 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"Data Engineer — welcome. I'm Vikram, Principal Data Engineer. You're not building reports at this level. You're building the pipelines that make reports possible.\"",
    "\"First concept: the extract layer. Raw event data lands with mixed-case status, text revenue, and timestamps you can't GROUP BY directly. Write the extract SELECT that normalises all three: CAST the revenue, DATE() the timestamp, LOWER the status.\"",
  ],
  objective:
    "Select all 12 events from raw_events: event_id, user_id, event_type, revenue cast to REAL (NULL becomes 0 via COALESCE), DATE extracted from event_ts, and status lowercased — sorted by event_id.",
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
  expectedColumns: ["event_id", "user_id", "event_type", "revenue", "event_date", "status"],
  expectedRows: [
    ["E001", "U001", "purchase", 4500, "2026-01-10", "completed"],
    ["E002", "U002", "purchase", 1200, "2026-01-10", "completed"],
    ["E003", "U003", "refund", -800, "2026-01-11", "completed"],
    ["E004", "U001", "signup", 0, "2026-01-12", "completed"],
    ["E005", "U004", "purchase", 8000, "2026-01-13", "failed"],
    ["E006", "U002", "purchase", 6500, "2026-01-14", "completed"],
    ["E007", "U005", "refund", -300, "2026-01-15", "completed"],
    ["E008", "U003", "purchase", 3100, "2026-01-15", "completed"],
    ["E009", "U001", "purchase", 2200, "2026-01-16", "completed"],
    ["E010", "U006", "purchase", 9000, "2026-01-17", "completed"],
    ["E011", "U004", "signup", 0, "2026-01-18", "completed"],
    ["E012", "U002", "purchase", 1800, "2026-01-19", "failed"],
  ],
  requireRowOrder: true,
  hints: [
    "DATE(event_ts) extracts just the date from a datetime string. CAST(COALESCE(revenue,'0') AS REAL) handles NULL revenue. LOWER(status) normalises casing.",
    "Try: SELECT event_id, user_id, event_type, CAST(COALESCE(revenue,'0') AS REAL) AS revenue, DATE(event_ts) AS event_date, LOWER(status) AS status FROM raw_events ORDER BY event_id;",
  ],
  xpAward: 200,
};
