import type { Mission } from "../missions/level001";

export const de007: Mission = {
  id: "de-ticket-007",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-007 // Priority: Medium",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "01:30 PM. Internal system. Priority: Medium.",
    "\"Failed event audit — before retrying failures, inspect them. Pull failed events with cast revenue and extracted date. High-revenue failures need immediate investigation.\"",
  ],
  objective:
    "Select failed events: event_id, user_id, event_type, revenue cast to REAL, and event_date — sorted by event_id.",
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
  expectedColumns: ["event_id", "user_id", "event_type", "revenue", "event_date"],
  expectedRows: [
    ["E005", "U004", "purchase", 8000, "2026-01-13"],
    ["E012", "U002", "purchase", 1800, "2026-01-19"],
  ],
  requireRowOrder: true,
  hints: [
    "WHERE LOWER(status)='failed'. Cast revenue and extract date as in the extract layer.",
    "Try: SELECT event_id, user_id, event_type, CAST(COALESCE(revenue,'0') AS REAL) AS revenue, DATE(event_ts) AS event_date FROM raw_events WHERE LOWER(status)='failed' ORDER BY event_id;",
  ],
  xpAward: 200,
};
