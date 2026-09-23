import type { Mission } from "../missions/level001";

export const sa041: Mission = {
  id: "sa-ticket-041",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-041 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:00 PM.",
    "\"Rolling 3-month average \u2014 smooths month-to-month noise. ROWS BETWEEN 2 PRECEDING AND CURRENT ROW includes the current and prior two months. The result is a trend line that dampens spikes like the July dip.\"",
  ],
  objective:
    "For each month, show month_num, month_label, revenue, and the rolling 3-month average revenue (0 decimals) \u2014 sorted by month_num.",
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
  expectedColumns: ["month_num", "month_label", "revenue", "rolling_3m_avg"],
  expectedRows: [
    [1, "Jan", 42000, 42000],
    [2, "Feb", 45000, 43500],
    [3, "Mar", 48000, 45000],
    [4, "Apr", 50000, 47667],
    [5, "May", 53000, 50333],
    [6, "Jun", 56000, 53000],
    [7, "Jul", 55000, 54667],
    [8, "Aug", 59000, 56667],
    [9, "Sep", 62000, 58667],
    [10, "Oct", 65000, 62000],
    [11, "Nov", 68000, 65000],
    [12, "Dec", 72000, 68333],
  ],
  requireRowOrder: true,
  hints: [
    "AVG(revenue) OVER (ORDER BY month_num ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) \u2014 this frame includes the current row and 2 before it.",
    "Try: WITH mo AS (SELECT month_num, month_label, revenue, ROUND(AVG(revenue) OVER (ORDER BY month_num ROWS BETWEEN 2 PRECEDING AND CURRENT ROW),0) AS rolling_3m_avg FROM monthly_sales) SELECT * FROM mo ORDER BY month_num;",
  ],
  xpAward: 250,
};
