import type { Mission } from "./level001";

export const level027: Mission = {
  id: "intern-ticket-027",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-027 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "09:45 AM. Internal system. Priority: Medium.",
    "\"Narrower question now — of everything we're tracking, how many projects are actually active right now, not completed or shelved?\"",
    "\"Same COUNT as before, just with a filter in front of it.\"",
  ],
  objective:
    "Count the number of projects whose status is 'active', labeling the result as active_projects.",
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
  expectedColumns: ["active_projects"],
  expectedRows: [[4]],
  requireRowOrder: false,
  hints: [
    "You're still counting rows — just fewer of them this time.",
    "WHERE still goes in the same place it always has, right before the aggregate is calculated.",
    "Try: SELECT COUNT(*) AS active_projects FROM projects WHERE status = 'active';",
  ],
  xpAward: 75,
};
