import type { Mission } from "../missions/level001";

export const sa037: Mission = {
  id: "sa-ticket-037",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-037 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "09:00 AM. Priority: High.",
    "\"New module \u2014 executive ad-hoc. Start with month-over-month growth. LAG(revenue) gets the prior month's value. (current\u2212prior)/prior\u00d7100 is the growth rate. Month 7 (Jul) shows negative MoM \u2014 the July dip.\"",
  ],
  objective:
    "For each month, show month_num, month_label, revenue, prior month revenue, and MoM growth percentage (1 decimal) \u2014 sorted by month_num.",
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
  expectedColumns: ["month_num", "month_label", "revenue", "prev_rev", "mom_growth_pct"],
  expectedRows: [
    [1, "Jan", 42000, null, null],
    [2, "Feb", 45000, 42000, 7.1],
    [3, "Mar", 48000, 45000, 6.7],
    [4, "Apr", 50000, 48000, 4.2],
    [5, "May", 53000, 50000, 6],
    [6, "Jun", 56000, 53000, 5.7],
    [7, "Jul", 55000, 56000, -1.8],
    [8, "Aug", 59000, 55000, 7.3],
    [9, "Sep", 62000, 59000, 5.1],
    [10, "Oct", 65000, 62000, 4.8],
    [11, "Nov", 68000, 65000, 4.6],
    [12, "Dec", 72000, 68000, 5.9],
  ],
  requireRowOrder: true,
  hints: [
    "LAG(revenue) OVER (ORDER BY month_num) in a CTE, then (revenue-prev_rev)/prev_rev*100 in the outer SELECT.",
    "Try: WITH prev AS (SELECT month_num, month_label, revenue, LAG(revenue) OVER (ORDER BY month_num) AS prev_rev FROM monthly_sales) SELECT ..., ROUND(100.0*(revenue-prev_rev)/prev_rev,1) AS mom_growth_pct FROM prev ORDER BY month_num;",
  ],
  xpAward: 225,
};
