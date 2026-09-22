import type { Mission } from "../missions/level001";

export const de014: Mission = {
  id: "de-ticket-014",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-014 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "12:45 PM. Internal system. Priority: High.",
    "\"Best purchase per user — order by value instead of time. ORDER BY amount DESC picks the highest-value purchase. When amounts tie, earlier timestamp breaks the tie. This is the 'best ever' dedup pattern.\"",
  ],
  objective:
    "Return each user's highest-value purchase — user_id, amount, and event timestamp — sorted by user_id.",
  schemaLabel: "user_events",
  seedSql: `
    CREATE TABLE user_events (event_id INTEGER PRIMARY KEY, user_id TEXT, event_type TEXT, amount REAL, event_ts TEXT);
    INSERT INTO user_events (event_id, user_id, event_type, amount, event_ts) VALUES
      (1,'U001','login',0,'2026-01-01 08:00'),(2,'U001','purchase',4500,'2026-01-05 10:00'),
      (3,'U001','purchase',1200,'2026-01-12 14:00'),(4,'U002','login',0,'2026-01-02 09:00'),
      (5,'U002','purchase',8000,'2026-01-08 11:00'),(6,'U002','refund',-800,'2026-01-10 15:00'),
      (7,'U003','login',0,'2026-01-03 07:00'),(8,'U003','purchase',6500,'2026-01-07 13:00'),
      (9,'U003','purchase',3100,'2026-01-20 09:00'),(10,'U004','login',0,'2026-01-04 10:00');
  `,
  schemaPreview: [{ table: "user_events", columns: ["event_id","user_id","event_type","amount","event_ts"] }],
  expectedColumns: ["user_id", "best_purchase", "event_ts"],
  expectedRows: [
    ["U001", 4500, "2026-01-05 10:00"],
    ["U002", 8000, "2026-01-08 11:00"],
    ["U003", 6500, "2026-01-07 13:00"],
  ],
  requireRowOrder: true,
  hints: [
    "Filter to purchases, then ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY amount DESC, event_ts ASC) — value descending, timestamp as tiebreaker.",
    "Try: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY amount DESC, event_ts) AS rn FROM user_events WHERE event_type='purchase') SELECT user_id, amount AS best_purchase, event_ts FROM ranked WHERE rn=1 ORDER BY user_id;",
  ],
  xpAward: 225,
};
