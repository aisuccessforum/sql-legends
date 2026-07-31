import type { Mission } from "../missions/level001";

export const junior007: Mission = {
  id: "junior-ticket-007",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-007 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "01:45 PM. Internal system. Priority: High.",
    "\"Now the actual point of building it as a derived table — leadership doesn't want a hardcoded number like 80. They want departments beating the real, current company-wide average, whatever that happens to be this quarter.\"",
    "\"Two subqueries in the same query now: the derived table in FROM, and a scalar subquery in WHERE. Neither one needs to know the other exists.\"",
  ],
  objective:
    "Using a derived table of each department's average score, select the department and average for every department whose average beats the overall company average.",
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
  expectedColumns: ["department", "avg_score"],
  expectedRows: [
    ["Data Analytics", 83],
    ["Data Engineering", 82.33333333333333],
  ],
  requireRowOrder: false,
  hints: [
    "Start from last ticket's query — same derived table in FROM.",
    "Instead of a fixed number in WHERE, swap in a scalar subquery calculating AVG(performance_score) FROM employees directly — the real, unfiltered company average.",
    "Try: SELECT dept_avg.department, dept_avg.avg_score FROM (SELECT department, AVG(performance_score) AS avg_score FROM employees GROUP BY department) AS dept_avg WHERE dept_avg.avg_score > (SELECT AVG(performance_score) FROM employees);",
  ],
  xpAward: 175,
};
