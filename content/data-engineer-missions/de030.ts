import type { Mission } from "../missions/level001";

export const de030: Mission = {
  id: "de-ticket-030",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DE-030 // Priority: Critical",
  npc: "PRINCIPAL DATA ENGINEER VIKRAM NAIR",
  briefing: [
    "01:30 PM. Internal system. Priority: Critical.",
    "\"Full SCD2 pipeline — handle both a changed existing customer (C002 goes to Enterprise) and a brand-new customer (C006). Three statements: UPDATE, INSERT new version, INSERT new customer. Verify both.\"",
  ],
  objective:
    "Close C002's current row, insert C002's new version (Enterprise), insert C006 as a new customer, then select all rows for C002 and C006.",
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
  expectedColumns: ["customer_id", "segment", "region", "effective_from", "is_current"],
  expectedRows: [
    ["C002", "SMB", "East", "2026-01-01", 0],
    ["C002", "Enterprise", "East", "2026-05-01", 1],
    ["C006", "SMB", "East", "2026-05-01", 1],
  ],
  requireRowOrder: true,
  hints: [
    "Three DML statements: UPDATE to close C002, INSERT C002's new version, INSERT C006 as first-time row. SELECT WHERE customer_id IN ('C002','C006').",
    "Try: UPDATE dim_customer_scd2 SET effective_to='2026-04-30', is_current=0 WHERE customer_id='C002' AND is_current=1; INSERT INTO dim_customer_scd2 (customer_id, customer_name, segment, region, effective_from, effective_to, is_current) VALUES ('C002','NovaSoft','Enterprise','East','2026-05-01','9999-12-31',1); INSERT INTO dim_customer_scd2 (customer_id, customer_name, segment, region, effective_from, effective_to, is_current) VALUES ('C006','DataFirst','SMB','East','2026-05-01','9999-12-31',1); SELECT customer_id, segment, region, effective_from, is_current FROM dim_customer_scd2 WHERE customer_id IN ('C002','C006') ORDER BY customer_id, effective_from;",
  ],
  xpAward: 300,
};
