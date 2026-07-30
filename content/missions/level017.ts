import type { Mission } from "./level001";

export const level017: Mission = {
  id: "intern-ticket-017",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-017 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "09:50 AM. Internal system. Priority: Medium.",
    "\"Payroll needs everyone who's still actually working here day to day — exclude anyone terminated, exclude anyone on leave. Everyone else.\"",
    "\"IN lets you match a list of values. NOT IN is the list you want to exclude instead.\"",
  ],
  objective:
    "Select the name of every employee whose status is not 'terminated' and not 'on_leave'.",
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
    ["Ishaan Bhatt"],
    ["Aryan Chopra"],
    ["Sana Khan"],
    ["Ritika Joshi"],
    ["Dev Patel"],
    ["Naina Reddy"],
  ],
  requireRowOrder: false,
  hints: [
    "You're excluding two values at once, not matching them.",
    "NOT IN works exactly like IN, just excluding every value in the list instead of matching it.",
    "Try: SELECT name FROM employees WHERE status NOT IN ('terminated', 'on_leave');",
  ],
  xpAward: 75,
};
