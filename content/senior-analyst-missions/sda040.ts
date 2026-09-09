import type { Mission } from "../missions/level001";

export const sda040: Mission = {
  id: "sda-ticket-040",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-040 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:45 AM. Internal system. Priority: High.",
    "\"The funnel as one dashboard row — three stage counts plus two conversion rates: activation rate and purchase rate, both as a percentage of signups. Conditional distinct counts, then ratios: two modules combining.\"",
  ],
  objective:
    "In a single row, show signups, activated, purchased (distinct users each), plus activation_rate and purchase_rate as percentages of signups, rounded to 1 decimal.",
  schemaLabel: "user_events",
  seedSql: `
    CREATE TABLE user_events (
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      event TEXT,
      event_date TEXT
    );
    INSERT INTO user_events (id, user_id, event, event_date) VALUES
      (1, 1, 'signup', '2026-01-05'),
      (2, 1, 'activated', '2026-01-07'),
      (3, 1, 'purchased', '2026-01-20'),
      (4, 2, 'signup', '2026-01-10'),
      (5, 2, 'activated', '2026-01-15'),
      (6, 3, 'signup', '2026-01-22'),
      (7, 4, 'signup', '2026-02-03'),
      (8, 4, 'activated', '2026-02-05'),
      (9, 4, 'purchased', '2026-02-28'),
      (10, 5, 'signup', '2026-02-11'),
      (11, 5, 'activated', '2026-02-14'),
      (12, 5, 'purchased', '2026-03-10'),
      (13, 6, 'signup', '2026-02-20'),
      (14, 7, 'signup', '2026-03-02'),
      (15, 7, 'activated', '2026-03-06'),
      (16, 8, 'signup', '2026-03-09'),
      (17, 8, 'activated', '2026-03-12'),
      (18, 8, 'purchased', '2026-03-25'),
      (19, 9, 'signup', '2026-03-15'),
      (20, 10, 'signup', '2026-03-28'),
      (21, 10, 'activated', '2026-04-01');
  `,
  schemaPreview: [
    { table: "user_events", columns: ["id", "user_id", "event", "event_date"] },
  ],
  expectedColumns: ["signups", "activated", "purchased", "activation_rate", "purchase_rate"],
  expectedRows: [
    [10, 7, 4, 70, 40],
  ],
  requireRowOrder: false,
  hints: [
    "COUNT(DISTINCT CASE WHEN event = 'signup' THEN user_id END) — the CASE picks the stage, DISTINCT deduplicates users, all in one expression.",
    "The two rates reuse those same expressions as numerator and denominator, wrapped in the 100.0 * ROUND pattern.",
    "Try: SELECT COUNT(DISTINCT CASE WHEN event = 'signup' THEN user_id END) AS signups, COUNT(DISTINCT CASE WHEN event = 'activated' THEN user_id END) AS activated, COUNT(DISTINCT CASE WHEN event = 'purchased' THEN user_id END) AS purchased, ROUND(100.0 * COUNT(DISTINCT CASE WHEN event = 'activated' THEN user_id END) / COUNT(DISTINCT CASE WHEN event = 'signup' THEN user_id END), 1) AS activation_rate, ROUND(100.0 * COUNT(DISTINCT CASE WHEN event = 'purchased' THEN user_id END) / COUNT(DISTINCT CASE WHEN event = 'signup' THEN user_id END), 1) AS purchase_rate FROM user_events;",
  ],
  xpAward: 275,
};
