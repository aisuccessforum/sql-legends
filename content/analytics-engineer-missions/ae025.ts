import type { Mission } from "../missions/level001";

export const ae025: Mission = {
  id: "ae-ticket-025",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-025 // Priority: Medium",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "10:30 AM. Internal system. Priority: Medium.",
    "\"Required field test — email is needed for marketing automation. Count rows where email is missing.\"",
  ],
  objective:
    "Count the number of raw_leads rows where email is NULL.",
  schemaLabel: "raw_leads",
  seedSql: `
    CREATE TABLE raw_leads (lead_id TEXT, company_name TEXT, email TEXT, deal_value TEXT, source TEXT, created_date TEXT, status TEXT);
    INSERT INTO raw_leads VALUES ('LD-001','Apex Corp','apex@corp.com','45000','website','2026-01-05','new'),('LD-002',NULL,'nova@soft.io','12000','referral','2026-01-08','qualified'),('LD-003','Quantum Corp','qcorp@q.com','8000','event','2026-01-12','new'),('LD-003','Quantum Corp','qcorp@q.com','8000','event','2026-01-12','new'),('LD-004','BrightIdeas',NULL,'6500','website','2026-01-15','closed'),('LD-005','TechWave','tw@wave.io','-500','email','2026-01-18','new'),('LD-006','DataFirst','df@first.com','25000','referral','2026-01-20','qualified'),('LD-007','Metro','metro@a.com','18000','website','2026-01-25','archived'),('LD-008','Sunrise','sun@rise.com','9000','email','2026-02-01','new'),('LD-009','CloudBase','cb@cloud.com','75000','website','2025-12-01','new');
  `,
  schemaPreview: [{ table: "raw_leads", columns: ["lead_id","company_name","email","deal_value","source","created_date","status"] }],
  expectedColumns: ["rows_missing_email"],
  expectedRows: [
    [1],
  ],
  requireRowOrder: false,
  hints: [
    "Same pattern as the company_name NULL check — just swap the column.",
    "Try: SELECT COUNT(*) AS rows_missing_email FROM raw_leads WHERE email IS NULL;",
  ],
  xpAward: 175,
};
