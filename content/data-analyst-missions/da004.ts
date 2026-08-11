import type { Mission } from "../missions/level001";

export const da004: Mission = {
  id: "da-ticket-004",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-004 // Priority: Critical",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "11:00 AM. Internal system. Priority: Critical.",
    "\"For every manager in the company, I want their full headcount — direct reports plus everyone under those reports, all the way down. One number per manager.\"",
    "\"This one's harder than it looks — you need to run the descendants logic starting fresh from every single employee, not just one. Track which employee each recursive branch started from.\"",
  ],
  objective:
    "For every employee who has at least one report at any level, select their name and their total headcount below them (direct and indirect combined), sorted by headcount descending.",
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
  expectedColumns: ["name", "total_reports"],
  expectedRows: [
    ["Ananya Iyer", 8],
    ["Priya Nair", 3],
    ["Marcus Webb", 3],
    ["Sofia Reyes", 1],
    ["Rohan Verma", 1],
  ],
  requireRowOrder: true,
  hints: [
    "Carry a root_id column through the recursion that never changes — set it to each row's own id in the anchor, and just pass it through unchanged in the repeating step.",
    "The anchor starts from every employee at once (no WHERE filter this time), not just one person — that's what lets every possible starting point get its own recursive branch.",
    "Try: WITH RECURSIVE reports AS (SELECT id AS root_id, id, manager_id FROM employees_org UNION ALL SELECT r.root_id, e.id, e.manager_id FROM employees_org e JOIN reports r ON e.manager_id = r.id) SELECT eo.name, COUNT(*) - 1 AS total_reports FROM reports r JOIN employees_org eo ON eo.id = r.root_id GROUP BY eo.name HAVING total_reports > 0 ORDER BY total_reports DESC;",
  ],
  xpAward: 250,
};
