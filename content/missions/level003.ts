import type { Mission } from "./level001";

export const level003: Mission = {
  id: "intern-ticket-003",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-003 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:02 AM. Internal system. Priority: Medium.",
    "\"HR flagged something. We've got someone terminated still showing up in a few shared reports. I need everyone who is NOT terminated, so we can compare it against the list going out today.\"",
    "\"You already know how to match a value. This time I want the opposite — everyone who doesn't match.\"",
  ],
  objective: "Select the name of every employee whose status is not 'terminated'.",
  schemaLabel: "employees",
  seedSql: `
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      status TEXT
    );
    INSERT INTO employees (id, name, department, status) VALUES
      (1, 'Priya Nair', 'Data Analytics', 'active'),
      (2, 'Marcus Webb', 'Business Intelligence', 'on_leave'),
      (3, 'Sofia Reyes', 'Data Engineering', 'active'),
      (4, 'Arjun Kapoor', 'Dashboard Development', 'terminated'),
      (5, 'Ananya Iyer', 'Business Consulting', 'active'),
      (6, 'Rohan Verma', 'Data Analytics', 'active');
  `,
  schemaPreview: [
    { table: "employees", columns: ["id", "name", "department", "status"] },
  ],
  expectedColumns: ["name"],
  expectedRows: [
    ["Priya Nair"],
    ["Marcus Webb"],
    ["Sofia Reyes"],
    ["Ananya Iyer"],
    ["Rohan Verma"],
  ],
  requireRowOrder: false,
  hints: [
    "You're filtering again, just like last time — but for everyone who DOESN'T match a value.",
    "SQL's \"not equal to\" operator is != (some people write <> instead — both work in SQLite).",
    "Try: SELECT name FROM employees WHERE status != 'terminated';",
  ],
  xpAward: 50,
};
