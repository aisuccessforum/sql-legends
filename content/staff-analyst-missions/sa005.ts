import type { Mission } from "../missions/level001";

export const sa005: Mission = {
  id: "sa-ticket-005",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-005 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:00 PM.",
    "\"Quota attainment and performance bands. Three tiers: Overachiever (\u2265 110% of quota), On Target (\u2265 quota), Below Quota. This is the table that lands in the QBR deck every quarter.\"",
  ],
  objective:
    "Show each rep's ID, name, revenue, quota, attainment percentage (1 decimal), and status band \u2014 sorted by attainment descending.",
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
  expectedColumns: ["rep_id", "rep_name", "revenue", "quota", "attainment_pct", "status"],
  expectedRows: [
    ["R01", "Alice", 95000, 80000, 118.8, "Overachiever"],
    ["R07", "Grace", 105000, 90000, 116.7, "Overachiever"],
    ["R03", "Carol", 94000, 85000, 110.6, "Overachiever"],
    ["R09", "Iris", 88000, 80000, 110, "Overachiever"],
    ["R05", "Eve", 78000, 75000, 104, "On Target"],
    ["R08", "Henry", 71000, 70000, 101.4, "On Target"],
    ["R04", "David", 54000, 60000, 90, "Below Quota"],
    ["R02", "Bob", 62000, 70000, 88.6, "Below Quota"],
    ["R06", "Frank", 43000, 65000, 66.2, "Below Quota"],
    ["R10", "Jack", 35000, 55000, 63.6, "Below Quota"],
  ],
  requireRowOrder: true,
  hints: [
    "Hint 1: SELECT rep_id, rep_name, revenue, quota, ROUND(100.0*revenue...",
    "Try: SELECT rep_id, rep_name, revenue, quota, ROUND(100.0*revenue/quota,1) AS attainment_pct, CASE WHEN revenue >= quota*1.1 THEN 'Overachiever' WHEN revenue >= quota THEN 'On Target' ELSE 'Below Quota' END AS status FROM sales_reps ORDER BY attainment_pct DESC;",
  ],
  xpAward: 225,
};
