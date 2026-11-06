import type { Mission } from "../missions/level001";

export const pa003: Mission = {
  id: "pa-ticket-003",
  world: "AstraMind Analytics",
  levelLabel: "Ticket PA-003 // Priority: High",
  npc: "CHIEF DATA OFFICER ISHAAN VERMA",
  briefing: ["10:15 AM. Executive floor, CDO's office. Priority: High.", "Verma looks at the two tables and goes quiet. Campaign A wins overall. Yet the segment table does not seem to agree with that.", "\"Something is off. For each segment, which campaign has the higher conversion rate?\"", "\"Give me the segment, the winning campaign and its rate. One row per segment.\""],
  objective: "For each segment return segment, winner (the campaign with the higher conversion rate in that segment) and conv_rate_pct (1 decimal), ordered by segment.",
  schemaLabel: "campaign_results",
  seedSql: "CREATE TABLE campaign_results (campaign TEXT, segment TEXT, visitors INTEGER, conversions INTEGER, revenue REAL);\nINSERT INTO campaign_results (campaign, segment, visitors, conversions, revenue) VALUES\n  ('Campaign A', 'mobile', 200, 20, 1800.0),\n  ('Campaign A', 'desktop', 800, 160, 19200.0),\n  ('Campaign B', 'mobile', 800, 100, 8500.0),\n  ('Campaign B', 'desktop', 200, 50, 6500.0);\nCREATE TABLE monthly_kpis (month TEXT, active_customers INTEGER, orders INTEGER, revenue REAL);\nINSERT INTO monthly_kpis (month, active_customers, orders, revenue) VALUES\n  ('2026-01', 1200, 1800, 90000.0),\n  ('2026-02', 1260, 1950, 98000.0),\n  ('2026-03', 1310, 2010, 104500.0),\n  ('2026-04', 1290, 2000, 100600.0),\n  ('2026-05', 1380, 2210, 114900.0),\n  ('2026-06', 1450, 2320, 124000.0),\n  ('2026-07', 1440, 2290, 120500.0),\n  ('2026-08', 1520, 2500, 136000.0);",
  schemaPreview: [{"table": "campaign_results", "columns": ["campaign", "segment", "visitors", "conversions", "revenue"]}],
  expectedColumns: ["segment", "winner", "conv_rate_pct"],
  expectedRows: [["desktop", "Campaign B", 25.0], ["mobile", "Campaign B", 12.5]],
  requireRowOrder: true,
  hints: ["Rank the campaigns inside each segment: RANK() OVER (PARTITION BY segment ORDER BY rate DESC).", "Wrap the ranking in a CTE, then keep only rank 1.", "WITH r AS (SELECT campaign, segment, 100.0*conversions/visitors AS rate, RANK() OVER (PARTITION BY segment ORDER BY 100.0*conversions/visitors DESC) rk FROM campaign_results) SELECT ... FROM r WHERE rk = 1"],
  xpAward: 150,
};
