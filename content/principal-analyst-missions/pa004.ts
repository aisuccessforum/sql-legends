import type { Mission } from "../missions/level001";

export const pa004: Mission = {
  id: "pa-ticket-004",
  world: "AstraMind Analytics",
  levelLabel: "Ticket PA-004 // Priority: High",
  npc: "CHIEF DATA OFFICER ISHAAN VERMA",
  briefing: ["10:50 AM. Executive floor, CDO's office. Priority: High.", "So Campaign B wins in both segments, but loses overall. This is Simpson's paradox. Verma wants the arithmetic on the table before anyone tells the board a story.", "\"Show me two numbers per campaign: the simple average of its segment rates, and the pooled rate.\"", "\"If they differ, the reader has to understand why.\""],
  objective: "For each campaign return campaign, simple_avg_pct (the plain average of its segment conversion rates, 1 decimal) and pooled_pct (total conversions / total visitors x 100, 1 decimal), ordered by campaign.",
  schemaLabel: "campaign_results",
  seedSql: "CREATE TABLE campaign_results (campaign TEXT, segment TEXT, visitors INTEGER, conversions INTEGER, revenue REAL);\nINSERT INTO campaign_results (campaign, segment, visitors, conversions, revenue) VALUES\n  ('Campaign A', 'mobile', 200, 20, 1800.0),\n  ('Campaign A', 'desktop', 800, 160, 19200.0),\n  ('Campaign B', 'mobile', 800, 100, 8500.0),\n  ('Campaign B', 'desktop', 200, 50, 6500.0);\nCREATE TABLE monthly_kpis (month TEXT, active_customers INTEGER, orders INTEGER, revenue REAL);\nINSERT INTO monthly_kpis (month, active_customers, orders, revenue) VALUES\n  ('2026-01', 1200, 1800, 90000.0),\n  ('2026-02', 1260, 1950, 98000.0),\n  ('2026-03', 1310, 2010, 104500.0),\n  ('2026-04', 1290, 2000, 100600.0),\n  ('2026-05', 1380, 2210, 114900.0),\n  ('2026-06', 1450, 2320, 124000.0),\n  ('2026-07', 1440, 2290, 120500.0),\n  ('2026-08', 1520, 2500, 136000.0);",
  schemaPreview: [{"table": "campaign_results", "columns": ["campaign", "segment", "visitors", "conversions", "revenue"]}],
  expectedColumns: ["campaign", "simple_avg_pct", "pooled_pct"],
  expectedRows: [["Campaign A", 15.0, 18.0], ["Campaign B", 18.8, 15.0]],
  requireRowOrder: true,
  hints: ["The simple average is AVG of the per-row rates; the pooled rate divides totals.", "Both can come from one GROUP BY campaign query.", "AVG(100.0*conversions/visitors) versus 100.0*SUM(conversions)/SUM(visitors)."],
  xpAward: 150,
};
