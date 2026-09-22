import type { Mission } from "../missions/level001";

export const de021: Mission = {
  id: "de-ticket-021",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-021 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "11:15 AM. Internal system. Priority: High.",
    "\"INSERT new customers — after updating existing rows, add brand-new customers from the incoming batch. INSERT INTO ... SELECT ... WHERE NOT IN prevents re-inserting records the UPDATE already handled.\"",
  ],
  objective:
    "INSERT customers from customer_updates not yet in dim_customer, then select all rows to verify.",
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
    ["C001", "Apex Innovations", "SMB", "West"],
    ["C002", "NovaSoft", "SMB", "East"],
    ["C003", "Quantum Corp", "Enterprise", "North"],
    ["C004", "Bright Ideas", "SMB", "South"],
    ["C005", "TechWave", "Enterprise", "West"],
    ["C006", "DataFirst", "SMB", "East"],
  ],
  requireRowOrder: true,
  hints: [
    "INSERT INTO dim_customer SELECT ... FROM customer_updates WHERE customer_id NOT IN (SELECT customer_id FROM dim_customer). Then SELECT all rows.",
    "Try: INSERT INTO dim_customer SELECT customer_id, customer_name, segment, region, updated_at FROM customer_updates WHERE customer_id NOT IN (SELECT customer_id FROM dim_customer); SELECT customer_id, customer_name, segment, region FROM dim_customer ORDER BY customer_id;",
  ],
  xpAward: 225,
};
