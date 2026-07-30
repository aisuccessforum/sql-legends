import type { Mission } from "./level001";

export const level031: Mission = {
  id: "intern-ticket-031",
  world: "AstraMind Analytics",
  levelLabel: "Ticket INT-031 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "12:30 PM. Internal system. Priority: Medium.",
    "\"For projects that actually finish, how many hours does it typically take? Completed projects only — anything still active or cancelled would skew it.\"",
  ],
  objective:
    "Calculate the average hours logged on projects whose status is 'completed', labeling the result as avg_hours_completed.",
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
  expectedColumns: ["avg_hours_completed"],
  expectedRows: [[262.5]],
  requireRowOrder: false,
  hints: [
    "Filter down to the right rows first, exactly like you would for COUNT or SUM.",
    "The average can land on a decimal — that's expected here, not a mistake.",
    "Try: SELECT AVG(hours_logged) AS avg_hours_completed FROM projects WHERE status = 'completed';",
  ],
  xpAward: 75,
};
