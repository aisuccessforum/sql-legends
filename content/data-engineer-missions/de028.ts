import type { Mission } from "../missions/level001";

export const de028: Mission = {
  id: "de-ticket-028",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-028 // Priority: High",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "12:00 PM. Internal system. Priority: High.",
    "\"Close the current row — Step 1 of Type 2. Set effective_to to the last day of the old version, is_current to 0. The old row becomes a historical record. Verify by selecting C002's rows.\"",
  ],
  objective:
    "UPDATE C002's current row (effective_to='2026-04-30', is_current=0), then select C002's rows to verify the closure.",
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
  expectedColumns: ["sk", "customer_id", "segment", "effective_from", "effective_to", "is_current"],
  expectedRows: [
    [3, "C002", "SMB", "2026-01-01", "2026-04-30", 0],
  ],
  requireRowOrder: true,
  hints: [
    "UPDATE dim_customer_scd2 SET effective_to='2026-04-30', is_current=0 WHERE customer_id='C002' AND is_current=1. Then SELECT to verify.",
    "Try: UPDATE dim_customer_scd2 SET effective_to='2026-04-30', is_current=0 WHERE customer_id='C002' AND is_current=1; SELECT sk, customer_id, segment, effective_from, effective_to, is_current FROM dim_customer_scd2 WHERE customer_id='C002' ORDER BY effective_from;",
  ],
  xpAward: 250,
};
