import type { Mission } from "../missions/level001";

export const bi006: Mission = {
  id: "bi-ticket-006",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-006 // Priority: Medium",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "12:45 PM. Internal system. Priority: Medium.",
    "\"Best product line per region — the number sales leadership will ask about before you finish presenting. One row per region, the name and total of whichever product line made the most money there.\"",
  ],
  objective:
    "For each region, select the product line with the highest total sales and its total, sorted by region.",
  schemaLabel: "sales",
  seedSql: `
    CREATE TABLE sales (
      id INTEGER PRIMARY KEY, region TEXT, product_line TEXT,
      quarter TEXT, amount INTEGER
    );
    INSERT INTO sales (id, region, product_line, quarter, amount) VALUES
      (1,'East','Software','Q1',85000),(2,'East','Software','Q2',92000),
      (3,'East','Hardware','Q1',120000),(4,'East','Hardware','Q2',135000),
      (5,'East','Services','Q1',45000),(6,'East','Services','Q2',52000),
      (7,'North','Software','Q1',67000),(8,'North','Software','Q2',71000),
      (9,'North','Hardware','Q1',98000),(10,'North','Hardware','Q2',105000),
      (11,'North','Services','Q1',38000),(12,'North','Services','Q2',41000),
      (13,'South','Software','Q1',54000),(14,'South','Software','Q2',59000),
      (15,'South','Hardware','Q1',77000),(16,'South','Hardware','Q2',83000),
      (17,'South','Services','Q1',29000),(18,'South','Services','Q2',33000),
      (19,'West','Software','Q1',110000),(20,'West','Software','Q2',118000),
      (21,'West','Hardware','Q1',155000),(22,'West','Hardware','Q2',162000),
      (23,'West','Services','Q1',58000),(24,'West','Services','Q2',65000);
  `,
  schemaPreview: [{ table: "sales", columns: ["id","region","product_line","quarter","amount"] }],
  expectedColumns: ["region", "product_line", "total"],
  expectedRows: [
    ["East", "Hardware", 255000],
    ["North", "Hardware", 203000],
    ["South", "Hardware", 160000],
    ["West", "Hardware", 317000],
  ],
  requireRowOrder: true,
  hints: [
    "A window RANK() partitioned by region and ordered by the group's SUM lets you tag each product line with its rank inside that region.",
    "Filter to rank = 1 in an outer query or CTE — you can't filter on a window function in the same WHERE.",
    "Try: WITH ranked AS (SELECT region, product_line, SUM(amount) AS total, RANK() OVER (PARTITION BY region ORDER BY SUM(amount) DESC) AS rnk FROM sales GROUP BY region, product_line) SELECT region, product_line, total FROM ranked WHERE rnk=1 ORDER BY region;",
  ],
  xpAward: 250,
};
