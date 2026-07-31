import type { Mission } from "../missions/level001";

export const junior041: Mission = {
  id: "junior-ticket-041",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-041 // Priority: Low",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "01:35 PM. Internal system. Priority: Low.",
    "\"Actually, I want to know who qualifies on BOTH criteria — the score cutoff and the tenure cutoff. If UNION dedupes them, I can't tell who's a double match anymore.\"",
    "\"UNION ALL is the version that keeps every row, duplicates included. Anyone appearing twice is genuinely on both lists.\"",
  ],
  objective:
    "Select the name of every employee scoring 85 or above, combined with every employee with more than 15 months tenure, keeping duplicates.",
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
    ["Farhan Sheikh"],
    ["Pooja Desai"],
    ["Kunal Saxena"],
    ["Anjali Rathore"],
    ["Siddharth Oberoi"],
    ["Simran Kaur"],
    ["Rahul Bose"],
    ["Kunal Saxena"],
    ["Meher Ahluwalia"],
  ],
  requireRowOrder: false,
  hints: [
    "One word changes from the last ticket's query — UNION becomes UNION ALL.",
    "Kunal Saxena should now appear twice in the results, once from each SELECT.",
    "Try: SELECT name FROM employees WHERE performance_score >= 85 UNION ALL SELECT name FROM employees WHERE tenure_months > 15;",
  ],
  xpAward: 175,
};
