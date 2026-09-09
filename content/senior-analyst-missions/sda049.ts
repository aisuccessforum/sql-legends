import type { Mission } from "../missions/level001";

export const sda049: Mission = {
  id: "sda-ticket-049",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-049 // Final Assessment 5 of 6",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "01:00 PM. Internal system. Final Assessment.",
    "\"Org chart summary with a guaranteed spine — every level 0 through 3 must appear even if it had zero employees. Build the spine with a recursive CTE, then LEFT JOIN actual headcounts onto it. One row per level, no level silently missing.\"",
  ],
  objective:
    "For levels 0 through 3, show headcount and average tenure (1 decimal), including levels with no employees as zeros — sorted by level.",
  schemaLabel: "employees_org",
  seedSql: `
    CREATE TABLE employees_org (
      id INTEGER PRIMARY KEY, name TEXT, manager_id INTEGER, tenure_months INTEGER
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
    [2, 4, 8.3],
    [3, 2, 2.5],
  ],
  requireRowOrder: true,
  hints: [
    "The spine itself can be a small recursive CTE that counts from 0 to 3 — identical in shape to the month-generator from the scaffold module.",
    "LEFT JOIN the org hierarchy onto the spine (not the other way around) so level rows with no matches stay in the result.",
    "Try: WITH RECURSIVE hierarchy AS (SELECT id, 0 AS level FROM employees_org WHERE manager_id IS NULL UNION ALL SELECT e.id, h.level + 1 FROM employees_org e JOIN hierarchy h ON e.manager_id = h.id), level_spine(level) AS (SELECT 0 UNION ALL SELECT level + 1 FROM level_spine WHERE level < 3) SELECT s.level, COUNT(h.id) AS headcount, ROUND(AVG(e.tenure_months), 1) AS avg_tenure FROM level_spine s LEFT JOIN hierarchy h ON h.level = s.level LEFT JOIN employees_org e ON e.id = h.id GROUP BY s.level ORDER BY s.level;",
  ],
  xpAward: 300,
};
