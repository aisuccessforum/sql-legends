import type { Mission } from "../missions/level001";

export const junior003: Mission = {
  id: "junior-ticket-003",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-003 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "10:15 AM. Internal system. Priority: High.",
    "\"Different flavor of subquery now — one that returns a single number, not a list. Find every employee scoring above the company-wide average. Don't hardcode the average as a number; calculate it in the query itself, so this still works correctly next quarter when the numbers change.\"",
  ],
  objective:
    "Select the name and performance score of every employee whose score is above the average score of all employees.",
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
    ["Rhea Kapoor", 82],
    ["Aman Gupta", 91],
    ["Farhan Sheikh", 88],
    ["Pooja Desai", 95],
    ["Kunal Saxena", 85],
    ["Anjali Rathore", 92],
    ["Siddharth Oberoi", 90],
  ],
  requireRowOrder: false,
  hints: [
    "A subquery that returns exactly one value — like an average — can be used anywhere a single number is expected, including on the right side of a comparison.",
    "Put AVG(performance_score) FROM employees inside parentheses right where you'd normally put a fixed number.",
    "Try: SELECT name, performance_score FROM employees WHERE performance_score > (SELECT AVG(performance_score) FROM employees);",
  ],
  xpAward: 150,
};
