import type { Mission } from "../missions/level001";

export const da006: Mission = {
  id: "da-ticket-006",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-006 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:40 PM. Internal system. Priority: Medium.",
    "\"HR is reviewing whether we're getting too hierarchical. How many levels deep does the org chart actually go right now, top to bottom?\"",
  ],
  objective:
    "Using a recursive CTE, find the maximum depth of the org chart, starting from the top-level employee at level 0.",
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
  expectedColumns: ["max_depth"],
  expectedRows: [[3]],
  requireRowOrder: false,
  hints: [
    "This starts from whoever has no manager, rather than one named person — filter the anchor on manager_id IS NULL instead of a name.",
    "Build the same level-counting recursion as Ticket DA-003, then just take MAX(level) of the whole thing.",
    "Try: WITH RECURSIVE levels AS (SELECT id, 0 AS level FROM employees_org WHERE manager_id IS NULL UNION ALL SELECT e.id, l.level + 1 FROM employees_org e JOIN levels l ON e.manager_id = l.id) SELECT MAX(level) AS max_depth FROM levels;",
  ],
  xpAward: 200,
};
