import type { Mission } from "../missions/level001";

export const sa026: Mission = {
  id: "sa-ticket-026",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-026 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "09:45 AM.",
    "\"Slope (\u03b2\u2081) \u2014 the monthly revenue increase. Formula: (n\u00b7\u03a3xy \u2212 \u03a3x\u00b7\u03a3y) / (n\u00b7\u03a3x\u00b2 \u2212 (\u03a3x)\u00b2). This tells you: for every additional month, revenue increases by \u03b2\u2081 dollars. If the trend is linear, this number is your growth rate.\"",
  ],
  objective:
    "Return the slope of the revenue-vs-month regression line, rounded to 2 decimals.",
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
  expectedColumns: ["slope"],
  expectedRows: [
    [2562.94],
  ],
  requireRowOrder: false,
  hints: [
    "Build a stats subquery: n, sum_x, sum_y, sum_xy, sum_x2. Slope = (n*sum_xy - sum_x*sum_y)/(n*sum_x2 - sum_x^2).",
    "Try: SELECT ROUND((n*sum_xy-sum_x*sum_y)*1.0/(n*sum_x2-sum_x*sum_x),2) AS slope FROM (SELECT CO...",
  ],
  xpAward: 250,
};
