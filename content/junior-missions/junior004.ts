import type { Mission } from "../missions/level001";

export const junior004: Mission = {
  id: "junior-ticket-004",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-004 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "10:50 AM. Internal system. Priority: Medium.",
    "\"Reviewers keep asking 'compared to what?' every time we hand them a score. Put the company average right in the same row as each employee's own score, so there's nothing left to cross-reference.\"",
    "\"A scalar subquery doesn't just have to live in WHERE — it can sit in the column list too, and it'll repeat the same value on every row.\"",
  ],
  objective:
    "Select every employee's name and performance score, along with the company-wide average score in the same row, labeled company_avg.",
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
  expectedColumns: ["name", "performance_score", "company_avg"],
  expectedRows: [
    ["Rhea Kapoor", 82, 81.33333333333333],
    ["Aman Gupta", 91, 81.33333333333333],
    ["Simran Kaur", 76, 81.33333333333333],
    ["Farhan Sheikh", 88, 81.33333333333333],
    ["Pooja Desai", 95, 81.33333333333333],
    ["Rahul Bose", 60, 81.33333333333333],
    ["Tanvi Shetty", 70, 81.33333333333333],
    ["Kunal Saxena", 85, 81.33333333333333],
    ["Anjali Rathore", 92, 81.33333333333333],
    ["Vivek Nanda", 79, 81.33333333333333],
    ["Meher Ahluwalia", 68, 81.33333333333333],
    ["Siddharth Oberoi", 90, 81.33333333333333],
  ],
  requireRowOrder: false,
  hints: [
    "Every row gets the same value here — that's expected, since the subquery isn't tied to the current row in any way yet.",
    "Add the subquery as its own item in the SELECT column list, wrapped in parentheses, with its own alias.",
    "Try: SELECT name, performance_score, (SELECT AVG(performance_score) FROM employees) AS company_avg FROM employees;",
  ],
  xpAward: 150,
};
