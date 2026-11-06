import type { Mission } from "../missions/level001";

export const pa001: Mission = {
  id: "pa-ticket-001",
  world: "AstraMind Analytics",
  levelLabel: "Ticket PA-001 // Priority: Medium",
  npc: "CHIEF DATA OFFICER ISHAAN VERMA",
  briefing: ["09:10 AM. Executive floor, CDO's office. Priority: Medium.", "Chief Data Officer Ishaan Verma has two campaign summaries open side by side and a board meeting at noon. No small talk.", "\"Marketing says both campaigns 'performed'. I want one honest number per campaign: conversions divided by visitors, pooled across every segment.\"", "\"Percentage, one decimal. Don't average anything yet.\""],
  objective: "For each campaign, return the pooled conversion rate as a percentage (total conversions / total visitors) rounded to 1 decimal, in the column conv_rate_pct.",
  schemaLabel: "campaign_results",
  seedSql: "CREATE TABLE campaign_results (campaign TEXT, segment TEXT, visitors INTEGER, conversions INTEGER, revenue REAL);\nINSERT INTO campaign_results (campaign, segment, visitors, conversions, revenue) VALUES\n  ('Campaign A', 'mobile', 200, 20, 1800.0),\n  ('Campaign A', 'desktop', 800, 160, 19200.0),\n  ('Campaign B', 'mobile', 800, 100, 8500.0),\n  ('Campaign B', 'desktop', 200, 50, 6500.0);\nCREATE TABLE monthly_kpis (month TEXT, active_customers INTEGER, orders INTEGER, revenue REAL);\nINSERT INTO monthly_kpis (month, active_customers, orders, revenue) VALUES\n  ('2026-01', 1200, 1800, 90000.0),\n  ('2026-02', 1260, 1950, 98000.0),\n  ('2026-03', 1310, 2010, 104500.0),\n  ('2026-04', 1290, 2000, 100600.0),\n  ('2026-05', 1380, 2210, 114900.0),\n  ('2026-06', 1450, 2320, 124000.0),\n  ('2026-07', 1440, 2290, 120500.0),\n  ('2026-08', 1520, 2500, 136000.0);",
  schemaPreview: [{"table": "campaign_results", "columns": ["campaign", "segment", "visitors", "conversions", "revenue"]}],
  expectedColumns: ["campaign", "conv_rate_pct"],
  expectedRows: [["Campaign A", 18.0], ["Campaign B", 15.0]],
  requireRowOrder: true,
  hints: ["Pool first: SUM(conversions) and SUM(visitors) per campaign.", "Multiply by 100.0 before dividing so SQLite does decimal division.", "Try: SELECT campaign, ROUND(100.0*SUM(conversions)/SUM(visitors),1) AS conv_rate_pct FROM campaign_results GROUP BY campaign;"],
  xpAward: 125,
};
