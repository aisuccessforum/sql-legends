import type { Mission } from "./level001";

export const level002: Mission = {
  id: "intern-ticket-002",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-002 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "09:10 AM. Internal system. Priority: Low.",
    "\"Good, you're back. Payroll needs a directory export - just names and departments, nothing else. They don't want status, they don't want IDs. Give them exactly what they asked for, not everything you've got.\"",
    "\"New rule for you: never dump a whole table if you weren't asked for one. Pull only the columns you need.\"",
  ],
  objective: "Select the name and department of every employee.",
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
  expectedColumns: ["name", "department"],
  expectedRows: [
    ["Priya Nair", "Data Analytics"],
    ["Marcus Webb", "Business Intelligence"],
    ["Sofia Reyes", "Data Engineering"],
    ["Arjun Kapoor", "Dashboard Development"],
    ["Ananya Iyer", "Business Consulting"],
    ["Rohan Verma", "Data Analytics"],
  ],
  requireRowOrder: false,
  hints: [
    "You don't need every column - just two of them.",
    "List the exact columns you want, separated by a comma, right after SELECT.",
    "Try: SELECT name, department FROM employees;",
  ],
  xpAward: 50,
};
