import type { Mission } from "./level001";

export const level038: Mission = {
  id: "intern-ticket-038",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-038 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:10 AM. Internal system. Priority: Low.",
    "\"One more of these — total tenure per department, added up. Gives us a rough sense of institutional knowledge sitting in each team.\"",
  ],
  objective:
    "Select each department along with the sum of tenure_months across its employees.",
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
    ["Data Engineering", 28],
  ],
  requireRowOrder: false,
  hints: [
    "Same GROUP BY pattern again — third aggregate function, same shape.",
    "SUM adds up tenure_months within each department group.",
    "Try: SELECT department, SUM(tenure_months) AS total_tenure FROM employees GROUP BY department;",
  ],
  xpAward: 75,
};
