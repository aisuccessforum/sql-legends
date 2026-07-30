import type { Mission } from "./level001";

export const level008: Mission = {
  id: "intern-ticket-008",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-008 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:05 AM. Internal system. Priority: Medium.",
    "\"Onboarding wants to know who's newest first, so they know who still needs a mentor assigned. Everyone, sorted shortest tenure to longest.\"",
    "\"This isn't a filter — everyone's included. It's about the order the rows come back in.\"",
  ],
  objective:
    "Select the name and tenure (in months) of every employee, sorted from shortest tenure to longest.",
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
    ["Rohan Verma", 3],
    ["Arjun Kapoor", 5],
    ["Divya Pillai", 7],
    ["Sofia Reyes", 8],
    ["Meera Shah", 11],
    ["Priya Nair", 14],
    ["Ananya Iyer", 19],
    ["Karan Mehta", 22],
    ["Marcus Webb", 26],
    ["Vikram Rao", 30],
  ],
  requireRowOrder: true,
  hints: [
    "You need every row, just arranged in a specific order — no WHERE needed.",
    "ORDER BY goes at the end of the query, followed by the column to sort on.",
    "Try: SELECT name, tenure_months FROM employees ORDER BY tenure_months ASC;",
  ],
  xpAward: 50,
};
