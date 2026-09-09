import type { Mission } from "../missions/level001";

export const sda041: Mission = {
  id: "sda-ticket-041",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-041 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "10:30 AM. Internal system. Priority: Medium.",
    "\"Cohorts next. A user's cohort is the month they signed up — it never changes, no matter what they do later. Tag every user with theirs.\"",
  ],
  objective:
    "Select every user's id and their cohort (the year-month of their signup), sorted by user id.",
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
  expectedColumns: ["user_id", "cohort"],
  expectedRows: [
    [1, "2026-01"],
    [2, "2026-01"],
    [3, "2026-01"],
    [4, "2026-02"],
    [5, "2026-02"],
    [6, "2026-02"],
    [7, "2026-03"],
    [8, "2026-03"],
    [9, "2026-03"],
    [10, "2026-03"],
  ],
  requireRowOrder: true,
  hints: [
    "Filter to signup events only — the cohort comes from the signup date, not from any later event.",
    "strftime('%Y-%m', ...) is the same month-label trick from the dates module.",
    "Try: SELECT user_id, strftime('%Y-%m', event_date) AS cohort FROM user_events WHERE event = 'signup' ORDER BY user_id;",
  ],
  xpAward: 225,
};
