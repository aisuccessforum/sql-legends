import type { Mission } from "../missions/level001";

export const sa027: Mission = {
  id: "sa-ticket-027",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-027 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "10:30 AM.",
    "\"Intercept (\u03b2\u2080) \u2014 where the line crosses the y-axis. \u03b2\u2080 = mean_y \u2212 \u03b2\u2081 \u00d7 mean_x. The intercept is the predicted revenue for month 0 (before the data window). Together with slope, you have the full regression line: \u0177 = \u03b2\u2080 + \u03b2\u2081\u00b7x.\"",
  ],
  objective:
    "Return the slope and intercept of the regression line, both rounded to 2 decimals.",
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
  expectedColumns: ["slope", "intercept"],
  expectedRows: [
    [2562.94, 39590.91],
  ],
  requireRowOrder: false,
  hints: [
    "Build a stats subquery: n, sum_x, sum_y, sum_xy, sum_x2. Slope = (n*sum_xy - sum_x*sum_y)/(n*sum_x2 - sum_x^2).",
    "Try: WITH agg AS (SELECT COUNT(*) AS n, SUM(month_num) AS sx, SUM(revenue) AS sy,              ...",
  ],
  xpAward: 250,
};
