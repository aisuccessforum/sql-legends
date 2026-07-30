import type { Mission } from "./level001";

export const level044: Mission = {
  id: "intern-ticket-044",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-044 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "02:30 PM. Internal system. Priority: Medium.",
    "\"Which departments have built up more than 30 months of combined tenure? Those are the teams with real institutional depth — worth protecting if there's ever a reorg.\"",
  ],
  objective:
    "Select each department and its total tenure, but only for departments where that total exceeds 30 months.",
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
  expectedColumns: ["department", "total_tenure"],
  expectedRows: [
    ["Business Intelligence", 51],
    ["Dashboard Development", 39],
    ["Data Analytics", 35],
  ],
  requireRowOrder: false,
  hints: [
    "Same HAVING pattern as before, just with SUM instead of COUNT or AVG.",
    "No WHERE needed this time — every employee counts toward their department's total, regardless of status.",
    "Try: SELECT department, SUM(tenure_months) AS total_tenure FROM employees GROUP BY department HAVING SUM(tenure_months) > 30;",
  ],
  xpAward: 75,
};
