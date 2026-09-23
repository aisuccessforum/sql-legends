import type { Mission } from "../missions/level001";

export const sa030: Mission = {
  id: "sa-ticket-030",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-030 // Priority: Critical",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:45 PM. Priority: Critical.",
    "\"Module capstone \u2014 full regression summary with forecast. Slope, intercept, Pearson r, and three forecast months (13, 14, 15) in separate rows. This is the complete trend analysis a VP asks for before a board meeting.\"",
  ],
  objective:
    "Return the slope, intercept (both 2 decimals), Pearson r (3 decimals), and predicted revenue for months 13, 14, and 15 (each 0 decimals) \u2014 one row per output column.",
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
  expectedColumns: ["slope", "intercept", "pearson_r", "forecast_m13", "forecast_m14", "forecast_m15"],
  expectedRows: [
    [2562.94, 39590.91, 0.993, 72909, 75472, 78035],
  ],
  requireRowOrder: false,
  hints: [
    "Build a stats subquery: n, sum_x, sum_y, sum_xy, sum_x2. Slope = (n*sum_xy - sum_x*sum_y)/(n*sum_x2 - sum_x^2).",
    "Try: WITH agg AS (SELECT COUNT(*) AS n, SUM(month_num) AS sx, SUM(revenue) AS sy,              ...",
  ],
  xpAward: 300,
};
