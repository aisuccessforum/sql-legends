import type { Mission } from "../missions/level001";

export const de020: Mission = {
  id: "de-ticket-020",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-020 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "10:30 AM. Internal system. Priority: High.",
    "\"SCD Type 1 UPDATE — overwrite existing rows. SQLite's correlated UPDATE: SET col=(SELECT col FROM updates WHERE id=dim.id) WHERE id IN (SELECT id FROM updates). Run the UPDATE then verify.\"",
  ],
  objective:
    "UPDATE dim_customer with values from customer_updates for all matching customer_ids, then select all rows to verify.",
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
  ],
  requireRowOrder: true,
  hints: [
    "UPDATE dim_customer SET segment=(SELECT segment FROM customer_updates WHERE customer_id=dim_customer.customer_id), region=(...), updated_at=(...) WHERE customer_id IN (SELECT customer_id FROM customer_updates). Then SELECT all rows.",
    "Try: UPDATE dim_customer SET segment=(SELECT segment FROM customer_updates WHERE customer_id=dim_customer.customer_id), region=(SELECT region FROM customer_updates WHERE customer_id=dim_customer.customer_id), updated_at=(SELECT updated_at FROM customer_updates WHERE customer_id=dim_customer.customer_id) WHERE customer_id IN (SELECT customer_id FROM customer_updates); SELECT customer_id, customer_name, segment, region, updated_at FROM dim_customer ORDER BY customer_id;",
  ],
  xpAward: 250,
};
