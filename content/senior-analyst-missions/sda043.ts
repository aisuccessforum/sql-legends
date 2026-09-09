import type { Mission } from "../missions/level001";

export const sda043: Mission = {
  id: "sda-ticket-043",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-043 // Priority: Critical",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "12:00 PM. Internal system. Priority: Critical.",
    "\"The question product actually cares about: which cohort converts? Per cohort — signups, how many of them ever purchased, and the conversion percentage. February's number is going to surprise people.\"",
  ],
  objective:
    "For each cohort, show signups, how many of those users ever purchased, and the conversion percentage (rounded to 1 decimal), sorted chronologically.",
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
  expectedColumns: ["cohort", "signups", "purchasers", "conversion_pct"],
  expectedRows: [
    ["2026-01", 3, 1, 33.3],
    ["2026-02", 3, 2, 66.7],
    ["2026-03", 4, 1, 25],
  ],
  requireRowOrder: true,
  hints: [
    "Two building blocks: the cohort assignment from earlier, and a distinct list of users who ever purchased. LEFT JOIN keeps non-purchasers in their cohorts.",
    "COUNT(b.user_id) counts only matched rows (purchasers), while COUNT(*) counts everyone — the difference is the whole trick.",
    "Try: WITH cohorts AS (SELECT user_id, strftime('%Y-%m', event_date) AS cohort FROM user_events WHERE event = 'signup'), buyers AS (SELECT DISTINCT user_id FROM user_events WHERE event = 'purchased') SELECT c.cohort, COUNT(*) AS signups, COUNT(b.user_id) AS purchasers, ROUND(100.0 * COUNT(b.user_id) / COUNT(*), 1) AS conversion_pct FROM cohorts c LEFT JOIN buyers b ON c.user_id = b.user_id GROUP BY c.cohort ORDER BY c.cohort;",
  ],
  xpAward: 300,
};
