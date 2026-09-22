import type { Mission } from "../missions/level001";

export const de024: Mission = {
  id: "de-ticket-024",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-024 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"New module — SCD Type 2. Type 2 keeps full history. Every attribute change closes the old row and opens a new one. The is_current flag and effective_from/effective_to dates are the mechanics. Start by querying the current state.\"",
  ],
  objective:
    "Select the current dimension row for each customer (is_current=1) — customer_id, customer_name, segment, region, and effective_from — sorted by customer_id.",
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
  expectedColumns: ["customer_id", "customer_name", "segment", "region", "effective_from"],
  expectedRows: [
    ["C001", "Apex Innovations", "Enterprise", "West", "2026-04-01"],
    ["C002", "NovaSoft", "SMB", "East", "2026-01-01"],
    ["C003", "Quantum Corp", "Enterprise", "North", "2026-01-01"],
    ["C004", "Bright Ideas", "SMB", "South", "2026-01-01"],
    ["C005", "TechWave", "Enterprise", "West", "2026-01-01"],
  ],
  requireRowOrder: true,
  hints: [
    "Simple WHERE is_current=1 filter. Every customer with a current row appears exactly once.",
    "Try: SELECT customer_id, customer_name, segment, region, effective_from FROM dim_customer_scd2 WHERE is_current=1 ORDER BY customer_id;",
  ],
  xpAward: 200,
};
