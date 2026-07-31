import type { Mission } from "../missions/level001";

export const junior040: Mission = {
  id: "junior-ticket-040",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-040 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "01:00 PM. Internal system. Priority: Medium.",
    "\"New tool. Recognition committee wants one combined list — employees scoring 85 or above, and separately, employees who've been here more than 15 months. Merge them into a single list. If someone qualifies both ways, they should only appear once.\"",
    "\"UNION stacks the results of two separate SELECT statements into one result set, and automatically removes exact duplicate rows.\"",
  ],
  objective:
    "Select the name of every employee scoring 85 or above, combined with every employee with more than 15 months tenure, as a single deduplicated list.",
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
  expectedColumns: ["name"],
  expectedRows: [
    ["Aman Gupta"],
    ["Anjali Rathore"],
    ["Farhan Sheikh"],
    ["Kunal Saxena"],
    ["Meher Ahluwalia"],
    ["Pooja Desai"],
    ["Rahul Bose"],
    ["Siddharth Oberoi"],
    ["Simran Kaur"],
  ],
  requireRowOrder: false,
  hints: [
    "Write two complete SELECT statements, each returning just a name column, and put UNION between them.",
    "Kunal Saxena qualifies on both conditions — he should only show up once in the final result, not twice.",
    "Try: SELECT name FROM employees WHERE performance_score >= 85 UNION SELECT name FROM employees WHERE tenure_months > 15;",
  ],
  xpAward: 200,
};
