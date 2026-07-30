import type { Mission } from "./level001";

export const level024: Mission = {
  id: "intern-ticket-024",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-024 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "03:00 PM. Internal system. Priority: High.",
    "\"Careful with this one — a lot of interns get it wrong. I need active employees who are either Consultants, or have more than 15 months tenure. Both groups have to already be active, no exceptions.\"",
    "\"If you just chain AND and OR together without grouping them, SQL won't necessarily read it the way you meant. Use parentheses to be explicit about what belongs together.\"",
  ],
  objective:
    "Select the name of every active employee who is either a Consultant, or has more than 15 months tenure.",
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
    ["Aditya Rao"],
    ["Aryan Chopra"],
    ["Ritika Joshi"],
    ["Dev Patel"],
    ["Naina Reddy"],
  ],
  requireRowOrder: false,
  hints: [
    "\"Active AND (Consultant OR long tenure)\" is different from \"(active AND Consultant) OR long tenure\" — read the request carefully.",
    "Wrap the OR condition in parentheses so it's grouped together, then AND that whole group with the status check.",
    "Try: SELECT name FROM employees WHERE status = 'active' AND (role = 'Consultant' OR tenure_months > 15);",
  ],
  xpAward: 75,
};
