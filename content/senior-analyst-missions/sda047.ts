import type { Mission } from "../missions/level001";

export const sda047: Mission = {
  id: "sda-ticket-047",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-047 // Final Assessment 3 of 6",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "11:00 AM. Internal system. Final Assessment.",
    "\"Full cohort funnel with conversion rate — per cohort, how many signed up, activated, and purchased, plus what percentage of that cohort ever purchased. User 5 signed up in February but purchased in March — check which cohort their purchase falls under.\"",
  ],
  objective:
    "For each cohort, show signups, activated users, purchased users, and purchase rate (1 decimal), sorted chronologically.",
  schemaLabel: "user_events",
  seedSql: `
    CREATE TABLE user_events (
      id INTEGER PRIMARY KEY, user_id INTEGER, event TEXT, event_date TEXT
    );
    INSERT INTO user_events (id, user_id, event, event_date) VALUES
      (1, 1, 'signup', '2026-01-05'), (2, 1, 'activated', '2026-01-07'),
      (3, 1, 'purchased', '2026-01-20'), (4, 2, 'signup', '2026-01-10'),
      (5, 2, 'activated', '2026-01-15'), (6, 3, 'signup', '2026-01-22'),
      (7, 4, 'signup', '2026-02-03'), (8, 4, 'activated', '2026-02-05'),
      (9, 4, 'purchased', '2026-02-28'), (10, 5, 'signup', '2026-02-11'),
      (11, 5, 'activated', '2026-02-14'), (12, 5, 'purchased', '2026-03-10'),
      (13, 6, 'signup', '2026-02-20'), (14, 7, 'signup', '2026-03-02'),
      (15, 7, 'activated', '2026-03-06'), (16, 8, 'signup', '2026-03-09'),
      (17, 8, 'activated', '2026-03-12'), (18, 8, 'purchased', '2026-03-25'),
      (19, 9, 'signup', '2026-03-15'), (20, 10, 'signup', '2026-03-28'),
      (21, 10, 'activated', '2026-04-01');
  `,
  schemaPreview: [
    { table: "user_events", columns: ["id", "user_id", "event", "event_date"] },
  ],
  expectedColumns: ["cohort", "signups", "activated", "purchased", "purchase_rate"],
  expectedRows: [
    ["2026-01", 3, 2, 1, 33.3],
    ["2026-02", 3, 2, 2, 66.7],
    ["2026-03", 4, 3, 1, 25],
  ],
  requireRowOrder: true,
  hints: [
    "Assign cohorts in a CTE from signup events only; then LEFT JOIN all events back on user_id — the event date never changes the cohort.",
    "COUNT(DISTINCT CASE WHEN ...) keeps the stage counts user-level; NULLIF on the denominator guards against a zero-signup cohort.",
    "Try: WITH cohorts AS (SELECT user_id, strftime('%Y-%m', event_date) AS cohort FROM user_events WHERE event = 'signup') SELECT c.cohort, COUNT(DISTINCT c.user_id) AS signups, COUNT(DISTINCT CASE WHEN e.event = 'activated' THEN e.user_id END) AS activated, COUNT(DISTINCT CASE WHEN e.event = 'purchased' THEN e.user_id END) AS purchased, ROUND(100.0 * COUNT(DISTINCT CASE WHEN e.event = 'purchased' THEN e.user_id END) / NULLIF(COUNT(DISTINCT c.user_id), 0), 1) AS purchase_rate FROM cohorts c LEFT JOIN user_events e ON e.user_id = c.user_id GROUP BY c.cohort ORDER BY c.cohort;",
  ],
  xpAward: 300,
};
