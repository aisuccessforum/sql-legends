import type { Mission } from "../missions/level001";

export const sa028: Mission = {
  id: "sa-ticket-028",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-028 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "11:15 AM.",
    "\"Predicted values \u2014 plug each month_num into the regression line: \u0177 = \u03b2\u2080 + \u03b2\u2081\u00b7x. Show actual vs predicted side by side. You'll see the July dip (month 7) below the line \u2014 that's where residuals come from.\"",
  ],
  objective:
    "For each month, show month_num, month_label, actual revenue, and predicted revenue (0 decimals) \u2014 sorted by month_num.",
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
  expectedColumns: ["month_num", "month_label", "revenue", "predicted"],
  expectedRows: [
    [1, "Jan", 42000, 42154],
    [2, "Feb", 45000, 44717],
    [3, "Mar", 48000, 47280],
    [4, "Apr", 50000, 49843],
    [5, "May", 53000, 52406],
    [6, "Jun", 56000, 54969],
    [7, "Jul", 55000, 57531],
    [8, "Aug", 59000, 60094],
    [9, "Sep", 62000, 62657],
    [10, "Oct", 65000, 65220],
    [11, "Nov", 68000, 67783],
    [12, "Dec", 72000, 70346],
  ],
  requireRowOrder: true,
  hints: [
    "Build a stats subquery: n, sum_x, sum_y, sum_xy, sum_x2. Slope = (n*sum_xy - sum_x*sum_y)/(n*sum_x2 - sum_x^2).",
    "Try: WITH agg AS (SELECT COUNT(*) AS n, SUM(month_num) AS sx, SUM(revenue) AS sy,              ...",
  ],
  xpAward: 250,
};
