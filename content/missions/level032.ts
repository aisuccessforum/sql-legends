import type { Mission } from "./level001";

export const level032: Mission = {
  id: "intern-ticket-032",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-032 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:20 PM. Internal system. Priority: Low.",
    "\"Someone in finance is asking what our smallest project engagement has ever looked like, budget-wise. Just the number.\"",
  ],
  objective:
    "Find the smallest project budget on record, labeling the result as min_budget.",
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
  expectedColumns: ["min_budget"],
  expectedRows: [[15000]],
  requireRowOrder: false,
  hints: [
    "You want the single lowest value in that column, not a list sorted by it.",
    "MIN() does exactly that, in one step, no ORDER BY or LIMIT required.",
    "Try: SELECT MIN(budget_usd) AS min_budget FROM projects;",
  ],
  xpAward: 75,
};
