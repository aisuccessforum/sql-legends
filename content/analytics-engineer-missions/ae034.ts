import type { Mission } from "../missions/level001";

export const ae034: Mission = {
  id: "ae-ticket-034",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-034 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "11:15 AM. Internal system. Priority: High.",
    "\"Deduplication — event tables often have multiple rows per entity. ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY event_ts DESC) tags each customer's latest event as row 1. Filter to rn=1 for the current state.\"",
  ],
  objective:
    "Return the most recent event for each customer from customer_events, showing customer_id, event_type, value, and event_ts — sorted by customer_id.",
  schemaLabel: "customer_events",
  seedSql: `
    CREATE TABLE customer_events (event_id INTEGER PRIMARY KEY, customer_id TEXT, event_type TEXT, value TEXT, event_ts TEXT);
    INSERT INTO customer_events VALUES (1,'C001','signup','Apex Innovations','2026-01-01 09:00:00'),(2,'C001','name_change','Apex Corp','2026-02-15 14:00:00'),(3,'C001','upgrade','Enterprise','2026-03-10 11:00:00'),(4,'C002','signup','NovaSoft','2026-01-05 10:00:00'),(5,'C002','name_change','NovaSoft Ltd','2026-04-20 16:00:00'),(6,'C003','signup','Quantum Corp','2026-01-08 09:30:00'),(7,'C003','downgrade','SMB','2026-05-01 12:00:00'),(8,'C004','signup','Bright Ideas','2026-01-10 08:00:00');
  `,
  schemaPreview: [{ table: "customer_events", columns: ["event_id","customer_id","event_type","value","event_ts"] }],
  expectedColumns: ["customer_id", "event_type", "value", "event_ts"],
  expectedRows: [
    ["C001", "upgrade", "Enterprise", "2026-03-10 11:00:00"],
    ["C002", "name_change", "NovaSoft Ltd", "2026-04-20 16:00:00"],
    ["C003", "downgrade", "SMB", "2026-05-01 12:00:00"],
    ["C004", "signup", "Bright Ideas", "2026-01-10 08:00:00"],
  ],
  requireRowOrder: true,
  hints: [
    "WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY event_ts DESC) AS rn FROM customer_events) SELECT ... FROM ranked WHERE rn=1.",
    "Try: WITH ranked AS (SELECT customer_id, event_type, value, event_ts, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY event_ts DESC) AS rn FROM customer_events) SELECT customer_id, event_type, value, event_ts FROM ranked WHERE rn=1 ORDER BY customer_id;",
  ],
  xpAward: 250,
};
