import type { Mission } from "../missions/level001";

export const de019: Mission = {
  id: "de-ticket-019",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-019 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "09:45 AM. Internal system. Priority: High.",
    "\"New records — some updates reference customer IDs not yet in dim_customer. Anti-join identifies them: they need an INSERT, not an UPDATE.\"",
  ],
  objective:
    "Find customers in customer_updates that don't yet exist in dim_customer — showing customer_id, customer_name, segment, and region.",
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
  expectedColumns: ["customer_id", "customer_name", "segment", "region"],
  expectedRows: [
    ["C006", "DataFirst", "SMB", "East"],
  ],
  requireRowOrder: false,
  hints: [
    "LEFT JOIN customer_updates to dim_customer, filter WHERE d.customer_id IS NULL.",
    "Try: SELECT u.customer_id, u.customer_name, u.segment, u.region FROM customer_updates u LEFT JOIN dim_customer d ON u.customer_id=d.customer_id WHERE d.customer_id IS NULL ORDER BY u.customer_id;",
  ],
  xpAward: 200,
};
