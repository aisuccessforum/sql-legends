import type { Mission } from "../missions/level001";

export const sda042: Mission = {
  id: "sda-ticket-042",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-042 // Priority: Low",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "11:15 AM. Internal system. Priority: Low.",
    "\"Quick one — cohort sizes. How many users signed up in each month?\"",
  ],
  objective:
    "Select each cohort month and how many users signed up in it, sorted chronologically.",
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
  expectedColumns: ["cohort", "cohort_size"],
  expectedRows: [
    ["2026-01", 3],
    ["2026-02", 3],
    ["2026-03", 4],
  ],
  requireRowOrder: true,
  hints: [
    "The previous ticket's query with a GROUP BY collapsing it — one row per month.",
    "Every user signs up exactly once in this data, so a plain COUNT(*) works.",
    "Try: SELECT strftime('%Y-%m', event_date) AS cohort, COUNT(*) AS cohort_size FROM user_events WHERE event = 'signup' GROUP BY cohort ORDER BY cohort;",
  ],
  xpAward: 200,
};
