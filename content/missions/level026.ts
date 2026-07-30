import type { Mission } from "./level001";

export const level026: Mission = {
  id: "intern-ticket-026",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-026 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "09:10 AM. Internal system. Priority: Medium.",
    "New module, new dataset — you're on the internal project tracker now. Every engagement AstraMind has ever run lives in one table.",
    "\"Ops wants a single number for the standup: how many projects are we tracking, period? Active, completed, cancelled, doesn't matter — just the total count.\"",
    "\"You've selected rows before. Now you're going to summarize them into one number instead — that's what an aggregate function does.\"",
  ],
  objective:
    "Count the total number of projects, labeling the result as total_projects.",
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
  expectedColumns: ["total_projects"],
  expectedRows: [[10]],
  requireRowOrder: false,
  hints: [
    "You don't want the rows themselves — you want how many there are.",
    "COUNT(*) counts every row in the table; alias it with AS so the result has a readable name.",
    "Try: SELECT COUNT(*) AS total_projects FROM projects;",
  ],
  xpAward: 75,
};
