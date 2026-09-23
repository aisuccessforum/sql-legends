import type { Mission } from "../missions/level001";

export const sa007: Mission = {
  id: "sa-ticket-007",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-007 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "01:30 PM.",
    "\"Revenue rank plus running total. RANK() puts reps in performance order; SUM() OVER (ORDER BY revenue DESC) accumulates from the top. Running total lets you ask: 'which two reps account for X% of total revenue?'\"",
  ],
  objective:
    "Show each rep's name, region, revenue, their rank by revenue, and the running revenue total from the top \u2014 sorted by rank.",
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
  expectedColumns: ["rep_name", "region", "revenue", "rev_rank", "running_total"],
  expectedRows: [
    ["Grace", "East", 105000, 1, 105000],
    ["Alice", "North", 95000, 2, 200000],
    ["Carol", "East", 94000, 3, 294000],
    ["Iris", "North", 88000, 4, 382000],
    ["Eve", "North", 78000, 5, 460000],
    ["Henry", "West", 71000, 6, 531000],
    ["Bob", "South", 62000, 7, 593000],
    ["David", "West", 54000, 8, 647000],
    ["Frank", "South", 43000, 9, 690000],
    ["Jack", "South", 35000, 10, 725000],
  ],
  requireRowOrder: true,
  hints: [
    "Hint 1: SELECT rep_name, region, revenue, RANK() OVER (ORDER BY reve...",
    "Try: SELECT rep_name, region, revenue, RANK() OVER (ORDER BY revenue DESC) AS rev_rank, SUM(revenue) OVER (ORDER BY revenue DESC) AS running_total FROM sales_reps ORDER BY rev_rank;",
  ],
  xpAward: 250,
};
