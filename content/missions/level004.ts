import type { Mission } from "./level001";

export const level004: Mission = {
  id: "intern-ticket-004",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-004 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:20 AM. Internal system. Priority: Medium.",
    "\"Data Analytics is getting a new project lead next week, and they want a headcount first. Everyone currently sitting in that department, by name.\"",
    "\"You've filtered on status before. This time filter on department instead - same idea, different column.\"",
  ],
  objective: "Select the name of every employee in the 'Data Analytics' department.",
  schemaLabel: "employees",
  seedSql: `
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      status TEXT
    );
    INSERT INTO employees (id, name, department, status) VALUES
      (1, 'Priya Nair', 'Data Analytics', 'active'),
      (2, 'Marcus Webb', 'Business Intelligence', 'on_leave'),
      (3, 'Sofia Reyes', 'Data Engineering', 'active'),
      (4, 'Arjun Kapoor', 'Dashboard Development', 'terminated'),
      (5, 'Ananya Iyer', 'Business Consulting', 'active'),
      (6, 'Rohan Verma', 'Data Analytics', 'active');
  `,
  schemaPreview: [
    { table: "employees", columns: ["id", "name", "department", "status"] },
  ],
  expectedColumns: ["name"],
  expectedRows: [["Priya Nair"], ["Rohan Verma"]],
  requireRowOrder: false,
  hints: [
    "Same structure as filtering by status - just point WHERE at a different column.",
    "You're matching an exact department name, so it still needs quotes: 'Data Analytics'.",
    "Try: SELECT name FROM employees WHERE department = 'Data Analytics';",
  ],
  xpAward: 50,
};
