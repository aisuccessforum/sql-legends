import type { Mission } from "../missions/level001";

export const junior005: Mission = {
  id: "junior-ticket-005",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-005 // Priority: High",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "11:30 AM. Internal system. Priority: High.",
    "\"This is the one that trips people up, so pay attention. Comparing to the company average isn't fair to every team — Data Engineering might just run hotter than Business Intelligence. Find employees who outperform their OWN department's average, not the whole company's.\"",
    "\"The subquery needs to know which department it's currently looking at — it has to reference the outer row. That's called a correlated subquery, and it re-runs once for every row instead of just once.\"",
  ],
  objective:
    "Select the name, department, and score of every employee whose performance score is above their own department's average score.",
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
  expectedColumns: ["name", "department", "performance_score"],
  expectedRows: [
    ["Aman Gupta", "Data Analytics", 91],
    ["Farhan Sheikh", "Business Intelligence", 88],
    ["Pooja Desai", "Business Intelligence", 95],
    ["Kunal Saxena", "Data Engineering", 85],
    ["Anjali Rathore", "Data Engineering", 92],
    ["Siddharth Oberoi", "Dashboard Development", 90],
  ],
  requireRowOrder: false,
  hints: [
    "Give the outer table an alias (like e), and give the table inside the subquery a different alias (like e2) — you need both to tell them apart.",
    "Inside the subquery, filter e2's rows down to just the department matching the outer row's department — e.department, referenced from inside.",
    "Try: SELECT e.name, e.department, e.performance_score FROM employees e WHERE e.performance_score > (SELECT AVG(e2.performance_score) FROM employees e2 WHERE e2.department = e.department);",
  ],
  xpAward: 175,
};
