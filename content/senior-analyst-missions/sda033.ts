import type { Mission } from "../missions/level001";

export const sda033: Mission = {
  id: "sda-ticket-033",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-033 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:00 AM. Internal system. Priority: Medium.",
    "\"New module — scaffolding. Our deals table only has rows for combinations that HAPPENED. Reports built on it silently hide what didn't happen — and what didn't happen is often the story.\"",
    "\"Step one: the complete grid. CROSS JOIN pairs every row of one table with every row of another — no ON clause, because you want every combination, not matching ones.\"",
  ],
  objective:
    "Select every possible region-product combination, sorted by region then product.",
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
  expectedColumns: ["region", "product"],
  expectedRows: [
    ["East", "Basic"],
    ["East", "Enterprise"],
    ["East", "Pro"],
    ["North", "Basic"],
    ["North", "Enterprise"],
    ["North", "Pro"],
    ["South", "Basic"],
    ["South", "Enterprise"],
    ["South", "Pro"],
    ["West", "Basic"],
    ["West", "Enterprise"],
    ["West", "Pro"],
  ],
  requireRowOrder: true,
  hints: [
    "CROSS JOIN has no ON clause — 4 regions times 3 products should give exactly 12 rows.",
    "The reference tables exist precisely for this: they define what SHOULD exist, independent of what deals occurred.",
    "Try: SELECT r.region, p.product FROM regions r CROSS JOIN products p ORDER BY r.region, p.product;",
  ],
  xpAward: 225,
};
