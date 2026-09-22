import type { Mission } from "../missions/level001";

export const de031: Mission = {
  id: "de-ticket-031",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-031 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "02:15 PM. Internal system. Priority: High.",
    "\"Segment change audit — self-join the dimension to find every customer who changed segment between their historical and current versions. This is how analysts find Enterprise customers who churned to SMB.\"",
  ],
  objective:
    "Find customers whose segment changed between the historical row (is_current=0) and the current row (is_current=1) — showing customer_id, old segment, new segment, and the change date.",
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
  expectedColumns: ["customer_id", "old_segment", "new_segment", "changed_date"],
  expectedRows: [
    ["C001", "SMB", "Enterprise", "2026-03-31"],
  ],
  requireRowOrder: true,
  hints: [
    "Self-join: v1 WHERE is_current=0, v2 WHERE is_current=1, ON customer_id AND v1.segment<>v2.segment. changed_date = v1.effective_to.",
    "Try: SELECT v1.customer_id, v1.segment AS old_segment, v2.segment AS new_segment, v1.effective_to AS changed_date FROM dim_customer_scd2 v1 JOIN dim_customer_scd2 v2 ON v1.customer_id=v2.customer_id AND v1.is_current=0 AND v2.is_current=1 AND v1.segment<>v2.segment ORDER BY v1.customer_id;",
  ],
  xpAward: 250,
};
