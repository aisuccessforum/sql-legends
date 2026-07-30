import type { Mission } from "./level001";

export const level033: Mission = {
  id: "intern-ticket-033",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-033 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:55 PM. Internal system. Priority: Low.",
    "\"And the other end — what's the largest budget we've ever committed to a single project? Doesn't matter if it got cancelled later, I just want the record high.\"",
    "\"Notice I'm not asking you to filter by status this time. MAX doesn't care what happened to the project afterward — just the number.\"",
  ],
  objective:
    "Find the largest project budget on record, labeling the result as max_budget.",
  schemaLabel: "projects",
  seedSql: `
    CREATE TABLE projects (
      id INTEGER PRIMARY KEY,
      project_name TEXT,
      department TEXT,
      status TEXT,
      budget_usd INTEGER,
      hours_logged INTEGER,
      team_size INTEGER
    );
    INSERT INTO projects (id, project_name, department, status, budget_usd, hours_logged, team_size) VALUES
      (1, 'Atlas Dashboard Revamp', 'Dashboard Development', 'active', 42000, 320, 4),
      (2, 'Churn Prediction Model', 'Data Analytics', 'completed', 68000, 540, 6),
      (3, 'Retail Inventory Sync', 'Data Engineering', 'active', 51000, 410, 5),
      (4, 'Q3 Board Deck Automation', 'Business Consulting', 'completed', 15000, 90, 2),
      (5, 'Client Onboarding Portal', 'Business Intelligence', 'on_hold', 33000, 210, 3),
      (6, 'Fraud Detection Pilot', 'Data Analytics', 'active', 77000, 610, 7),
      (7, 'Internal HR Analytics', 'Business Intelligence', 'completed', 21000, 160, 2),
      (8, 'Legacy System Migration', 'Data Engineering', 'cancelled', 95000, 88, 3),
      (9, 'Marketing Attribution Study', 'Business Consulting', 'active', 28000, 175, 3),
      (10, 'Executive KPI Dashboard', 'Dashboard Development', 'completed', 39000, 260, 4);
  `,
  schemaPreview: [
    {
      table: "projects",
      columns: [
        "id",
        "project_name",
        "department",
        "status",
        "budget_usd",
        "hours_logged",
        "team_size",
      ],
    },
  ],
  expectedColumns: ["max_budget"],
  expectedRows: [[95000]],
  requireRowOrder: false,
  hints: [
    "Same idea as MIN, opposite direction.",
    "MAX() finds the single highest value in the column.",
    "Try: SELECT MAX(budget_usd) AS max_budget FROM projects;",
  ],
  xpAward: 75,
};
