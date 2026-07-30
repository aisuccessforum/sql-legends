import type { Mission } from "./level001";

export const level014: Mission = {
  id: "intern-ticket-014",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-014 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "04:00 PM. Internal system. Priority: Medium.",
    "\"Training team is running one combined workshop for two roles this month — Analysts and Developers. I need the invite list, both roles in one pull.\"",
    "\"This is the same shape as OR, but when you're checking one column against a whole list of values, there's a cleaner way to write it.\"",
  ],
  objective:
    "Select the name of every employee whose role is 'Analyst' or 'Developer'.",
  schemaLabel: "employees",
  seedSql: `
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      status TEXT,
      role TEXT,
      tenure_months INTEGER
    );
    INSERT INTO employees (id, name, department, status, role, tenure_months) VALUES
      (1, 'Priya Nair', 'Data Analytics', 'active', 'Analyst', 14),
      (2, 'Marcus Webb', 'Business Intelligence', 'on_leave', 'Consultant', 26),
      (3, 'Sofia Reyes', 'Data Engineering', 'active', 'Engineer', 8),
      (4, 'Arjun Kapoor', 'Dashboard Development', 'terminated', 'Developer', 5),
      (5, 'Ananya Iyer', 'Business Consulting', 'active', 'Consultant', 19),
      (6, 'Rohan Verma', 'Data Analytics', 'active', 'Analyst', 3),
      (7, 'Meera Shah', 'Business Intelligence', 'active', 'Analyst', 11),
      (8, 'Karan Mehta', 'Data Engineering', 'on_leave', 'Engineer', 22),
      (9, 'Divya Pillai', 'Dashboard Development', 'active', 'Developer', 7),
      (10, 'Vikram Rao', 'Business Consulting', 'terminated', 'Consultant', 30);
  `,
  schemaPreview: [
    {
      table: "employees",
      columns: ["id", "name", "department", "status", "role", "tenure_months"],
    },
  ],
  expectedColumns: ["name"],
  expectedRows: [
    ["Priya Nair"],
    ["Arjun Kapoor"],
    ["Rohan Verma"],
    ["Meera Shah"],
    ["Divya Pillai"],
  ],
  requireRowOrder: false,
  hints: [
    "You could write role = 'Analyst' OR role = 'Developer' — but there's a shorter way to check a list of options.",
    "IN lets you list every acceptable value in parentheses, separated by commas.",
    "Try: SELECT name FROM employees WHERE role IN ('Analyst', 'Developer');",
  ],
  xpAward: 50,
};
