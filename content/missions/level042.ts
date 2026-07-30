import type { Mission } from "./level001";

export const level042: Mission = {
  id: "intern-ticket-042",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-042 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:00 PM. Internal system. Priority: High.",
    "\"Now filter the groups themselves, not the rows before grouping — I only want departments where the average score is above 82. The rest don't make the report.\"",
    "\"WHERE filters rows before grouping happens. This is different — you need to filter on the aggregate result itself, after it's calculated. That's what HAVING is for.\"",
  ],
  objective:
    "Select each department and its average performance score, but only for departments where that average is above 82.",
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
    "You can't put this condition in WHERE — the average doesn't exist yet at that point in the query.",
    "HAVING goes right after GROUP BY, and can reference the same aggregate function you're already calculating.",
    "Try: SELECT department, AVG(performance_score) AS avg_score FROM employees GROUP BY department HAVING AVG(performance_score) > 82;",
  ],
  xpAward: 75,
};
