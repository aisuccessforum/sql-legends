import type { Mission } from "../missions/level001";

export const junior006: Mission = {
  id: "junior-ticket-006",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-006 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "01:00 PM. Internal system. Priority: Medium.",
    "\"One more place a subquery can live — right where a table normally goes, in the FROM clause. It's called a derived table: you build a small result set first, then query it like it was a real table all along.\"",
    "\"Find every department averaging above 80. You already know GROUP BY and HAVING can do this directly — I want you to build it as a derived table instead, so you've actually used the pattern once before you need it for something HAVING can't do.\"",
  ],
  objective:
    "Using a derived table of each department's average score, select the department and average score for every department averaging above 80.",
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
    ["Business Intelligence", 81],
    ["Data Analytics", 83],
    ["Data Engineering", 82.33333333333333],
  ],
  requireRowOrder: false,
  hints: [
    "Build the GROUP BY query first, on its own — department and average score, one row per department.",
    "Wrap that whole query in parentheses, give it an alias, and put it in the FROM clause. Then WHERE filters on its output like any normal table.",
    "Try: SELECT dept_avg.department, dept_avg.avg_score FROM (SELECT department, AVG(performance_score) AS avg_score FROM employees GROUP BY department) AS dept_avg WHERE dept_avg.avg_score > 80;",
  ],
  xpAward: 150,
};
