import type { Mission } from "../missions/level001";

export const bi007: Mission = {
  id: "bi-ticket-007",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-007 // Priority: High",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "01:30 PM. Internal system. Priority: High.",
    "\"Share of company per region — the context that turns a number into a story. 'West sold 668k' is fine; 'West is 34% of the company' gets attention.\"",
  ],
  objective:
    "For each region, show its total sales and its percentage of company total (rounded to 1 decimal), sorted by total descending.",
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
  expectedColumns: ["region", "total", "pct_of_company"],
  expectedRows: [
    ["West", 668000, 34.2],
    ["East", 529000, 27.1],
    ["North", 420000, 21.5],
    ["South", 335000, 17.2],
  ],
  requireRowOrder: true,
  hints: [
    "SUM(SUM(amount)) OVER () — the inner aggregate collapses to region totals, the outer windowed SUM adds those into a grand total on every row.",
    "Divide the region total by that grand total, multiply by 100.0, ROUND to 1 decimal.",
    "Try: SELECT region, SUM(amount) AS total, ROUND(100.0*SUM(amount)/SUM(SUM(amount)) OVER (),1) AS pct_of_company FROM sales GROUP BY region ORDER BY total DESC;",
  ],
  xpAward: 250,
};
