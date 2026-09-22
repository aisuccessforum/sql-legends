import type { Mission } from "../missions/level001";

export const de027: Mission = {
  id: "de-ticket-027",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-027 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "11:15 AM. Internal system. Priority: High.",
    "\"Identify changed records — compare incoming_updates to current dimension rows. A change is any incoming row where segment or region differs from the is_current=1 row. These trigger the Type 2 close-and-insert cycle.\"",
  ],
  objective:
    "Find incoming updates where segment or region differs from the current dimension value — customer_id, current and new segment, current and new region.",
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
  expectedColumns: ["customer_id", "current_segment", "new_segment", "current_region", "new_region"],
  expectedRows: [
    ["C002", "SMB", "Enterprise", "East", "East"],
  ],
  requireRowOrder: true,
  hints: [
    "JOIN incoming_updates to dim_customer_scd2 WHERE is_current=1 AND (u.segment<>d.segment OR u.region<>d.region).",
    "Try: SELECT u.customer_id, d.segment AS current_segment, u.segment AS new_segment, d.region AS current_region, u.region AS new_region FROM incoming_updates u JOIN dim_customer_scd2 d ON u.customer_id=d.customer_id AND d.is_current=1 WHERE u.segment<>d.segment OR u.region<>d.region ORDER BY u.customer_id;",
  ],
  xpAward: 225,
};
