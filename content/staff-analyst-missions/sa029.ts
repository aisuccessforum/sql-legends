import type { Mission } from "../missions/level001";

export const sa029: Mission = {
  id: "sa-ticket-029",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-029 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:00 PM.",
    "\"Residuals \u2014 actual minus predicted. Large positive residuals are months that outperformed the trend; negative residuals are below. Month 7 (July) has the biggest negative residual \u2014 a summer dip in an otherwise growing trajectory.\"",
  ],
  objective:
    "For each month, show month_num, actual revenue, predicted revenue (0 decimals), and residual (0 decimals) \u2014 sorted by month_num.",
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
  expectedColumns: ["month_num", "revenue", "predicted", "residual"],
  expectedRows: [
    [1, 42000, 42154, -154],
    [2, 45000, 44717, 283],
    [3, 48000, 47280, 720],
    [4, 50000, 49843, 157],
    [5, 53000, 52406, 594],
    [6, 56000, 54969, 1031],
    [7, 55000, 57531, -2531],
    [8, 59000, 60094, -1094],
    [9, 62000, 62657, -657],
    [10, 65000, 65220, -220],
    [11, 68000, 67783, 217],
    [12, 72000, 70346, 1654],
  ],
  requireRowOrder: true,
  hints: [
    "Build a stats subquery: n, sum_x, sum_y, sum_xy, sum_x2. Slope = (n*sum_xy - sum_x*sum_y)/(n*sum_x2 - sum_x^2).",
    "Try: WITH agg AS (SELECT COUNT(*) AS n, SUM(month_num) AS sx, SUM(revenue) AS sy,              ...",
  ],
  xpAward: 275,
};
