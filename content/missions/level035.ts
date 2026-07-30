import type { Mission } from "./level001";

export const level035: Mission = {
  id: "intern-ticket-035",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-035 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "03:30 PM. Internal system. Priority: High.",
    "\"Last one on the project tracker. For everything we've actually finished — completed projects only — I need the total budget spent and the average team size. Both numbers, one query.\"",
    "\"This wraps up aggregates for now. You've done COUNT, SUM, AVG, MIN, and MAX — this ticket just asks for two of them together, filtered.\"",
  ],
  objective:
    "For completed projects, select the total budget and the average team size in a single query, labeling them total_completed_budget and avg_completed_team_size.",
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
  expectedColumns: ["total_completed_budget", "avg_completed_team_size"],
  expectedRows: [[143000, 3.5]],
  requireRowOrder: false,
  hints: [
    "Filter to completed projects first — everything else builds on that same filtered set.",
    "SUM and AVG can both appear in the same SELECT, each with its own alias.",
    "Try: SELECT SUM(budget_usd) AS total_completed_budget, AVG(team_size) AS avg_completed_team_size FROM projects WHERE status = 'completed';",
  ],
  xpAward: 75,
};
