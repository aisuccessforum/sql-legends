import type { Mission } from "../missions/level001";

export const de023: Mission = {
  id: "de-ticket-023",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-023 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "12:45 PM. Internal system. Priority: High.",
    "\"Refresh verification count — after a Type 1 refresh, log two numbers: total records in the dimension and how many were touched this run. If refreshed_count doesn't match expected, the pipeline has a bug.\"",
  ],
  objective:
    "After the full SCD1 refresh, select total record count and count of records refreshed in this run (updated_at='2026-04-01').",
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
  expectedColumns: ["total_records", "refreshed"],
  expectedRows: [
    [6, 3],
  ],
  requireRowOrder: false,
  hints: [
    "Run UPDATE + INSERT as before, then SELECT COUNT(*) AS total_records, COUNT(CASE WHEN updated_at='2026-04-01' THEN 1 END) AS refreshed FROM dim_customer.",
    "Try: UPDATE dim_customer SET segment=(SELECT segment FROM customer_updates WHERE customer_id=dim_customer.customer_id), region=(SELECT region FROM customer_updates WHERE customer_id=dim_customer.customer_id), updated_at=(SELECT updated_at FROM customer_updates WHERE customer_id=dim_customer.customer_id) WHERE customer_id IN (SELECT customer_id FROM customer_updates); INSERT INTO dim_customer SELECT customer_id, customer_name, segment, region, updated_at FROM customer_updates WHERE customer_id NOT IN (SELECT customer_id FROM dim_customer); SELECT COUNT(*) AS total_records, COUNT(CASE WHEN updated_at='2026-04-01' THEN 1 END) AS refreshed FROM dim_customer;",
  ],
  xpAward: 250,
};
