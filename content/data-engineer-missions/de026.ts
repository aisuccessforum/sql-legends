import type { Mission } from "../missions/level001";

export const de026: Mission = {
  id: "de-ticket-026",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-026 // Priority: Medium",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "10:30 AM. Internal system. Priority: Medium.",
    "\"Version count per customer — a quick audit. C001 has two versions (one historical, one current). This is how you verify the SCD2 pipeline is working: version counts grow only when real changes happen.\"",
  ],
  objective:
    "Count the number of dimension versions per customer, sorted by versions descending then customer_id.",
  schemaLabel: "dim_customer_scd2 + incoming_updates",
  seedSql: `
    CREATE TABLE dim_customer_scd2 (sk INTEGER PRIMARY KEY, customer_id TEXT, customer_name TEXT, segment TEXT, region TEXT, effective_from TEXT, effective_to TEXT, is_current INTEGER);
    CREATE TABLE incoming_updates (customer_id TEXT, customer_name TEXT, segment TEXT, region TEXT);
    INSERT INTO dim_customer_scd2 VALUES (1,'C001','Apex Innovations','SMB','West','2026-01-01','2026-03-31',0),(2,'C001','Apex Innovations','Enterprise','West','2026-04-01','9999-12-31',1),(3,'C002','NovaSoft','SMB','East','2026-01-01','9999-12-31',1),(4,'C003','Quantum Corp','Enterprise','North','2026-01-01','9999-12-31',1),(5,'C004','Bright Ideas','SMB','South','2026-01-01','9999-12-31',1),(6,'C005','TechWave','Enterprise','West','2026-01-01','9999-12-31',1);
    INSERT INTO incoming_updates VALUES ('C002','NovaSoft','Enterprise','East'),('C006','DataFirst','SMB','East');
  `,
  schemaPreview: [
    { table: "dim_customer_scd2", columns: ["sk","customer_id","customer_name","segment","region","effective_from","effective_to","is_current"] },
    { table: "incoming_updates",  columns: ["customer_id","customer_name","segment","region"] },
  ],
  expectedColumns: ["customer_id", "versions"],
  expectedRows: [
    ["C001", 2],
    ["C002", 1],
    ["C003", 1],
    ["C004", 1],
    ["C005", 1],
  ],
  requireRowOrder: true,
  hints: [
    "GROUP BY customer_id, COUNT(*) AS versions — no filter, count all rows per customer.",
    "Try: SELECT customer_id, COUNT(*) AS versions FROM dim_customer_scd2 GROUP BY customer_id ORDER BY versions DESC, customer_id;",
  ],
  xpAward: 200,
};
