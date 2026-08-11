import type { Mission } from "../missions/level001";

export const da045: Mission = {
  id: "da-ticket-045",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-045 // Final Assessment 1 of 6",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:00 AM. Internal system. Priority: Critical.",
    "Final assessment. Six tickets, no technique named from here — everything you need has already been taught across six modules.",
    "\"HR wants the org chart summarized by level: how many people sit at each depth, and the average tenure at that depth. Level 0 is the top.\"",
  ],
  objective:
    "For each level of the org chart (top-level employee at level 0), select the headcount and average tenure at that level, sorted by level.",
  schemaLabel: "employees_org",
  seedSql: `
    CREATE TABLE employees_org (
      id INTEGER PRIMARY KEY,
      name TEXT,
      manager_id INTEGER,
      tenure_months INTEGER
    );
    INSERT INTO employees_org (id, name, manager_id, tenure_months) VALUES
      (1, 'Ananya Iyer', NULL, 60),
      (2, 'Priya Nair', 1, 14),
      (3, 'Marcus Webb', 1, 8),
      (4, 'Sofia Reyes', 2, 10),
      (5, 'Arjun Kapoor', 2, 5),
      (6, 'Rohan Verma', 3, 12),
      (7, 'Meera Shah', 3, 6),
      (8, 'Kabir Oza', 4, 3),
      (9, 'Divya Rao', 6, 2);
  `,
  schemaPreview: [
    { table: "employees_org", columns: ["id", "name", "manager_id", "tenure_months"] },
  ],
  expectedColumns: ["level", "headcount", "avg_tenure"],
  expectedRows: [
    [0, 1, 60],
    [1, 2, 11],
    [2, 4, 8.25],
    [3, 2, 2.5],
  ],
  requireRowOrder: true,
  hints: [
    "You've walked this hierarchy top-down with a depth counter before — that exact structure gives you every employee tagged with their level.",
    "Once every row carries a level, the counting and averaging per level is ordinary grouping on top of it.",
    "Try: WITH RECURSIVE levels AS (SELECT id, tenure_months, 0 AS level FROM employees_org WHERE manager_id IS NULL UNION ALL SELECT e.id, e.tenure_months, l.level + 1 FROM employees_org e JOIN levels l ON e.manager_id = l.id) SELECT level, COUNT(*) AS headcount, AVG(tenure_months) AS avg_tenure FROM levels GROUP BY level ORDER BY level;",
  ],
  xpAward: 275,
};
