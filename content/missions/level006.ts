import type { Mission } from "./level001";

export const level006: Mission = {
  id: "intern-ticket-006",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-006 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "09:40 AM. Internal system. Priority: Medium.",
    "\"Data Analytics wants a quick check before their sprint planning — who's actually available to work today? Not just who's on the team, who's active on the team.\"",
    "\"You've filtered on one thing at a time so far. This needs two conditions to both be true at once — department AND status.\"",
  ],
  objective:
    "Select the name of every employee in the 'Data Analytics' department whose status is 'active'.",
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
  expectedRows: [["Priya Nair"], ["Rohan Verma"]],
  requireRowOrder: false,
  hints: [
    "Both conditions have to be true for the same row — that's what AND does.",
    "Chain two WHERE conditions together with AND, each one written just like a single filter.",
    "Try: SELECT name FROM employees WHERE department = 'Data Analytics' AND status = 'active';",
  ],
  xpAward: 50,
};
