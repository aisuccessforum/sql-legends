import type { Mission } from "../missions/level001";

export const de006: Mission = {
  id: "de-ticket-006",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-006 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "12:45 PM. Internal system. Priority: High.",
    "\"Cumulative pipeline stats — running total of events and revenue for completed events by day. This is what the pipeline status page renders as a chart.\"",
  ],
  objective:
    "For each day with completed events, show the date, daily events, daily revenue, cumulative event total, and cumulative revenue — sorted chronologically.",
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
  expectedColumns: ["event_date", "events", "revenue", "cumulative_events", "cumulative_revenue"],
  expectedRows: [
    ["2026-01-10", 2, 5700, 2, 5700],
    ["2026-01-11", 1, -800, 3, 4900],
    ["2026-01-12", 1, 0, 4, 4900],
    ["2026-01-14", 1, 6500, 5, 11400],
    ["2026-01-15", 2, 2800, 7, 14200],
    ["2026-01-16", 1, 2200, 8, 16400],
    ["2026-01-17", 1, 9000, 9, 25400],
    ["2026-01-18", 1, 0, 10, 25400],
  ],
  requireRowOrder: true,
  hints: [
    "First CTE groups completed events by day. Outer SELECT adds SUM(events) OVER (ORDER BY date) and SUM(revenue) OVER (ORDER BY date) as running totals.",
    "Try: WITH daily AS (SELECT DATE(event_ts) AS d, COUNT(*) AS events, SUM(CAST(COALESCE(revenue,'0') AS REAL)) AS revenue FROM raw_events WHERE LOWER(status)='completed' GROUP BY d) SELECT d AS event_date, events, revenue, SUM(events) OVER (ORDER BY d) AS cumulative_events, SUM(revenue) OVER (ORDER BY d) AS cumulative_revenue FROM daily ORDER BY d;",
  ],
  xpAward: 250,
};
