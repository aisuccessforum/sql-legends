import type { Mission } from "../missions/level001";

export const de018: Mission = {
  id: "de-ticket-018",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-018 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"New module — Slowly Changing Dimensions. SCD is how dimensions stay accurate over time. Type 1 overwrites: no history, just the current truth. First step: identify which incoming updates actually changed something.\"",
  ],
  objective:
    "Find customers in customer_updates whose segment or region differs from dim_customer — showing customer_id, old and new segment, old and new region.",
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
  expectedColumns: ["customer_id", "old_segment", "new_segment", "old_region", "new_region"],
  expectedRows: [
    ["C001", "SMB", "Enterprise", "West", "West"],
    ["C003", "Enterprise", "Enterprise", "North", "Central"],
  ],
  requireRowOrder: true,
  hints: [
    "JOIN customer_updates to dim_customer on customer_id, then WHERE u.segment<>d.segment OR u.region<>d.region OR u.customer_name<>d.customer_name.",
    "Try: SELECT u.customer_id, d.segment AS old_segment, u.segment AS new_segment, d.region AS old_region, u.region AS new_region FROM customer_updates u JOIN dim_customer d ON u.customer_id=d.customer_id WHERE u.segment<>d.segment OR u.region<>d.region OR u.customer_name<>d.customer_name ORDER BY u.customer_id;",
  ],
  xpAward: 225,
};
