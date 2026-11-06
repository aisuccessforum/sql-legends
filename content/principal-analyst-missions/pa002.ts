import type { Mission } from "../missions/level001";

export const pa002: Mission = {
  id: "pa-ticket-002",
  world: "AstraMind Analytics",
  levelLabel: "Ticket PA-002 // Priority: Medium",
  npc: "CHIEF DATA OFFICER ISHAAN VERMA",
  briefing: ["09:40 AM. Executive floor, CDO's office. Priority: Medium.", "Verma taps the pooled numbers. Campaign A is ahead. The Head of Growth is not convinced and has asked for the same rate broken down by device.", "\"Same metric, but per campaign and per segment. Mobile and desktop behave differently and I want to see it.\"", "\"Sort by segment, then campaign.\""],
  objective: "Return campaign, segment and conv_rate_pct (conversions / visitors x 100, 1 decimal) for every campaign-segment row, ordered by segment then campaign.",
  schemaLabel: "campaign_results",
  seedSql: "CREATE TABLE campaign_results (campaign TEXT, segment TEXT, visitors INTEGER, conversions INTEGER, revenue REAL);\nINSERT INTO campaign_results (campaign, segment, visitors, conversions, revenue) VALUES\n  ('Campaign A', 'mobile', 200, 20, 1800.0),\n  ('Campaign A', 'desktop', 800, 160, 19200.0),\n  ('Campaign B', 'mobile', 800, 100, 8500.0),\n  ('Campaign B', 'desktop', 200, 50, 6500.0);\nCREATE TABLE monthly_kpis (month TEXT, active_customers INTEGER, orders INTEGER, revenue REAL);\nINSERT INTO monthly_kpis (month, active_customers, orders, revenue) VALUES\n  ('2026-01', 1200, 1800, 90000.0),\n  ('2026-02', 1260, 1950, 98000.0),\n  ('2026-03', 1310, 2010, 104500.0),\n  ('2026-04', 1290, 2000, 100600.0),\n  ('2026-05', 1380, 2210, 114900.0),\n  ('2026-06', 1450, 2320, 124000.0),\n  ('2026-07', 1440, 2290, 120500.0),\n  ('2026-08', 1520, 2500, 136000.0);",
  schemaPreview: [{"table": "campaign_results", "columns": ["campaign", "segment", "visitors", "conversions", "revenue"]}],
  expectedColumns: ["campaign", "segment", "conv_rate_pct"],
  expectedRows: [["Campaign A", "desktop", 20.0], ["Campaign B", "desktop", 25.0], ["Campaign A", "mobile", 10.0], ["Campaign B", "mobile", 12.5]],
  requireRowOrder: true,
  hints: ["Each row is already one campaign-segment pair, so no GROUP BY is needed.", "The rate is 100.0*conversions/visitors, rounded to 1 decimal.", "Add ORDER BY segment, campaign at the end."],
  xpAward: 125,
};
