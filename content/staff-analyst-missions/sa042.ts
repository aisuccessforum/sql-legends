import type { Mission } from "../missions/level001";

export const sa042: Mission = {
  id: "sa-ticket-042",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-042 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:45 PM.",
    "\"Revenue forecast \u2014 extend the regression line into months 13, 14, 15. The model doesn't know Q5 exists but the line gives a defensible baseline. Combine with your judgment about seasonality. This is what analysts present in planning cycles.\"",
  ],
  objective:
    "Return the forecast revenue for months 13, 14, and 15 based on the linear regression of monthly_sales \u2014 showing forecast_month and forecast_revenue (0 decimals).",
  schemaLabel: "monthly_sales",
  seedSql: `
  CREATE TABLE monthly_sales (month_num INTEGER, month_label TEXT, revenue REAL, users INTEGER);
  INSERT INTO monthly_sales VALUES
    (1,'Jan',42000,420),(2,'Feb',45000,450),(3,'Mar',48000,480),
    (4,'Apr',50000,510),(5,'May',53000,540),(6,'Jun',56000,565),
    (7,'Jul',55000,555),(8,'Aug',59000,590),(9,'Sep',62000,620),
    (10,'Oct',65000,655),(11,'Nov',68000,685),(12,'Dec',72000,720);
`,
  schemaPreview: [{ table: "monthly_sales", columns: ["month_num","month_label","revenue","users"] }],
  expectedColumns: ["forecast_month", "forecast_revenue"],
  expectedRows: [
    [13, 72909],
    [14, 75472],
    [15, 78035],
  ],
  requireRowOrder: true,
  hints: [
    "Build the slope/intercept CTE from the regression module, then JOIN to a VALUES row set of (13, 14, 15) to compute \u0177 = slope*x + intercept for each future month.",
    "Try: WITH agg/p CTEs for slope+intercept, SELECT 13 UNION SELECT 14 UNION SELECT 15 AS the month_num source, then ROUND(slope*month_num+intercept,0) AS forecast_revenue;",
  ],
  xpAward: 275,
};
