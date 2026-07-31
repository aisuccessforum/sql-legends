import type { Mission } from "../missions/level001";

export const junior049: Mission = {
  id: "junior-ticket-049",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-049 // Final Assessment 5 of 6",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "01:00 PM. Internal system. Priority: Critical.",
    "\"Org design review — every manager with more than one direct report, how many reports they have, and who THEIR manager is. Two levels of the hierarchy in one row.\"",
  ],
  objective:
    "Select every manager with more than 1 direct report, their report count, and their own manager's name (blank if they have none).",
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
      (7, 'Meera Shah', 3, 6);
  `,
  schemaPreview: [
    { table: "employees_org", columns: ["id", "name", "manager_id", "tenure_months"] },
  ],
  expectedColumns: ["manager_name", "report_count", "grand_manager"],
  expectedRows: [
    ["Ananya Iyer", 2, null],
    ["Priya Nair", 2, "Ananya Iyer"],
    ["Marcus Webb", 2, "Ananya Iyer"],
  ],
  requireRowOrder: false,
  hints: [
    "Start with a count of direct reports per manager_id — that's a straightforward GROUP BY, no join needed yet.",
    "Then join that count back to the table twice: once to get the manager's own name, once more (LEFT JOIN, since Ananya has no manager) to get their manager's name.",
    "Try: WITH report_counts AS (SELECT manager_id, COUNT(*) AS report_count FROM employees_org WHERE manager_id IS NOT NULL GROUP BY manager_id) SELECT m.name AS manager_name, rc.report_count, gm.name AS grand_manager FROM report_counts rc JOIN employees_org m ON rc.manager_id = m.id LEFT JOIN employees_org gm ON m.manager_id = gm.id WHERE rc.report_count > 1;",
  ],
  xpAward: 250,
};
