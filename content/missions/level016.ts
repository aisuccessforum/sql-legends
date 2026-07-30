import type { Mission } from "./level001";

export const level016: Mission = {
  id: "intern-ticket-016",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-016 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "09:15 AM. Internal system. Priority: Medium.",
    "You're off basic internal checks now — HR Analytics is a step up. First one's still familiar territory, just flipped.",
    "\"Both Business teams are getting a separate review process this quarter. I need everyone who is NOT on a Business team — the rest of the company, basically.\"",
    "\"You already know LIKE for matching a pattern. This time, match everything that does NOT fit it.\"",
  ],
  objective:
    "Select the name of every employee whose department does not contain the word 'Business'.",
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
    ["Ishaan Bhatt"],
    ["Kavya Menon"],
    ["Sana Khan"],
    ["Yash Malhotra"],
    ["Dev Patel"],
  ],
  requireRowOrder: false,
  hints: [
    "You're excluding a pattern this time, not matching one.",
    "Put NOT directly in front of LIKE — the wildcard syntax stays the same.",
    "Try: SELECT name FROM employees WHERE department NOT LIKE '%Business%';",
  ],
  xpAward: 75,
};
