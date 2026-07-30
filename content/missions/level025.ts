import type { Mission } from "./level001";

export const level025: Mission = {
  id: "intern-ticket-025",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-025 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "03:50 PM. Internal system. Priority: High.",
    "\"Last HR ticket. This is the actual compliance gap — active employees with no manager assigned, and I want the newest hires at the top, since they're the most urgent to fix.\"",
    "\"Filter on two conditions, then sort the result. You've done every piece of this already, just not all at once, with a NULL check in the mix.\"",
  ],
  objective:
    "Select the name of every active employee with no manager assigned, sorted by tenure from shortest to longest.",
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
    ["Naina Reddy"],
    ["Ishaan Bhatt"],
    ["Sana Khan"],
    ["Aryan Chopra"],
  ],
  requireRowOrder: true,
  hints: [
    "Two conditions in WHERE this time: active status, and a missing manager.",
    "AND them together, then sort by tenure ascending at the end.",
    "Try: SELECT name FROM employees WHERE status = 'active' AND manager_name IS NULL ORDER BY tenure_months ASC;",
  ],
  xpAward: 75,
};
