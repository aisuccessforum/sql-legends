import type { Mission } from "../missions/level001";

export const pa005: Mission = {
  id: "pa-ticket-005",
  world: "AstraMind Analytics",
  levelLabel: "Ticket PA-005 // Priority: Medium",
  npc: "CHIEF DATA OFFICER ISHAAN VERMA",
  briefing: ["11:20 AM. Executive floor, CDO's office. Priority: Medium.", "Finance wants to know whether the better conversion rate also means more money. Verma asks for value metrics a CFO would accept.", "\"Revenue per visitor, and average order value, per campaign.\"", "\"Two decimals. Total revenue divided by the right denominator each time.\""],
  objective: "For each campaign return campaign, revenue_per_visitor (total revenue / total visitors) and aov (total revenue / total conversions), both rounded to 2 decimals, ordered by campaign.",
  schemaLabel: "campaign_results",
  seedSql: "CREATE TABLE campaign_results (campaign TEXT, segment TEXT, visitors INTEGER, conversions INTEGER, revenue REAL);\nINSERT INTO campaign_results (campaign, segment, visitors, conversions, revenue) VALUES\n  ('Campaign A', 'mobile', 200, 20, 1800.0),\n  ('Campaign A', 'desktop', 800, 160, 19200.0),\n  ('Campaign B', 'mobile', 800, 100, 8500.0),\n  ('Campaign B', 'desktop', 200, 50, 6500.0);\nCREATE TABLE monthly_kpis (month TEXT, active_customers INTEGER, orders INTEGER, revenue REAL);\nINSERT INTO monthly_kpis (month, active_customers, orders, revenue) VALUES\n  ('2026-01', 1200, 1800, 90000.0),\n  ('2026-02', 1260, 1950, 98000.0),\n  ('2026-03', 1310, 2010, 104500.0),\n  ('2026-04', 1290, 2000, 100600.0),\n  ('2026-05', 1380, 2210, 114900.0),\n  ('2026-06', 1450, 2320, 124000.0),\n  ('2026-07', 1440, 2290, 120500.0),\n  ('2026-08', 1520, 2500, 136000.0);",
  schemaPreview: [{"table": "campaign_results", "columns": ["campaign", "segment", "visitors", "conversions", "revenue"]}],
  expectedColumns: ["campaign", "revenue_per_visitor", "aov"],
  expectedRows: [["Campaign A", 21.0, 116.67], ["Campaign B", 15.0, 100.0]],
  requireRowOrder: true,
  hints: ["Revenue per visitor divides by visitors; AOV divides by conversions.", "Aggregate with SUM first, then divide. Do not average the per-row ratios.", "ROUND(SUM(revenue)/SUM(visitors),2) and ROUND(SUM(revenue)/SUM(conversions),2)."],
  xpAward: 125,
};
