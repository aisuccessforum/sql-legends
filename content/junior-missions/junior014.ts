import type { Mission } from "../missions/level001";

export const junior014: Mission = {
  id: "junior-ticket-014",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-014 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "01:00 PM. Internal system. Priority: Medium.",
    "\"Remember the correlated subquery you wrote to compare each employee against their own department? Same result, different route — build a CTE of department averages, then join it back to every individual employee row.\"",
  ],
  objective:
    "Using a CTE of each department's average score, select every employee's name, department, score, and their department's average score in the same row.",
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
  expectedColumns: ["name", "department", "performance_score", "department_avg"],
  expectedRows: [
    ["Rhea Kapoor", "Data Analytics", 82, 83],
    ["Aman Gupta", "Data Analytics", 91, 83],
    ["Simran Kaur", "Data Analytics", 76, 83],
    ["Farhan Sheikh", "Business Intelligence", 88, 81],
    ["Pooja Desai", "Business Intelligence", 95, 81],
    ["Rahul Bose", "Business Intelligence", 60, 81],
    ["Tanvi Shetty", "Data Engineering", 70, 82.33333333333333],
    ["Kunal Saxena", "Data Engineering", 85, 82.33333333333333],
    ["Anjali Rathore", "Data Engineering", 92, 82.33333333333333],
    ["Vivek Nanda", "Dashboard Development", 79, 79],
    ["Meher Ahluwalia", "Dashboard Development", 68, 79],
    ["Siddharth Oberoi", "Dashboard Development", 90, 79],
  ],
  requireRowOrder: false,
  hints: [
    "The CTE stays at the department level — one row per department. Every employee row needs to join to it on department.",
    "This gives you every employee (12 rows), each carrying their department's average alongside their own score.",
    "Try: WITH dept_avg AS (SELECT department, AVG(performance_score) AS avg_score FROM employees GROUP BY department) SELECT e.name, e.department, e.performance_score, da.avg_score AS department_avg FROM employees e JOIN dept_avg da ON e.department = da.department;",
  ],
  xpAward: 175,
};
