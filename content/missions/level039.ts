import type { Mission } from "./level001";

export const level039: Mission = {
  id: "intern-ticket-039",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-039 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:50 AM. Internal system. Priority: High.",
    "\"Redo the headcount, but only count people who are actually active — anyone on leave or terminated shouldn't be in this number.\"",
    "\"Filter first, then group. The WHERE clause narrows the rows before GROUP BY ever sees them.\"",
  ],
  objective:
    "Select each department along with how many active employees it has.",
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
  expectedColumns: ["department", "active_headcount"],
  expectedRows: [
    ["Business Intelligence", 2],
    ["Dashboard Development", 2],
    ["Data Analytics", 2],
    ["Data Engineering", 3],
  ],
  requireRowOrder: false,
  hints: [
    "This has both a WHERE and a GROUP BY — WHERE always comes first, right after FROM.",
    "Filter to active employees, then group what's left by department.",
    "Try: SELECT department, COUNT(*) AS active_headcount FROM employees WHERE status = 'active' GROUP BY department;",
  ],
  xpAward: 75,
};
