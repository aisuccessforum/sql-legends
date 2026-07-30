import type { Mission } from "./level001";

export const level021: Mission = {
  id: "intern-ticket-021",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-021 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "12:20 PM. Internal system. Priority: Low.",
    "\"Onboarding wants the opposite list now — everyone under 5 months tenure. That's who still needs the new-hire welcome kit.\"",
  ],
  objective: "Select the name of every employee with less than 5 months tenure.",
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
  expectedRows: [["Ishaan Bhatt"], ["Sana Khan"], ["Naina Reddy"]],
  requireRowOrder: false,
  hints: [
    "Same idea as last time, opposite direction.",
    "The less-than symbol also works exactly like in math: <.",
    "Try: SELECT name FROM employees WHERE tenure_months < 5;",
  ],
  xpAward: 75,
};
