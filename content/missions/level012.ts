import type { Mission } from "./level001";

export const level012: Mission = {
  id: "intern-ticket-012",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-012 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "02:45 PM. Internal system. Priority: Low.",
    "\"HR is redesigning the org chart template and just needs to know what job titles actually exist in the company — once each, no repeats.\"",
    "\"If you just select the column, you'll get every role listed once per person. That's not what they asked for.\"",
  ],
  objective: "Select every unique role that exists among employees.",
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
  expectedColumns: ["role"],
  expectedRows: [["Analyst"], ["Consultant"], ["Engineer"], ["Developer"]],
  requireRowOrder: false,
  hints: [
    "There are 10 employees but far fewer distinct job titles among them.",
    "The DISTINCT keyword goes right after SELECT, before the column name.",
    "Try: SELECT DISTINCT role FROM employees;",
  ],
  xpAward: 50,
};
