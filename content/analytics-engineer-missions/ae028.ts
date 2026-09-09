import type { Mission } from "../missions/level001";

export const ae028: Mission = {
  id: "ae-ticket-028",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-028 // Priority: Medium",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "12:45 PM. Internal system. Priority: Medium.",
    "\"Freshness test — leads created before 2026-01-01 are older than the system's data retention window. Count stale records. A non-zero result means old data wasn't cleaned before load.\"",
  ],
  objective:
    "Count the number of raw_leads rows where created_date is before 2026-01-01.",
  schemaLabel: "raw_leads",
  seedSql: `
    CREATE TABLE raw_leads (lead_id TEXT, company_name TEXT, email TEXT, deal_value TEXT, source TEXT, created_date TEXT, status TEXT);
    INSERT INTO raw_leads VALUES ('LD-001','Apex Corp','apex@corp.com','45000','website','2026-01-05','new'),('LD-002',NULL,'nova@soft.io','12000','referral','2026-01-08','qualified'),('LD-003','Quantum Corp','qcorp@q.com','8000','event','2026-01-12','new'),('LD-003','Quantum Corp','qcorp@q.com','8000','event','2026-01-12','new'),('LD-004','BrightIdeas',NULL,'6500','website','2026-01-15','closed'),('LD-005','TechWave','tw@wave.io','-500','email','2026-01-18','new'),('LD-006','DataFirst','df@first.com','25000','referral','2026-01-20','qualified'),('LD-007','Metro','metro@a.com','18000','website','2026-01-25','archived'),('LD-008','Sunrise','sun@rise.com','9000','email','2026-02-01','new'),('LD-009','CloudBase','cb@cloud.com','75000','website','2025-12-01','new');
  `,
  schemaPreview: [{ table: "raw_leads", columns: ["lead_id","company_name","email","deal_value","source","created_date","status"] }],
  expectedColumns: ["stale_records"],
  expectedRows: [
    [1],
  ],
  requireRowOrder: false,
  hints: [
    "WHERE created_date < '2026-01-01' — text-based ISO date comparison works correctly in SQLite.",
    "Try: SELECT COUNT(*) AS stale_records FROM raw_leads WHERE created_date < '2026-01-01';",
  ],
  xpAward: 175,
};
