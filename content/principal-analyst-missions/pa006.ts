import type { Mission } from "../missions/level001";

export const pa006: Mission = {
  id: "pa-ticket-006",
  world: "AstraMind Analytics",
  levelLabel: "Ticket PA-006 // Priority: High",
  npc: "CHIEF DATA OFFICER ISHAAN VERMA",
  briefing: ["02:00 PM. Finance sync, Conference Room 4. Priority: High.", "The CFO wants to know why revenue grew. 'Because sales grew' is not an answer in this room. Verma wants the KPI tree: revenue = customers x orders per customer x average order value.", "\"For each month after the first, give me customer growth, orders per customer, AOV and revenue growth. Each growth rate is against the previous month.\"", "\"I want to see which branch of the tree is moving.\""],
  objective: "For every month except the first return month, customer_growth_pct (active customers vs previous month, 1 decimal), orders_per_customer (orders / active customers, 2 decimals), aov (revenue / orders, 2 decimals) and revenue_growth_pct (revenue vs previous month, 1 decimal), ordered by month.",
  schemaLabel: "monthly_kpis",
  seedSql: "CREATE TABLE campaign_results (campaign TEXT, segment TEXT, visitors INTEGER, conversions INTEGER, revenue REAL);\nINSERT INTO campaign_results (campaign, segment, visitors, conversions, revenue) VALUES\n  ('Campaign A', 'mobile', 200, 20, 1800.0),\n  ('Campaign A', 'desktop', 800, 160, 19200.0),\n  ('Campaign B', 'mobile', 800, 100, 8500.0),\n  ('Campaign B', 'desktop', 200, 50, 6500.0);\nCREATE TABLE monthly_kpis (month TEXT, active_customers INTEGER, orders INTEGER, revenue REAL);\nINSERT INTO monthly_kpis (month, active_customers, orders, revenue) VALUES\n  ('2026-01', 1200, 1800, 90000.0),\n  ('2026-02', 1260, 1950, 98000.0),\n  ('2026-03', 1310, 2010, 104500.0),\n  ('2026-04', 1290, 2000, 100600.0),\n  ('2026-05', 1380, 2210, 114900.0),\n  ('2026-06', 1450, 2320, 124000.0),\n  ('2026-07', 1440, 2290, 120500.0),\n  ('2026-08', 1520, 2500, 136000.0);",
  schemaPreview: [{"table": "monthly_kpis", "columns": ["month", "active_customers", "orders", "revenue"]}],
  expectedColumns: ["month", "customer_growth_pct", "orders_per_customer", "aov", "revenue_growth_pct"],
  expectedRows: [["2026-02", 5.0, 1.55, 50.26, 8.9], ["2026-03", 4.0, 1.53, 51.99, 6.6], ["2026-04", -1.5, 1.55, 50.3, -3.7], ["2026-05", 7.0, 1.6, 51.99, 14.2], ["2026-06", 5.1, 1.6, 53.45, 7.9], ["2026-07", -0.7, 1.59, 52.62, -2.8], ["2026-08", 5.6, 1.64, 54.4, 12.9]],
  requireRowOrder: true,
  hints: ["LAG(...) OVER (ORDER BY month) brings the previous month's value onto each row.", "Compute in a CTE, then filter out the first month where LAG is NULL.", "growth % = 100.0*(current - previous)/previous"],
  xpAward: 150,
};
