import type { Mission } from "../missions/level001";

export const da001: Mission = {
  id: "da-ticket-001",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-001 // Priority: High",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"Data Analyst now — welcome in. I run the analyst pod day to day. Different problems at this level, starting today.\"",
    "\"You solved the org chart with a self-join before, but that only walks one level. Find Kabir Oza's full management chain, all the way to the top — however many levels that takes. A self-join can't do that without knowing the depth in advance. A recursive CTE can.\"",
    "\"WITH RECURSIVE has two halves: a starting point, and a step that repeats itself using its own previous output — until there's nothing left to add.\"",
  ],
  objective:
    "Using a recursive CTE, select the full chain of names from Kabir Oza up through every manager above him.",
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
  expectedColumns: ["name"],
  expectedRows: [
    ["Kabir Oza"],
    ["Sofia Reyes"],
    ["Priya Nair"],
    ["Ananya Iyer"],
  ],
  requireRowOrder: false,
  hints: [
    "The starting point (the \"anchor\") is just a normal SELECT for Kabir Oza's own row. The repeating part joins the table to the CTE itself, matching each row's id to the previous row's manager_id.",
    "UNION ALL glues the anchor and the repeating step together — the recursion naturally stops once a row's manager_id doesn't match anyone else's id.",
    "Try: WITH RECURSIVE chain AS (SELECT id, name, manager_id FROM employees_org WHERE name = 'Kabir Oza' UNION ALL SELECT e.id, e.name, e.manager_id FROM employees_org e JOIN chain c ON e.id = c.manager_id) SELECT name FROM chain;",
  ],
  xpAward: 225,
};
