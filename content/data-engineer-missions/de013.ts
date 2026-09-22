import type { Mission } from "../missions/level001";

export const de013: Mission = {
  id: "de-ticket-013",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-013 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "12:00 PM. Internal system. Priority: High.",
    "\"Most recent purchase per user — same pattern but ordered DESC. Filter purchases first in a CTE, then ROW_NUMBER() on that subset. This is how you build a 'last purchase' dimension column.\"",
  ],
  objective:
    "Return each user's most recent purchase — user_id, event_type, amount, and timestamp — sorted by user_id.",
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
  expectedColumns: ["user_id", "event_type", "amount", "latest_purchase_ts"],
  expectedRows: [
    ["U001", "purchase", 1200, "2026-01-12 14:00"],
    ["U002", "purchase", 8000, "2026-01-08 11:00"],
    ["U003", "purchase", 3100, "2026-01-20 09:00"],
  ],
  requireRowOrder: true,
  hints: [
    "Filter to purchases first (WHERE event_type='purchase'), then ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_ts DESC) — descending so rn=1 is the latest.",
    "Try: WITH purchases AS (SELECT * FROM user_events WHERE event_type='purchase'), ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_ts DESC) AS rn FROM purchases) SELECT user_id, event_type, amount, event_ts AS latest_purchase_ts FROM ranked WHERE rn=1 ORDER BY user_id;",
  ],
  xpAward: 225,
};
