import type { Mission } from "../missions/level001";

export const sa038: Mission = {
  id: "sa-ticket-038",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-038 // Priority: Medium",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "09:45 AM.",
    "\"Revenue per user by month \u2014 are you growing revenue by adding users, or by monetising each user better? If rev_per_user is flat while revenue grows, it's a volume story. If rev_per_user climbs, it's a monetisation win.\"",
  ],
  objective:
    "For each month, show month_num, month_label, revenue, users, and revenue per user (2 decimals) \u2014 sorted by month_num.",
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
  expectedColumns: ["month_num", "month_label", "revenue", "users", "rev_per_user"],
  expectedRows: [
    [1, "Jan", 42000, 420, 100],
    [2, "Feb", 45000, 450, 100],
    [3, "Mar", 48000, 480, 100],
    [4, "Apr", 50000, 510, 98.04],
    [5, "May", 53000, 540, 98.15],
    [6, "Jun", 56000, 565, 99.12],
    [7, "Jul", 55000, 555, 99.1],
    [8, "Aug", 59000, 590, 100],
    [9, "Sep", 62000, 620, 100],
    [10, "Oct", 65000, 655, 99.24],
    [11, "Nov", 68000, 685, 99.27],
    [12, "Dec", 72000, 720, 100],
  ],
  requireRowOrder: true,
  hints: [
    "ROUND(1.0*revenue/users, 2) \u2014 the 1.0 forces float division in SQLite.",
    "Try: SELECT month_num, month_label, revenue, users, ROUND(1.0*revenue/users,2) AS rev_per_user FROM monthly_sales ORDER BY month_num;",
  ],
  xpAward: 200,
};
