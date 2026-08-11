import type { Mission } from "../missions/level001";

export const da003: Mission = {
  id: "da-ticket-003",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-003 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:15 AM. Internal system. Priority: Medium.",
    "\"Same list as last time, but now show how many levels down from Ananya each person sits. Her direct reports are level 1, their reports are level 2, and so on.\"",
    "\"Carry a counter through the recursion — start it at 0 on the anchor, add 1 every time the repeating step runs.\"",
  ],
  objective:
    "Using a recursive CTE, select every employee's name and their level below Ananya Iyer (Ananya herself is level 0), sorted by level.",
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
  expectedColumns: ["name", "level"],
  expectedRows: [
    ["Ananya Iyer", 0],
    ["Marcus Webb", 1],
    ["Priya Nair", 1],
    ["Arjun Kapoor", 2],
    ["Meera Shah", 2],
    ["Rohan Verma", 2],
    ["Sofia Reyes", 2],
    ["Divya Rao", 3],
    ["Kabir Oza", 3],
  ],
  requireRowOrder: true,
  hints: [
    "Add a fourth column to the anchor: the literal number 0. In the repeating step, add 1 to the previous row's level instead.",
    "The column name has to match between the anchor and the repeating step, same as any UNION.",
    "Try: WITH RECURSIVE reports AS (SELECT id, name, manager_id, 0 AS level FROM employees_org WHERE name = 'Ananya Iyer' UNION ALL SELECT e.id, e.name, e.manager_id, r.level + 1 FROM employees_org e JOIN reports r ON e.manager_id = r.id) SELECT name, level FROM reports ORDER BY level, name;",
  ],
  xpAward: 225,
};
