import type { Mission } from "./level001";

export const level019: Mission = {
  id: "intern-ticket-019",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-019 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:05 AM. Internal system. Priority: Low.",
    "\"Now flip that list — I want the ones who already have a manager on file, so I know who's already compliant and doesn't need chasing.\"",
  ],
  objective:
    "Select the name of every employee who has a manager assigned.",
  schemaLabel: "employees",
  seedSql: `
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      status TEXT,
      role TEXT,
      tenure_months INTEGER,
      manager_name TEXT
    );
    INSERT INTO employees (id, name, department, status, role, tenure_months, manager_name) VALUES
      (1, 'Neha Kulkarni', 'Data Analytics', 'active', 'Analyst', 6, 'Priya Nair'),
      (2, 'Aditya Rao', 'Business Intelligence', 'active', 'Consultant', 18, 'Marcus Webb'),
      (3, 'Ishaan Bhatt', 'Data Engineering', 'active', 'Engineer', 2, NULL),
      (4, 'Kavya Menon', 'Dashboard Development', 'on_leave', 'Developer', 9, 'Divya Pillai'),
      (5, 'Aryan Chopra', 'Business Consulting', 'active', 'Consultant', 24, NULL),
      (6, 'Sana Khan', 'Data Analytics', 'active', 'Analyst', 4, NULL),
      (7, 'Yash Malhotra', 'Data Engineering', 'terminated', 'Engineer', 12, 'Karan Mehta'),
      (8, 'Ritika Joshi', 'Business Intelligence', 'active', 'Consultant', 15, 'Marcus Webb'),
      (9, 'Dev Patel', 'Dashboard Development', 'active', 'Developer', 20, 'Divya Pillai'),
      (10, 'Naina Reddy', 'Business Consulting', 'active', 'Consultant', 1, NULL);
  `,
  schemaPreview: [
    {
      table: "employees",
      columns: [
        "id",
        "name",
        "department",
        "status",
        "role",
        "tenure_months",
        "manager_name",
      ],
    },
  ],
  expectedColumns: ["name"],
  expectedRows: [
    ["Neha Kulkarni"],
    ["Aditya Rao"],
    ["Kavya Menon"],
    ["Yash Malhotra"],
    ["Ritika Joshi"],
    ["Dev Patel"],
  ],
  requireRowOrder: false,
  hints: [
    "Same idea as last ticket, just the opposite check.",
    "IS NOT NULL is the reverse of IS NULL — same keywords, one extra word.",
    "Try: SELECT name FROM employees WHERE manager_name IS NOT NULL;",
  ],
  xpAward: 75,
};
