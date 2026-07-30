import type { Mission } from "./level001";

export const level011: Mission = {
  id: "intern-ticket-011",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-011 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "02:10 PM. Internal system. Priority: Low.",
    "\"Small thing, but it matters — external-facing reports never show raw column names like tenure_months. Rename it to just 'tenure' in your output before it goes anywhere near a client.\"",
    "\"You're not changing the data, just what the column is called when it comes back.\"",
  ],
  objective:
    "Select every employee's name and tenure_months, renaming tenure_months to 'tenure' in the result.",
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
  expectedColumns: ["name", "tenure"],
  expectedRows: [
    ["Priya Nair", 14],
    ["Marcus Webb", 26],
    ["Sofia Reyes", 8],
    ["Arjun Kapoor", 5],
    ["Ananya Iyer", 19],
    ["Rohan Verma", 3],
    ["Meera Shah", 11],
    ["Karan Mehta", 22],
    ["Divya Pillai", 7],
    ["Vikram Rao", 30],
  ],
  requireRowOrder: false,
  hints: [
    "The data doesn't change — only the label on the column changes.",
    "Put AS right after the column name, followed by the new name you want.",
    "Try: SELECT name, tenure_months AS tenure FROM employees;",
  ],
  xpAward: 50,
};
