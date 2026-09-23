import type { Mission } from "../missions/level001";

export const sa004: Mission = {
  id: "sa-ticket-004",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-004 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "11:15 AM.",
    "\"Z-score \u2014 how many standard deviations from the mean is each rep? z = (x \u2212 \u03bc) / \u03c3. Z > 2: outlier-high. Z < \u22122: outlier-low. Build a CTE for the mean and stddev, then apply it per rep.\"",
  ],
  objective:
    "Show each rep's name, revenue, and z-score (2 decimals) \u2014 sorted by z-score descending.",
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
  expectedColumns: ["rep_name", "revenue", "z_score"],
  expectedRows: [
    ["Grace", 105000, 1.45],
    ["Alice", 95000, 1],
    ["Carol", 94000, 0.96],
    ["Iris", 88000, 0.69],
    ["Eve", 78000, 0.25],
    ["Henry", 71000, -0.07],
    ["Bob", 62000, -0.47],
    ["David", 54000, -0.83],
    ["Frank", 43000, -1.32],
    ["Jack", 35000, -1.67],
  ],
  requireRowOrder: true,
  hints: [
    "Hint 1: WITH s AS (SELECT AVG(revenue) AS m, SQRT(SUM(revenue*revenu...",
    "Try: WITH s AS (SELECT AVG(revenue) AS m, SQRT(SUM(revenue*revenue)*1.0/COUNT(*)-AVG(revenue)*AVG(revenue)) AS sd FROM sales_reps) SELECT rep_name, revenue, ROUND((revenue-m)/sd,2) AS z_score FROM sales_reps, s ORDER BY z_score DESC;",
  ],
  xpAward: 250,
};
