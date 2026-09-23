import type { Mission } from "../missions/level001";

export const sa008: Mission = {
  id: "sa-ticket-008",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-008 // Priority: Critical",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "02:15 PM.",
    "\"Module capstone \u2014 regional performance summary. GROUP BY region with aggregate metrics and ROUND(100.0 * SUM(revenue) / SUM(SUM(revenue)) OVER (), 1) for share of total. This is what the VP asks for on Friday afternoon.\"",
  ],
  objective:
    "For each region, show rep count, total revenue, average revenue (0 decimals), min and max, and share of total revenue (1 decimal) \u2014 sorted by total revenue descending.",
  schemaLabel: "sales_reps",
  seedSql: `
  CREATE TABLE sales_reps (rep_id TEXT, rep_name TEXT, region TEXT, revenue INTEGER, calls INTEGER, quota INTEGER);
  INSERT INTO sales_reps VALUES
    ('R01','Alice','North',95000,125,80000),('R02','Bob','South',62000,95,70000),
    ('R03','Carol','East',94000,140,85000),('R04','David','West',54000,88,60000),
    ('R05','Eve','North',78000,115,75000),('R06','Frank','South',43000,72,65000),
    ('R07','Grace','East',105000,150,90000),('R08','Henry','West',71000,105,70000),
    ('R09','Iris','North',88000,130,80000),('R10','Jack','South',35000,60,55000);
`,
  schemaPreview: [{ table: "sales_reps", columns: ["rep_id","rep_name","region","revenue","calls","quota"] }],
  expectedColumns: ["region", "reps", "total_revenue", "avg_revenue", "min_rev", "max_rev", "pct_of_total"],
  expectedRows: [
    ["North", 3, 261000, 87000, 78000, 95000, 36],
    ["East", 2, 199000, 99500, 94000, 105000, 27.4],
    ["South", 3, 140000, 46667, 35000, 62000, 19.3],
    ["West", 2, 125000, 62500, 54000, 71000, 17.2],
  ],
  requireRowOrder: true,
  hints: [
    "Hint 1: SELECT region, COUNT(*) AS reps, SUM(revenue) AS total_reven...",
    "Try: SELECT region, COUNT(*) AS reps, SUM(revenue) AS total_revenue, ROUND(AVG(revenue),0) AS avg_revenue, MIN(revenue) AS min_rev, MAX(revenue) AS max_rev, ROUND(100.0*SUM(revenue)/SUM(SUM(revenue)) OVER (),1) AS pct_of_total FROM sales_reps GROUP BY region ORDER BY total_revenue DESC;",
  ],
  xpAward: 300,
};
