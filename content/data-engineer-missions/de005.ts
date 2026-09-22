import type { Mission } from "../missions/level001";

export const de005: Mission = {
  id: "de-ticket-005",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-005 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "12:00 PM. Internal system. Priority: High.",
    "\"Daily load summary — how many events processed each day, how many completed vs failed, and the success rate. First table in a pipeline monitoring dashboard.\"",
  ],
  objective:
    "For each event date, show total events, completed count, failed count, and success rate (1 decimal percentage) — sorted by date.",
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
  expectedColumns: ["event_date", "total_events", "completed", "failed", "success_rate"],
  expectedRows: [
    ["2026-01-10", 2, 2, 0, 100],
    ["2026-01-11", 1, 1, 0, 100],
    ["2026-01-12", 1, 1, 0, 100],
    ["2026-01-13", 1, 0, 1, 0],
    ["2026-01-14", 1, 1, 0, 100],
    ["2026-01-15", 2, 2, 0, 100],
    ["2026-01-16", 1, 1, 0, 100],
    ["2026-01-17", 1, 1, 0, 100],
    ["2026-01-18", 1, 1, 0, 100],
    ["2026-01-19", 1, 0, 1, 0],
  ],
  requireRowOrder: true,
  hints: [
    "GROUP BY DATE(event_ts). COUNT(CASE WHEN LOWER(status)='completed' THEN 1 END) for the conditional counts.",
    "Try: SELECT DATE(event_ts) AS event_date, COUNT(*) AS total_events, COUNT(CASE WHEN LOWER(status)='completed' THEN 1 END) AS completed, COUNT(CASE WHEN LOWER(status)='failed' THEN 1 END) AS failed, ROUND(100.0*COUNT(CASE WHEN LOWER(status)='completed' THEN 1 END)/COUNT(*),1) AS success_rate FROM raw_events GROUP BY event_date ORDER BY event_date;",
  ],
  xpAward: 225,
};
