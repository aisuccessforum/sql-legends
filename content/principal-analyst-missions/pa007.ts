import type { Mission } from "../missions/level001";

export const pa007: Mission = {
  id: "pa-ticket-007",
  world: "AstraMind Analytics",
  levelLabel: "Ticket PA-007 // Priority: Medium",
  npc: "CHIEF DATA OFFICER ISHAAN VERMA",
  briefing: ["04:30 PM. Executive floor, CDO's office. Priority: Medium.", "To explain Simpson's paradox to the board, Verma wants to show that the two campaigns reached different audiences.", "\"What share of each campaign's visitors came from each segment?\"", "\"If the mix is very different, the pooled comparison is unfair. That is the whole story.\""],
  objective: "Return campaign, segment and visitor_share_pct (the segment's share of that campaign's total visitors, 1 decimal), ordered by campaign then segment.",
  schemaLabel: "campaign_results",
  seedSql: "CREATE TABLE campaign_results (campaign TEXT, segment TEXT, visitors INTEGER, conversions INTEGER, revenue REAL);\nINSERT INTO campaign_results (campaign, segment, visitors, conversions, revenue) VALUES\n  ('Campaign A', 'mobile', 200, 20, 1800.0),\n  ('Campaign A', 'desktop', 800, 160, 19200.0),\n  ('Campaign B', 'mobile', 800, 100, 8500.0),\n  ('Campaign B', 'desktop', 200, 50, 6500.0);\nCREATE TABLE monthly_kpis (month TEXT, active_customers INTEGER, orders INTEGER, revenue REAL);\nINSERT INTO monthly_kpis (month, active_customers, orders, revenue) VALUES\n  ('2026-01', 1200, 1800, 90000.0),\n  ('2026-02', 1260, 1950, 98000.0),\n  ('2026-03', 1310, 2010, 104500.0),\n  ('2026-04', 1290, 2000, 100600.0),\n  ('2026-05', 1380, 2210, 114900.0),\n  ('2026-06', 1450, 2320, 124000.0),\n  ('2026-07', 1440, 2290, 120500.0),\n  ('2026-08', 1520, 2500, 136000.0);",
  schemaPreview: [{"table": "campaign_results", "columns": ["campaign", "segment", "visitors", "conversions", "revenue"]}],
  expectedColumns: ["campaign", "segment", "visitor_share_pct"],
  expectedRows: [["Campaign A", "desktop", 80.0], ["Campaign A", "mobile", 20.0], ["Campaign B", "desktop", 20.0], ["Campaign B", "mobile", 80.0]],
  requireRowOrder: true,
  hints: ["A window SUM over each campaign gives the denominator without collapsing rows.", "SUM(visitors) OVER (PARTITION BY campaign)", "ROUND(100.0*visitors/SUM(visitors) OVER (PARTITION BY campaign),1)"],
  xpAward: 125,
};
