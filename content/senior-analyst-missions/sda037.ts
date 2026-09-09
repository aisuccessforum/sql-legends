import type { Mission } from "../missions/level001";

export const sda037: Mission = {
  id: "sda-ticket-037",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-037 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "12:00 PM. Internal system. Priority: Medium.",
    "\"One dashboard number: market coverage. How many combinations are possible, how many have at least one deal, and what percentage is covered.\"",
  ],
  objective:
    "In a single row, show the possible combination count, the covered combination count, and the coverage percentage (rounded to 1 decimal).",
  schemaLabel: "regions, products, deals",
  seedSql: `
    CREATE TABLE regions (region TEXT);
    INSERT INTO regions (region) VALUES ('East'), ('North'), ('South'), ('West');
    CREATE TABLE products (product TEXT);
    INSERT INTO products (product) VALUES ('Basic'), ('Enterprise'), ('Pro');
    CREATE TABLE deals (
      id INTEGER PRIMARY KEY,
      region TEXT,
      product TEXT,
      amount INTEGER
    );
    INSERT INTO deals (id, region, product, amount) VALUES
      (1, 'East', 'Basic', 12000),
      (2, 'East', 'Pro', 30000),
      (3, 'East', 'Basic', 8000),
      (4, 'North', 'Enterprise', 95000),
      (5, 'North', 'Pro', 27000),
      (6, 'South', 'Basic', 15000),
      (7, 'West', 'Pro', 33000),
      (8, 'West', 'Enterprise', 88000),
      (9, 'West', 'Pro', 21000);
  `,
  schemaPreview: [
    { table: "regions", columns: ["region"] },
    { table: "products", columns: ["product"] },
    { table: "deals", columns: ["id", "region", "product", "amount"] },
  ],
  expectedColumns: ["possible_combos", "covered_combos", "coverage_pct"],
  expectedRows: [
    [12, 7, 58.3],
  ],
  requireRowOrder: false,
  hints: [
    "Possible is just the two reference-table counts multiplied; covered is a COUNT over the DISTINCT region-product pairs that actually appear in deals.",
    "Each piece can be a scalar subquery, exactly like the audit dashboard row you built earlier this rank.",
    "Try: SELECT (SELECT COUNT(*) FROM regions) * (SELECT COUNT(*) FROM products) AS possible_combos, (SELECT COUNT(*) FROM (SELECT DISTINCT region, product FROM deals)) AS covered_combos, ROUND(100.0 * (SELECT COUNT(*) FROM (SELECT DISTINCT region, product FROM deals)) / ((SELECT COUNT(*) FROM regions) * (SELECT COUNT(*) FROM products)), 1) AS coverage_pct;",
  ],
  xpAward: 275,
};
