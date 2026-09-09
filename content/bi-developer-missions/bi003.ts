import type { Mission } from "../missions/level001";

export const bi003: Mission = {
  id: "bi-ticket-003",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-003 // Priority: Medium",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "10:30 AM. Internal system. Priority: Medium.",
    "\"Product line breakdown — same structure but along the product_line axis instead of region. Marketing wants to see Software, Hardware, Services with a company total.\"",
  ],
  objective:
    "Select each product line's total sales plus a GRAND TOTAL row, sorted alphabetically with GRAND TOTAL last.",
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
  expectedColumns: ["product_line", "total"],
  expectedRows: [
    ["GRAND TOTAL", 1952000],
    ["Hardware", 935000],
    ["Services", 361000],
    ["Software", 656000],
  ],
  requireRowOrder: false,
  hints: [
    "Same two-block UNION ALL as the first ticket — just swap the grouping column to product_line.",
    "ORDER BY 1 sorts alphabetically; since 'GRAND TOTAL' sorts before 'Hardware' that way, no special label trick is needed here.",
    "Try: SELECT product_line, SUM(amount) AS total FROM sales GROUP BY product_line UNION ALL SELECT 'GRAND TOTAL', SUM(amount) FROM sales ORDER BY 1;",
  ],
  xpAward: 200,
};
