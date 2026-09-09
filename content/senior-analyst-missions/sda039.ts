import type { Mission } from "../missions/level001";

export const sda039: Mission = {
  id: "sda-ticket-039",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-039 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"Last teaching module — cohorts and funnels, the analysis behind every product decision. AstraMind launched a self-serve tier this quarter; user_events logs each user's journey: signup, activated, purchased.\"",
    "\"Start with the raw funnel: how many distinct users reached each stage, biggest stage first. DISTINCT matters — one user purchasing twice is still one user through the funnel.\"",
  ],
  objective:
    "For each event, count the distinct users who reached it, sorted by user count descending.",
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
  expectedColumns: ["event", "stage_users"],
  expectedRows: [
    ["signup", 10],
    ["activated", 7],
    ["purchased", 4],
  ],
  requireRowOrder: true,
  hints: [
    "COUNT(DISTINCT user_id) per event group — the funnel shape falls straight out of the sort.",
    "Each stage should be smaller than or equal to the one above it — if not, something's wrong with the data or the query.",
    "Try: SELECT event, COUNT(DISTINCT user_id) AS stage_users FROM user_events GROUP BY event ORDER BY stage_users DESC;",
  ],
  xpAward: 250,
};
