import type { Mission } from "../missions/level001";

export const sa003: Mission = {
  id: "sa-ticket-003",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-003 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "10:30 AM.",
    "\"Coefficient of variation \u2014 the dimensionless spread metric. CV = stddev / mean \u00d7 100. A CV of 20-30% means the team is dispersed but not wildly inconsistent. Compare it across products or regions in the same SELECT.\"",
  ],
  objective:
    "Return the mean revenue (0 decimals), population standard deviation (2 decimals), and CV percentage (2 decimals).",
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
  expectedColumns: ["mean_rev", "stddev", "cv_pct"],
  expectedRows: [
    [72500, 22419.86, 30.92],
  ],
  requireRowOrder: false,
  hints: [
    "Hint 1: WITH s AS (SELECT ROUND(AVG(revenue),0) AS mean_rev, ROUND(S...",
    "Try: WITH s AS (SELECT ROUND(AVG(revenue),0) AS mean_rev, ROUND(SQRT(SUM(revenue*revenue)*1.0/COUNT(*)-AVG(revenue)*AVG(revenue)),2) AS stddev FROM sales_reps) SELECT mean_rev, stddev, ROUND(100.0*stddev/mean_rev,2) AS cv_pct FROM s;",
  ],
  xpAward: 225,
};
