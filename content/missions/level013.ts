import type { Mission } from "./level001";

export const level013: Mission = {
  id: "intern-ticket-013",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-013 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "03:20 PM. Internal system. Priority: Medium.",
    "\"We're consolidating everything with 'Data' in the department name under one budget line — Data Analytics, Data Engineering, doesn't matter which. Give me everyone in either.\"",
    "\"You could write out both department names with OR — but there's a faster way when you're matching a pattern instead of an exact value.\"",
  ],
  objective:
    "Select the name of every employee whose department contains the word 'Data'.",
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
    ["Sofia Reyes"],
    ["Rohan Verma"],
    ["Karan Mehta"],
  ],
  requireRowOrder: false,
  hints: [
    "You're matching part of a value, not the whole thing exactly — that calls for pattern matching, not equals.",
    "LIKE works with '%' as a wildcard meaning \"anything can go here.\"",
    "Try: SELECT name FROM employees WHERE department LIKE '%Data%';",
  ],
  xpAward: 50,
};
