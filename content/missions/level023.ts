import type { Mission } from "./level001";

export const level023: Mission = {
  id: "intern-ticket-023",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-023 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "02:15 PM. Internal system. Priority: High.",
    "\"Leadership wants the 3 most senior people currently actually working here — not counting anyone terminated or on leave, obviously.\"",
    "\"That's a filter, a sort, and a cutoff, all in the same query. You've done each piece separately — now put them together.\"",
  ],
  objective:
    "Select the name and tenure of the 3 most senior active employees.",
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
  expectedColumns: ["name", "tenure_months"],
  expectedRows: [
    ["Aryan Chopra", 24],
    ["Dev Patel", 20],
    ["Aditya Rao", 18],
  ],
  requireRowOrder: true,
  hints: [
    "Filter first — only active employees should be considered at all.",
    "Then sort by tenure and cut it off at 3, same as you've done before.",
    "Try: SELECT name, tenure_months FROM employees WHERE status = 'active' ORDER BY tenure_months DESC LIMIT 3;",
  ],
  xpAward: 75,
};
