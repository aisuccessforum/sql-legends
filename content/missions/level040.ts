import type { Mission } from "./level001";

export const level040: Mission = {
  id: "intern-ticket-040",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-040 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:20 AM. Internal system. Priority: Low.",
    "\"For the recognition awards — top performance score in each department, whoever that turns out to be.\"",
  ],
  objective:
    "Select each department along with its highest performance score.",
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
  expectedColumns: ["department", "top_score"],
  expectedRows: [
    ["Business Intelligence", 95],
    ["Dashboard Development", 90],
    ["Data Analytics", 91],
    ["Data Engineering", 92],
  ],
  requireRowOrder: false,
  hints: [
    "Fourth aggregate in the same GROUP BY pattern — you've got the shape down by now.",
    "MAX finds the highest value within each department group, same as it did company-wide before.",
    "Try: SELECT department, MAX(performance_score) AS top_score FROM employees GROUP BY department;",
  ],
  xpAward: 75,
};
