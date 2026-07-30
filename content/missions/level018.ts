import type { Mission } from "./level001";

export const level018: Mission = {
  id: "intern-ticket-018",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-018 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:30 AM. Internal system. Priority: High.",
    "\"HR flagged a gap — some employees don't have a manager assigned in the system at all. That's a compliance problem. I need every single one of them, today.\"",
    "\"A missing value in SQL isn't the same as an empty text or a zero — it's its own thing, called NULL, and it needs its own kind of check.\"",
  ],
  objective:
    "Select the name of every employee who has no manager assigned (manager_name is missing).",
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
    ["Ishaan Bhatt"],
    ["Aryan Chopra"],
    ["Sana Khan"],
    ["Naina Reddy"],
  ],
  requireRowOrder: false,
  hints: [
    "You can't check a missing value with = — that's a common mistake, and it won't work the way you'd expect.",
    "SQL has a dedicated check for missing values: IS NULL.",
    "Try: SELECT name FROM employees WHERE manager_name IS NULL;",
  ],
  xpAward: 75,
};
