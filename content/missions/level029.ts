import type { Mission } from "./level001";

export const level029: Mission = {
  id: "intern-ticket-029",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-029 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:00 AM. Internal system. Priority: High.",
    "\"Refine that number for me — how much budget is actually tied up in projects that are still active right now, not the historical total?\"",
  ],
  objective:
    "Add up the budget of every project whose status is 'active', labeling the result as active_budget.",
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
  expectedColumns: ["active_budget"],
  expectedRows: [[198000]],
  requireRowOrder: false,
  hints: [
    "Same structure as counting active projects, but summing instead of counting.",
    "Filter with WHERE first, then SUM only adds up what made it through the filter.",
    "Try: SELECT SUM(budget_usd) AS active_budget FROM projects WHERE status = 'active';",
  ],
  xpAward: 75,
};
