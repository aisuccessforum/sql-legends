import type { Mission } from "../missions/level001";

export const junior035: Mission = {
  id: "junior-ticket-035",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-035 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "New module — advanced joins. HR wants the reporting structure spelled out.",
    "\"Every employee here has a manager, and that manager is also a row in the very same employees table. Show each employee's name next to their manager's name.\"",
    "\"There's only one employees table. You join it to itself, using two different aliases so SQL can tell 'the employee' from 'the manager' apart — even though they're rows from the exact same place.\"",
  ],
  objective:
    "Select every employee's name along with their manager's name (blank for anyone with no manager).",
  schemaLabel: "employees_org",
  seedSql: `
    CREATE TABLE employees_org (
      id INTEGER PRIMARY KEY,
      name TEXT,
      manager_id INTEGER,
      tenure_months INTEGER
    );
    INSERT INTO employees_org (id, name, manager_id, tenure_months) VALUES
      (1, 'Ananya Iyer', NULL, 60),
      (2, 'Priya Nair', 1, 14),
      (3, 'Marcus Webb', 1, 8),
      (4, 'Sofia Reyes', 2, 10),
      (5, 'Arjun Kapoor', 2, 5),
      (6, 'Rohan Verma', 3, 12),
      (7, 'Meera Shah', 3, 6);
  `,
  schemaPreview: [
    { table: "employees_org", columns: ["id", "name", "manager_id", "tenure_months"] },
  ],
  expectedColumns: ["name", "manager_name"],
  expectedRows: [
    ["Ananya Iyer", null],
    ["Priya Nair", "Ananya Iyer"],
    ["Marcus Webb", "Ananya Iyer"],
    ["Sofia Reyes", "Priya Nair"],
    ["Arjun Kapoor", "Priya Nair"],
    ["Rohan Verma", "Marcus Webb"],
    ["Meera Shah", "Marcus Webb"],
  ],
  requireRowOrder: false,
  hints: [
    "Ananya has no manager — a plain JOIN would drop her row entirely, so this needs LEFT JOIN instead.",
    "Alias the table twice: once as the employee side, once as the manager side, joining employee.manager_id to manager.id.",
    "Try: SELECT e.name, m.name AS manager_name FROM employees_org e LEFT JOIN employees_org m ON e.manager_id = m.id;",
  ],
  xpAward: 200,
};
