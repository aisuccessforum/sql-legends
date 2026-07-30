import type { Mission } from "./level001";

export const level034: Mission = {
  id: "intern-ticket-034",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-034 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "02:40 PM. Internal system. Priority: High.",
    "\"I don't want three separate queries for this — leadership wants it all on one line. For active projects: how many there are, their average budget, and the biggest one among them.\"",
    "\"You can put more than one aggregate function in the same SELECT. They all summarize the same filtered set of rows.\"",
  ],
  objective:
    "For active projects, select the count, average budget, and maximum budget in a single query, labeling them active_count, avg_active_budget, and max_active_budget.",
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
  expectedColumns: ["active_count", "avg_active_budget", "max_active_budget"],
  expectedRows: [[4, 49500, 77000]],
  requireRowOrder: false,
  hints: [
    "One WHERE clause, three aggregate functions, all in the same SELECT list, separated by commas.",
    "Each aggregate gets its own alias so the result has three clearly labeled columns.",
    "Try: SELECT COUNT(*) AS active_count, AVG(budget_usd) AS avg_active_budget, MAX(budget_usd) AS max_active_budget FROM projects WHERE status = 'active';",
  ],
  xpAward: 75,
};
