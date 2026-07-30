import type { Mission } from "./level001";

export const level028: Mission = {
  id: "intern-ticket-028",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-028 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:20 AM. Internal system. Priority: High.",
    "\"Finance wants the big number for the quarterly review — every dollar committed across every project we've ever run, added together.\"",
    "\"COUNT tells you how many rows. SUM adds up a number column across those rows instead.\"",
  ],
  objective:
    "Add up the budget of every project, labeling the result as total_budget.",
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
  expectedColumns: ["total_budget"],
  expectedRows: [[469000]],
  requireRowOrder: false,
  hints: [
    "You need every budget value added into one total — not listed, added.",
    "SUM works exactly like COUNT syntactically, just pointed at a numeric column instead of *.",
    "Try: SELECT SUM(budget_usd) AS total_budget FROM projects;",
  ],
  xpAward: 75,
};
