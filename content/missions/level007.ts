import type { Mission } from "./level001";

export const level007: Mission = {
  id: "intern-ticket-007",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-007 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:15 AM. Internal system. Priority: Low.",
    "\"IT is doing hardware refresh for two departments this week — Data Engineering and Dashboard Development. I need everyone in either one, status doesn't matter this time.\"",
    "\"AND needed both things true. This time I want either one — that's OR.\"",
  ],
  objective:
    "Select the name of every employee in the 'Data Engineering' department or the 'Dashboard Development' department.",
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
  expectedColumns: ["name"],
  expectedRows: [
    ["Sofia Reyes"],
    ["Arjun Kapoor"],
    ["Karan Mehta"],
    ["Divya Pillai"],
  ],
  requireRowOrder: false,
  hints: [
    "This time a row only needs to match one of the two conditions, not both.",
    "OR works exactly like AND syntactically — you're just swapping the keyword.",
    "Try: SELECT name FROM employees WHERE department = 'Data Engineering' OR department = 'Dashboard Development';",
  ],
  xpAward: 50,
};
