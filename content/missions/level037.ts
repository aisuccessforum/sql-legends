import type { Mission } from "./level001";

export const level037: Mission = {
  id: "intern-ticket-037",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-037 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "09:35 AM. Internal system. Priority: Medium.",
    "\"Now do the same thing with performance scores instead of headcount — average score per department, so we can see which teams are actually performing well.\"",
  ],
  objective:
    "Select each department along with its average performance score.",
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
    ["Dashboard Development", 79],
    ["Data Analytics", 83],
    ["Data Engineering", 82.33333333333333],
  ],
  requireRowOrder: false,
  hints: [
    "Same shape as last ticket — just swap which aggregate function you're using.",
    "AVG works inside GROUP BY exactly like COUNT did.",
    "Try: SELECT department, AVG(performance_score) AS avg_score FROM employees GROUP BY department;",
  ],
  xpAward: 75,
};
