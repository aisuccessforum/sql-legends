import type { Mission } from "./level001";

export const level022: Mission = {
  id: "intern-ticket-022",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-022 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:30 PM. Internal system. Priority: Medium.",
    "\"Department heads want a roster grouped by their own team, most senior person listed first within each department.\"",
    "\"That's two sorting rules at once — department order first, then tenure inside each department. ORDER BY can take more than one column.\"",
  ],
  objective:
    "Select the name, department, and tenure of every employee, sorted alphabetically by department, and by tenure (longest first) within each department.",
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
  expectedColumns: ["name", "department", "tenure_months"],
  expectedRows: [
    ["Aryan Chopra", "Business Consulting", 24],
    ["Naina Reddy", "Business Consulting", 1],
    ["Aditya Rao", "Business Intelligence", 18],
    ["Ritika Joshi", "Business Intelligence", 15],
    ["Dev Patel", "Dashboard Development", 20],
    ["Kavya Menon", "Dashboard Development", 9],
    ["Neha Kulkarni", "Data Analytics", 6],
    ["Sana Khan", "Data Analytics", 4],
    ["Yash Malhotra", "Data Engineering", 12],
    ["Ishaan Bhatt", "Data Engineering", 2],
  ],
  requireRowOrder: true,
  hints: [
    "ORDER BY can take a list of columns, not just one — separate them with a comma.",
    "The first column listed is the primary sort; the second only matters for ties within the first.",
    "Try: SELECT name, department, tenure_months FROM employees ORDER BY department ASC, tenure_months DESC;",
  ],
  xpAward: 75,
};
