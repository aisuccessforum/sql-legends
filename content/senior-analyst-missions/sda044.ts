import type { Mission } from "../missions/level001";

export const sda044: Mission = {
  id: "sda-ticket-044",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-044 // Priority: Critical",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "01:00 PM. Internal system. Priority: Critical.",
    "\"Module capstone — the full cohort funnel matrix. Per cohort: signups, activated, purchased. A user's later events still count for their signup cohort, even when the event itself happened in a later month — that's the definition of cohort analysis.\"",
  ],
  objective:
    "For each cohort, show distinct signups, activated users, and purchased users from that cohort, sorted chronologically.",
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
  expectedColumns: ["cohort", "signups", "activated", "purchased"],
  expectedRows: [
    ["2026-01", 3, 2, 1],
    ["2026-02", 3, 2, 2],
    ["2026-03", 4, 3, 1],
  ],
  requireRowOrder: true,
  hints: [
    "Assign cohorts in a CTE, then join every event back to its user's cohort — the event's own date never decides the cohort, the signup did.",
    "User 5 purchased in March but signed up in February: their purchase belongs to the February cohort. If your February row shows 1 purchase, that's the bug.",
    "Try: WITH cohorts AS (SELECT user_id, strftime('%Y-%m', event_date) AS cohort FROM user_events WHERE event = 'signup') SELECT c.cohort, COUNT(DISTINCT c.user_id) AS signups, COUNT(DISTINCT CASE WHEN e.event = 'activated' THEN e.user_id END) AS activated, COUNT(DISTINCT CASE WHEN e.event = 'purchased' THEN e.user_id END) AS purchased FROM cohorts c LEFT JOIN user_events e ON e.user_id = c.user_id GROUP BY c.cohort ORDER BY c.cohort;",
  ],
  xpAward: 300,
};
