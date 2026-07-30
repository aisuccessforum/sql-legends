import type { Mission } from "./level001";

export const level015: Mission = {
  id: "intern-ticket-015",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-015 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "04:45 PM. Internal system. Priority: High.",
    "\"Last internal ticket before you're on client data. Annual review cycle — anyone with tenure between 10 and 20 months is due this quarter. Not less, not more.\"",
    "\"You know how to filter with a single number. This time you need a range — everything between two values, inclusive.\"",
    "\"Get this right and Monday you're on a real client file.\"",
  ],
  objective:
    "Select the name of every employee whose tenure is between 10 and 20 months, inclusive.",
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
  expectedRows: [["Priya Nair"], ["Ananya Iyer"], ["Meera Shah"]],
  requireRowOrder: false,
  hints: [
    "You need a range check, not a single exact value or a simple greater/less-than.",
    "BETWEEN takes a low and high value, and includes both endpoints.",
    "Try: SELECT name FROM employees WHERE tenure_months BETWEEN 10 AND 20;",
  ],
  xpAward: 50,
};
