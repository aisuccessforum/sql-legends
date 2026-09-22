import type { Mission } from "../missions/level001";

export const de025: Mission = {
  id: "de-ticket-025",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-025 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "09:45 AM. Internal system. Priority: High.",
    "\"Point-in-time query — what did the dimension look like on 2026-02-15? BETWEEN effective_from AND effective_to answers exactly that. This is how historical reporting works on a Type 2 dimension.\"",
  ],
  objective:
    "Select the dimension state for all customers as of 2026-02-15 — customer_id, name, segment, region, effective_from, and effective_to — sorted by customer_id.",
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
  expectedColumns: ["customer_id", "customer_name", "segment", "region", "effective_from", "effective_to"],
  expectedRows: [
    ["C001", "Apex Innovations", "SMB", "West", "2026-01-01", "2026-03-31"],
    ["C002", "NovaSoft", "SMB", "East", "2026-01-01", "9999-12-31"],
    ["C003", "Quantum Corp", "Enterprise", "North", "2026-01-01", "9999-12-31"],
    ["C004", "Bright Ideas", "SMB", "South", "2026-01-01", "9999-12-31"],
    ["C005", "TechWave", "Enterprise", "West", "2026-01-01", "9999-12-31"],
  ],
  requireRowOrder: true,
  hints: [
    "WHERE '2026-02-15' BETWEEN effective_from AND effective_to — every row whose validity window includes the target date.",
    "Try: SELECT customer_id, customer_name, segment, region, effective_from, effective_to FROM dim_customer_scd2 WHERE '2026-02-15' BETWEEN effective_from AND effective_to ORDER BY customer_id;",
  ],
  xpAward: 225,
};
