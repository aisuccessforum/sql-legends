import type { Mission } from "./level001";

export const level009: Mission = {
  id: "intern-ticket-009",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-009 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "12:00 PM. Internal system. Priority: Medium.",
    "\"Flip it around for me. Leadership wants a loyalty list for the town hall — most senior employees first this time, not least.\"",
    "\"Same idea as before, just pointed the other direction.\"",
  ],
  objective:
    "Select the name and tenure (in months) of every employee, sorted from longest tenure to shortest.",
  schemaLabel: "employees",
  seedSql: `
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      status TEXT,
      role TEXT,
      tenure_months INTEGER
    );
    INSERT INTO employees (id, name, department, status, role, tenure_months) VALUES
      (1, 'Priya Nair', 'Data Analytics', 'active', 'Analyst', 14),
      (2, 'Marcus Webb', 'Business Intelligence', 'on_leave', 'Consultant', 26),
      (3, 'Sofia Reyes', 'Data Engineering', 'active', 'Engineer', 8),
      (4, 'Arjun Kapoor', 'Dashboard Development', 'terminated', 'Developer', 5),
      (5, 'Ananya Iyer', 'Business Consulting', 'active', 'Consultant', 19),
      (6, 'Rohan Verma', 'Data Analytics', 'active', 'Analyst', 3),
      (7, 'Meera Shah', 'Business Intelligence', 'active', 'Analyst', 11),
      (8, 'Karan Mehta', 'Data Engineering', 'on_leave', 'Engineer', 22),
      (9, 'Divya Pillai', 'Dashboard Development', 'active', 'Developer', 7),
      (10, 'Vikram Rao', 'Business Consulting', 'terminated', 'Consultant', 30);
  `,
  schemaPreview: [
    {
      table: "employees",
      columns: ["id", "name", "department", "status", "role", "tenure_months"],
    },
  ],
  expectedColumns: ["name", "tenure_months"],
  expectedRows: [
    ["Vikram Rao", 30],
    ["Marcus Webb", 26],
    ["Karan Mehta", 22],
    ["Ananya Iyer", 19],
    ["Priya Nair", 14],
    ["Meera Shah", 11],
    ["Sofia Reyes", 8],
    ["Divya Pillai", 7],
    ["Arjun Kapoor", 5],
    ["Rohan Verma", 3],
  ],
  requireRowOrder: true,
  hints: [
    "ASC was the default direction — this time you need the opposite.",
    "Add DESC right after the column name in ORDER BY.",
    "Try: SELECT name, tenure_months FROM employees ORDER BY tenure_months DESC;",
  ],
  xpAward: 50,
};
