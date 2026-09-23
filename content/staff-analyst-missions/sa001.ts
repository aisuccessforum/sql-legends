import type { Mission } from "../missions/level001";

export const sa001: Mission = {
  id: "sa-ticket-001",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-001 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"Staff Analyst. I'm Anika Sharma, VP of Data Science. At this level you're not running someone else's report \u2014 you're answering questions nobody asked yet.\"",
    "\"Start here: descriptive statistics on the sales team. A summary row that captures count, mean, range. Every senior analyst knows these numbers cold.\"",
  ],
  objective:
    "In a single row, show the count of reps, mean revenue (0 decimals), minimum revenue, maximum revenue, and revenue range.",
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
  expectedColumns: ["n", "mean_rev", "min_rev", "max_rev", "range_rev"],
  expectedRows: [
    [10, 72500, 35000, 105000, 70000],
  ],
  requireRowOrder: false,
  hints: [
    "Hint 1: SELECT COUNT(*) AS n, ROUND(AVG(revenue),0) AS mean_rev, MIN...",
    "Try: SELECT COUNT(*) AS n, ROUND(AVG(revenue),0) AS mean_rev, MIN(revenue) AS min_rev, MAX(revenue) AS max_rev, MAX(revenue)-MIN(revenue) AS range_rev FROM sales_reps;",
  ],
  xpAward: 200,
};
