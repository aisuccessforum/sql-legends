export interface Mission {
  id: string;
  world: string;
  levelLabel: string;
  npc: string;
  briefing: string[];
  objective: string;
  schemaLabel: string;
  seedSql: string;
  schemaPreview: { table: string; columns: string[] }[];
  expectedColumns: string[];
  expectedRows: unknown[][];
  requireRowOrder: boolean;
  hints: string[];
  xpAward: number;
}

export const level001: Mission = {
  id: "intern-ticket-001",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-001 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "08:45 AM. Internal system. Priority: Medium.",
    "Your badge gets you as far as the intern floor. Team Lead Malhotra doesn't do small talk - she pulls up a single table on the shared terminal: EMPLOYEES.",
    "\"Before we touch a single client file, HR needs a clean internal headcount. Every new hire this quarter, verified.\"",
    "\"Most interns lose confidence in the first week - not because the work is hard, because they're afraid to just look at the data.\"",
    "\"Pull every employee whose status is active. Nothing else. That's ticket one.\"",
  ],
  objective: "Select the name of every employee whose status is 'active'.",
  schemaLabel: "employees",
  seedSql: `
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      status TEXT
    );
    INSERT INTO employees (id, name, department, status) VALUES
      (1, 'Priya Nair', 'Data Analytics', 'active'),
      (2, 'Marcus Webb', 'Business Intelligence', 'on_leave'),
      (3, 'Sofia Reyes', 'Data Engineering', 'active'),
      (4, 'Arjun Kapoor', 'Dashboard Development', 'terminated'),
      (5, 'Ananya Iyer', 'Business Consulting', 'active');
  `,
  schemaPreview: [
    { table: "employees", columns: ["id", "name", "department", "status"] },
  ],
  expectedColumns: ["name"],
  expectedRows: [["Priya Nair"], ["Sofia Reyes"], ["Ananya Iyer"]],
  requireRowOrder: false,
  hints: [
    "You only need one column back: name.",
    "Filter rows with WHERE - you're looking for status = 'active'.",
    "Try: SELECT name FROM employees WHERE status = 'active';",
  ],
  xpAward: 50,
};
