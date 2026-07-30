import type { Mission } from "./level001";

export const level030: Mission = {
  id: "intern-ticket-030",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-030 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:40 AM. Internal system. Priority: Medium.",
    "\"For the pitch deck, I need one line: what does a typical AstraMind project cost, on average, across everything we've run?\"",
    "\"Not the total, not the count — the average. There's a function for exactly that.\"",
  ],
  objective:
    "Calculate the average project budget, labeling the result as avg_budget.",
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
  expectedColumns: ["avg_budget"],
  expectedRows: [[46900]],
  requireRowOrder: false,
  hints: [
    "You want the typical value, not the total and not the count.",
    "AVG works exactly like SUM and COUNT syntactically — same shape, different function name.",
    "Try: SELECT AVG(budget_usd) AS avg_budget FROM projects;",
  ],
  xpAward: 75,
};
