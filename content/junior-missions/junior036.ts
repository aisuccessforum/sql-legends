import type { Mission } from "../missions/level001";

export const junior036: Mission = {
  id: "junior-ticket-036",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-036 // Priority: Critical",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:40 AM. Internal system. Priority: Critical.",
    "\"Interesting question for the promotion committee — find any employee who has been here LONGER than their own manager. That's not necessarily a problem, but it's worth a look.\"",
  ],
  objective:
    "Select the name, tenure, manager's name, and manager's tenure for every employee whose tenure is greater than their manager's.",
  schemaLabel: "employees_org",
  seedSql: `
    CREATE TABLE employees_org (
      id INTEGER PRIMARY KEY,
      name TEXT,
      manager_id INTEGER,
      tenure_months INTEGER
    );
    INSERT INTO employees_org (id, name, manager_id, tenure_months) VALUES
      (1, 'Ananya Iyer', NULL, 60),
      (2, 'Priya Nair', 1, 14),
      (3, 'Marcus Webb', 1, 8),
      (4, 'Sofia Reyes', 2, 10),
      (5, 'Arjun Kapoor', 2, 5),
      (6, 'Rohan Verma', 3, 12),
      (7, 'Meera Shah', 3, 6);
  `,
  schemaPreview: [
    { table: "employees_org", columns: ["id", "name", "manager_id", "tenure_months"] },
  ],
  expectedColumns: ["name", "tenure_months", "manager_name", "manager_tenure"],
  expectedRows: [["Rohan Verma", 12, "Marcus Webb", 8]],
  requireRowOrder: false,
  hints: [
    "Same self-join as last time, but this time a plain JOIN is correct — anyone with no manager can't be compared anyway.",
    "Compare e.tenure_months to m.tenure_months directly in WHERE, same as comparing any two columns.",
    "Try: SELECT e.name, e.tenure_months, m.name AS manager_name, m.tenure_months AS manager_tenure FROM employees_org e JOIN employees_org m ON e.manager_id = m.id WHERE e.tenure_months > m.tenure_months;",
  ],
  xpAward: 200,
};
