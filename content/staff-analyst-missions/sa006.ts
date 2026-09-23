import type { Mission } from "../missions/level001";

export const sa006: Mission = {
  id: "sa-ticket-006",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-006 // Priority: Medium",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "12:45 PM.",
    "\"Revenue efficiency \u2014 revenue per call. Same revenue as another rep but fewer calls means higher efficiency. Rank the team by this metric to find who to clone.\"",
  ],
  objective:
    "Show each rep's ID, name, revenue, calls, and revenue per call (0 decimals) \u2014 sorted by revenue per call descending.",
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
  expectedColumns: ["rep_id", "rep_name", "revenue", "calls", "rev_per_call"],
  expectedRows: [
    ["R01", "Alice", 95000, 125, 760],
    ["R07", "Grace", 105000, 150, 700],
    ["R05", "Eve", 78000, 115, 678],
    ["R09", "Iris", 88000, 130, 677],
    ["R08", "Henry", 71000, 105, 676],
    ["R03", "Carol", 94000, 140, 671],
    ["R02", "Bob", 62000, 95, 653],
    ["R04", "David", 54000, 88, 614],
    ["R06", "Frank", 43000, 72, 597],
    ["R10", "Jack", 35000, 60, 583],
  ],
  requireRowOrder: true,
  hints: [
    "Hint 1: SELECT rep_id, rep_name, revenue, calls, ROUND(1.0*revenue/c...",
    "Try: SELECT rep_id, rep_name, revenue, calls, ROUND(1.0*revenue/calls,0) AS rev_per_call FROM sales_reps ORDER BY rev_per_call DESC;",
  ],
  xpAward: 200,
};
