import type { Mission } from "../missions/level001";

export const sa002: Mission = {
  id: "sa-ticket-002",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SA-002 // Priority: High",
  npc: "VP OF DATA SCIENCE ANIKA SHARMA",
  briefing: [
    "09:45 AM.",
    "\"Now compute the spread. Population variance and standard deviation \u2014 SQLite has no STDDEV() so we derive it from first principles: Var(X) = E[X\u00b2] \u2212 E[X]\u00b2. The computational formula \u2014 SUM(x\u00b2)/n \u2212 (SUM(x)/n)\u00b2 \u2014 avoids a second pass over the data.\"",
  ],
  objective:
    "In a single row, return the population variance (0 decimals) and population standard deviation (2 decimals) of revenue.",
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
  expectedColumns: ["pop_variance", "pop_stddev"],
  expectedRows: [
    [502650000, 22419.86],
  ],
  requireRowOrder: false,
  hints: [
    "Hint 1: SELECT ROUND(SUM(revenue*revenue)*1.0/COUNT(*) - AVG(revenue...",
    "Try: SELECT ROUND(SUM(revenue*revenue)*1.0/COUNT(*) - AVG(revenue)*AVG(revenue), 0) AS pop_variance, ROUND(SQRT(SUM(revenue*revenue)*1.0/COUNT(*) - AVG(revenue)*AVG(revenue)), 2) AS pop_stddev FROM sales_reps;",
  ],
  xpAward: 250,
};
