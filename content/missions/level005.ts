import type { Mission } from "./level001";

export const level005: Mission = {
  id: "intern-ticket-005",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-005 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:15 PM. Internal system. Priority: High.",
    "\"Last one before you're off internal tickets and onto real client data. Leadership wants a one-line status check: every active employee, name and status side by side, nothing else.\"",
    "\"This is everything you've done today - picking your columns, and filtering your rows - in the same query. If you can do this cleanly, you're ready for a client file.\"",
  ],
  objective:
    "Select the name and status of every employee whose status is 'active'.",
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
  expectedColumns: ["name", "status"],
  expectedRows: [
    ["Priya Nair", "active"],
    ["Sofia Reyes", "active"],
    ["Ananya Iyer", "active"],
    ["Rohan Verma", "active"],
  ],
  requireRowOrder: false,
  hints: [
    "This is two things you already know, combined: pick your columns, then filter your rows.",
    "Column list right after SELECT, WHERE condition right after FROM employees.",
    "Try: SELECT name, status FROM employees WHERE status = 'active';",
  ],
  xpAward: 75,
};
