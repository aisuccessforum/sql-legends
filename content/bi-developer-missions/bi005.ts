import type { Mission } from "../missions/level001";

export const bi005: Mission = {
  id: "bi-ticket-005",
  world: "AstraMind Analytics",
  levelLabel: "Ticket BI-005 // Priority: High",
  npc: "VP OF ANALYTICS KRISHNA MEHTA",
  briefing: [
    "12:00 PM. Internal system. Priority: High.",
    "\"Quarter-over-quarter comparison per region — Q1, Q2, and the difference. The simplest period comparison report shape; everything else builds on this.\"",
  ],
  objective:
    "For each region, show Q1 total, Q2 total, and the Q2 vs Q1 change, sorted by region.",
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
  expectedColumns: ["region", "q1", "q2", "q2_vs_q1"],
  expectedRows: [
    ["East", 250000, 279000, 29000],
    ["North", 203000, 217000, 14000],
    ["South", 160000, 175000, 15000],
    ["West", 323000, 345000, 22000],
  ],
  requireRowOrder: true,
  hints: [
    "Two conditional SUMs — one for Q1, one for Q2 — then subtract one from the other as a third column.",
    "All three expressions sit inside the same GROUP BY region query; no UNION needed here.",
    "Try: SELECT region, SUM(CASE WHEN quarter='Q1' THEN amount ELSE 0 END) AS q1, SUM(CASE WHEN quarter='Q2' THEN amount ELSE 0 END) AS q2, SUM(CASE WHEN quarter='Q2' THEN amount ELSE 0 END) - SUM(CASE WHEN quarter='Q1' THEN amount ELSE 0 END) AS q2_vs_q1 FROM sales GROUP BY region ORDER BY region;",
  ],
  xpAward: 250,
};
