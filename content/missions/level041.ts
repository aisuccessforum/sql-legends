import type { Mission } from "./level001";

export const level041: Mission = {
  id: "intern-ticket-041",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-041 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "12:00 PM. Internal system. Priority: Medium.",
    "\"Different cut this time — forget departments. I want average performance by job title, across the whole company. Are Analysts outperforming Engineers, or the other way around?\"",
    "\"GROUP BY isn't locked to department — it works on any column you point it at.\"",
  ],
  objective: "Select each role along with its average performance score.",
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
  expectedColumns: ["role", "avg_score"],
  expectedRows: [
    ["Analyst", 83],
    ["Consultant", 81],
    ["Developer", 79],
    ["Engineer", 82.33333333333333],
  ],
  requireRowOrder: false,
  hints: [
    "Everything works exactly the same — just group by a different column this time.",
    "Swap department for role in the GROUP BY, nothing else changes.",
    "Try: SELECT role, AVG(performance_score) AS avg_score FROM employees GROUP BY role;",
  ],
  xpAward: 75,
};
