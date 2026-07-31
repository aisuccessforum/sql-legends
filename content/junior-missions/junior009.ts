import type { Mission } from "../missions/level001";

export const junior009: Mission = {
  id: "junior-ticket-009",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-009 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:00 AM. Internal system. Priority: Medium.",
    "\"New module. You already know a query can nest inside another one — a CTE just gives that nested query a name up front, before the real query even starts. It reads top to bottom instead of inside out.\"",
    "\"Nothing fancy for the first one. Give me every employee scoring above 85 — but build it as a named CTE, even though a plain WHERE would've done the same thing. Get the shape of it into your hands.\"",
  ],
  objective:
    "Using a CTE, select the name and score of every employee scoring above 85.",
  schemaLabel: "employees",
  seedSql: `
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      status TEXT,
      role TEXT,
      tenure_months INTEGER,
      performance_score INTEGER
    );
    INSERT INTO employees (id, name, department, status, role, tenure_months, performance_score) VALUES
      (1, 'Rhea Kapoor', 'Data Analytics', 'active', 'Analyst', 10, 82),
      (2, 'Aman Gupta', 'Data Analytics', 'active', 'Analyst', 5, 91),
      (3, 'Simran Kaur', 'Data Analytics', 'on_leave', 'Analyst', 20, 76),
      (4, 'Farhan Sheikh', 'Business Intelligence', 'active', 'Consultant', 14, 88),
      (5, 'Pooja Desai', 'Business Intelligence', 'active', 'Consultant', 7, 95),
      (6, 'Rahul Bose', 'Business Intelligence', 'terminated', 'Consultant', 30, 60),
      (7, 'Tanvi Shetty', 'Data Engineering', 'active', 'Engineer', 3, 70),
      (8, 'Kunal Saxena', 'Data Engineering', 'active', 'Engineer', 16, 85),
      (9, 'Anjali Rathore', 'Data Engineering', 'active', 'Engineer', 9, 92),
      (10, 'Vivek Nanda', 'Dashboard Development', 'active', 'Developer', 11, 79),
      (11, 'Meher Ahluwalia', 'Dashboard Development', 'on_leave', 'Developer', 22, 68),
      (12, 'Siddharth Oberoi', 'Dashboard Development', 'active', 'Developer', 6, 90);
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
        "performance_score",
      ],
    },
  ],
  expectedColumns: ["name", "performance_score"],
  expectedRows: [
    ["Aman Gupta", 91],
    ["Farhan Sheikh", 88],
    ["Pooja Desai", 95],
    ["Anjali Rathore", 92],
    ["Siddharth Oberoi", 90],
  ],
  requireRowOrder: false,
  hints: [
    "A CTE starts with WITH, a name you choose, AS, and then the nested query in parentheses.",
    "After the CTE is defined, your real SELECT treats it exactly like a table.",
    "Try: WITH high_performers AS (SELECT name, performance_score FROM employees WHERE performance_score > 85) SELECT * FROM high_performers;",
  ],
  xpAward: 150,
};
