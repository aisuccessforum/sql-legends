import type { Mission } from "./level001";

export const level020: Mission = {
  id: "intern-ticket-020",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-020 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:45 AM. Internal system. Priority: Medium.",
    "\"Retention team wants a watchlist — anyone past 15 months is eligible for the loyalty bonus program. Just past it, not a specific range.\"",
    "\"You've used BETWEEN for a range. This time there's no upper limit — just 'more than' a number.\"",
  ],
  objective: "Select the name of every employee with more than 15 months tenure.",
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
  expectedRows: [["Aditya Rao"], ["Aryan Chopra"], ["Dev Patel"]],
  requireRowOrder: false,
  hints: [
    "Someone with exactly 15 months does not count — the request says \"more than.\"",
    "The greater-than symbol works in SQL exactly like in math: >.",
    "Try: SELECT name FROM employees WHERE tenure_months > 15;",
  ],
  xpAward: 75,
};
