import type { Mission } from "../missions/level001";

export const de022: Mission = {
  id: "de-ticket-022",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-022 // Priority: Critical",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "12:00 PM. Internal system. Priority: Critical.",
    "\"Full SCD Type 1 refresh — the complete pipeline: UPDATE existing rows, INSERT new rows, SELECT to verify. Two DML statements, one verification SELECT. This is the production dim_customer refresh job.\"",
  ],
  objective:
    "Run a full SCD1 refresh (UPDATE existing + INSERT new), then select all dim_customer rows showing customer_id, name, segment, region, and updated_at.",
  schemaLabel: "dim_customer + customer_updates",
  seedSql: `
    CREATE TABLE dim_customer (customer_id TEXT PRIMARY KEY, customer_name TEXT, segment TEXT, region TEXT, updated_at TEXT);
    CREATE TABLE customer_updates (customer_id TEXT, customer_name TEXT, segment TEXT, region TEXT, updated_at TEXT);
    INSERT INTO dim_customer VALUES ('C001','Apex Innovations','SMB','West','2026-01-01'),('C002','NovaSoft','SMB','East','2026-01-01'),('C003','Quantum Corp','Enterprise','North','2026-01-01'),('C004','Bright Ideas','SMB','South','2026-01-01'),('C005','TechWave','Enterprise','West','2026-01-01');
    INSERT INTO customer_updates VALUES ('C001','Apex Innovations','Enterprise','West','2026-04-01'),('C003','Quantum Corp','Enterprise','Central','2026-04-01'),('C006','DataFirst','SMB','East','2026-04-01');
  `,
  schemaPreview: [
    { table: "dim_customer",     columns: ["customer_id","customer_name","segment","region","updated_at"] },
    { table: "customer_updates", columns: ["customer_id","customer_name","segment","region","updated_at"] },
  ],
  expectedColumns: ["customer_id", "customer_name", "segment", "region", "updated_at"],
  expectedRows: [
    ["C001", "Apex Innovations", "Enterprise", "West", "2026-04-01"],
    ["C002", "NovaSoft", "SMB", "East", "2026-01-01"],
    ["C003", "Quantum Corp", "Enterprise", "Central", "2026-04-01"],
    ["C004", "Bright Ideas", "SMB", "South", "2026-01-01"],
    ["C005", "TechWave", "Enterprise", "West", "2026-01-01"],
    ["C006", "DataFirst", "SMB", "East", "2026-04-01"],
  ],
  requireRowOrder: true,
  hints: [
    "Three statements: correlated UPDATE, INSERT WHERE NOT IN, SELECT * to verify. All rows show the refreshed state.",
    "Try: UPDATE dim_customer SET segment=(SELECT segment FROM customer_updates WHERE customer_id=dim_customer.customer_id), region=(SELECT region FROM customer_updates WHERE customer_id=dim_customer.customer_id), updated_at=(SELECT updated_at FROM customer_updates WHERE customer_id=dim_customer.customer_id) WHERE customer_id IN (SELECT customer_id FROM customer_updates); INSERT INTO dim_customer SELECT customer_id, customer_name, segment, region, updated_at FROM customer_updates WHERE customer_id NOT IN (SELECT customer_id FROM dim_customer); SELECT customer_id, customer_name, segment, region, updated_at FROM dim_customer ORDER BY customer_id;",
  ],
  xpAward: 275,
};
