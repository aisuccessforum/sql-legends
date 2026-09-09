import type { Mission } from "../missions/level001";

export const sda035: Mission = {
  id: "sda-ticket-035",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-035 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "10:30 AM. Internal system. Priority: High.",
    "\"Sales leadership's actual question: which combinations have we NEVER sold? Just the gaps — the white space on the map.\"",
  ],
  objective:
    "Select only the region-product combinations with no deals at all, sorted by region then product.",
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
    ["East", "Enterprise"],
    ["North", "Basic"],
    ["South", "Enterprise"],
    ["South", "Pro"],
    ["West", "Basic"],
  ],
  requireRowOrder: true,
  hints: [
    "Same scaffold as before, but instead of totaling, filter to the rows where the LEFT JOIN found nothing.",
    "A failed LEFT JOIN leaves the deal columns NULL — WHERE d.id IS NULL isolates exactly those rows.",
    "Try: SELECT r.region, p.product FROM regions r CROSS JOIN products p LEFT JOIN deals d ON d.region = r.region AND d.product = p.product WHERE d.id IS NULL ORDER BY r.region, p.product;",
  ],
  xpAward: 250,
};
