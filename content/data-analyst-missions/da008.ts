import type { Mission } from "../missions/level001";

export const da008: Mission = {
  id: "da-ticket-008",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-008 // Priority: Critical",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "02:20 PM. Internal system. Priority: Critical.",
    "\"Last one on recursive queries. For every manager, I want both numbers together this time — total headcount below them, and the combined tenure of that whole team, not counting themselves. Busiest manager first.\"",
    "\"Same recursive shape as the headcount ticket, just carrying one more column through it.\"",
  ],
  objective:
    "For every employee with at least one report at any level, select their name, their total headcount below them, and the combined tenure of everyone below them (not including their own tenure), sorted by headcount descending.",
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
  expectedColumns: ["name", "total_reports", "team_tenure"],
  expectedRows: [
    ["Ananya Iyer", 8, 60],
    ["Priya Nair", 3, 18],
    ["Marcus Webb", 3, 20],
    ["Sofia Reyes", 1, 3],
    ["Rohan Verma", 1, 2],
  ],
  requireRowOrder: true,
  hints: [
    "Extend Ticket DA-004's root_id pattern with a tenure_months column carried through the same way — unchanged as it passes down each recursive step.",
    "The final SUM needs to subtract the manager's own tenure back out, since the recursive rows include the manager's starting row too.",
    "Try: WITH RECURSIVE reports AS (SELECT id AS root_id, id, manager_id, tenure_months FROM employees_org UNION ALL SELECT r.root_id, e.id, e.manager_id, e.tenure_months FROM employees_org e JOIN reports r ON e.manager_id = r.id) SELECT eo.name, COUNT(*) - 1 AS total_reports, SUM(r.tenure_months) - eo.tenure_months AS team_tenure FROM reports r JOIN employees_org eo ON eo.id = r.root_id GROUP BY eo.name HAVING total_reports > 0 ORDER BY total_reports DESC;",
  ],
  xpAward: 275,
};
