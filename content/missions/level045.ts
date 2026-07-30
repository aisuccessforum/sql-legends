import type { Mission } from "./level001";

export const level045: Mission = {
  id: "intern-ticket-045",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-045 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "03:15 PM. Internal system. Priority: High.",
    "\"Last one on Team Performance. Departments averaging above 80 in performance, best team first. This is going straight into the leadership deck, so get the order right too.\"",
    "\"GROUP BY, HAVING, and ORDER BY, all in the same query. You've used every piece of this separately — now it's one ticket.\"",
    "\"Nail this and you're through the whole internal analytics track. Client data is next.\"",
  ],
  objective:
    "Select each department and its average performance score, only for departments averaging above 80, sorted from highest average to lowest.",
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
    ["Business Intelligence", 81],
  ],
  requireRowOrder: true,
  hints: [
    "Build it in order: GROUP BY to split into departments, HAVING to filter which ones qualify, ORDER BY to arrange what's left.",
    "ORDER BY can reference the same alias you gave your aggregate — no need to repeat the whole AVG() expression.",
    "Try: SELECT department, AVG(performance_score) AS avg_score FROM employees GROUP BY department HAVING AVG(performance_score) > 80 ORDER BY avg_score DESC;",
  ],
  xpAward: 100,
};
