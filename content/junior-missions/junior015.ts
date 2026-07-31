import type { Mission } from "../missions/level001";

export const junior015: Mission = {
  id: "junior-ticket-015",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-015 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "01:45 PM. Internal system. Priority: High.",
    "\"Now use that same join to find who's actually underperforming relative to their own team — not the whole company, their team specifically.\"",
  ],
  objective:
    "Using a CTE of department averages joined back to employees, select every employee whose score is below their own department's average.",
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
    ["Simran Kaur", "Data Analytics", 76, 83],
    ["Rahul Bose", "Business Intelligence", 60, 81],
    ["Tanvi Shetty", "Data Engineering", 70, 82.33333333333333],
    ["Meher Ahluwalia", "Dashboard Development", 68, 79],
  ],
  requireRowOrder: false,
  hints: [
    "Start from last ticket's exact query, then add one WHERE comparing the employee's own score to the joined department average.",
    "You're comparing two columns from the joined result to each other, not to a fixed number.",
    "Try: WITH dept_avg AS (SELECT department, AVG(performance_score) AS avg_score FROM employees GROUP BY department) SELECT e.name, e.department, e.performance_score, da.avg_score AS department_avg FROM employees e JOIN dept_avg da ON e.department = da.department WHERE e.performance_score < da.avg_score;",
  ],
  xpAward: 175,
};
