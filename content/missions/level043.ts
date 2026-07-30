import type { Mission } from "./level001";

export const level043: Mission = {
  id: "intern-ticket-043",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-043 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:45 PM. Internal system. Priority: Medium.",
    "\"Which departments actually have enough active people to run a project on their own — at least 3 active employees? Anything smaller needs to borrow from another team.\"",
    "\"HAVING works with COUNT the same way it worked with AVG — filter the groups after they're built.\"",
  ],
  objective:
    "Select each department and its count of active employees, but only for departments with at least 3 active employees.",
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
  expectedColumns: ["department", "active_count"],
  expectedRows: [["Data Engineering", 3]],
  requireRowOrder: false,
  hints: [
    "You need WHERE and HAVING both here — one filters rows, the other filters groups.",
    "Filter to active employees first, group by department, then keep only groups with 3 or more.",
    "Try: SELECT department, COUNT(*) AS active_count FROM employees WHERE status = 'active' GROUP BY department HAVING COUNT(*) >= 3;",
  ],
  xpAward: 75,
};
