import type { Mission } from "./level001";

export const level010: Mission = {
  id: "intern-ticket-010",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-010 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:30 PM. Internal system. Priority: High.",
    "\"The town hall slide only has room for three names — not the whole sorted list, just the top three most senior people.\"",
    "\"You already know how to sort. Now cut it off after the first few rows.\"",
  ],
  objective:
    "Select the name and tenure of the 3 employees with the longest tenure.",
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
  ],
  requireRowOrder: true,
  hints: [
    "Sort first, exactly like last time — then cap how many rows come back.",
    "LIMIT goes at the very end of the query, followed by the number of rows you want.",
    "Try: SELECT name, tenure_months FROM employees ORDER BY tenure_months DESC LIMIT 3;",
  ],
  xpAward: 50,
};
