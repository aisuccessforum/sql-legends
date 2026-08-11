import type { Mission } from "../missions/level001";

export const da007: Mission = {
  id: "da-ticket-007",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-007 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "01:30 PM. Internal system. Priority: Medium.",
    "\"For Rohan Verma's whole team — him included, plus everyone under him at any level — what's the combined tenure? Gives us a sense of how much institutional knowledge sits in that branch.\"",
  ],
  objective:
    "Using a recursive CTE, calculate the total tenure in months across Rohan Verma and everyone below him at any level.",
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
      (7, 'Meera Shah', 3, 6),
      (8, 'Kabir Oza', 4, 3),
      (9, 'Divya Rao', 6, 2);
  `,
  schemaPreview: [
    { table: "employees_org", columns: ["id", "name", "manager_id", "tenure_months"] },
  ],
  expectedColumns: ["total_team_tenure"],
  expectedRows: [[14]],
  requireRowOrder: false,
  hints: [
    "Same descendants shape as Ticket DA-002, but carry tenure_months through the recursion instead of just name — and this time include Rohan himself in the total.",
    "Once the CTE has every relevant row, it's a plain SUM() over the whole thing.",
    "Try: WITH RECURSIVE team AS (SELECT id, tenure_months FROM employees_org WHERE name = 'Rohan Verma' UNION ALL SELECT e.id, e.tenure_months FROM employees_org e JOIN team t ON e.manager_id = t.id) SELECT SUM(tenure_months) AS total_team_tenure FROM team;",
  ],
  xpAward: 225,
};
