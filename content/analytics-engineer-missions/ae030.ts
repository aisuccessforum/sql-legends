import type { Mission } from "../missions/level001";

export const ae030: Mission = {
  id: "ae-ticket-030",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-030 // Priority: Critical",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "02:15 PM. Internal system. Priority: Critical.",
    "\"Module capstone — full data quality report. Five contract checks in one row: null company names, null emails, duplicate lead IDs, negative deal values, invalid status values. If every column is 0, the data passes. Even one non-zero means the pipeline should stop.\"",
  ],
  objective:
    "Produce a single row showing: null_company count, null_email count, duplicate_leads count, negative_values count, and invalid_status count — all from raw_leads.",
  schemaLabel: "raw_leads",
  seedSql: `
    CREATE TABLE raw_leads (lead_id TEXT, company_name TEXT, email TEXT, deal_value TEXT, source TEXT, created_date TEXT, status TEXT);
    INSERT INTO raw_leads VALUES ('LD-001','Apex Corp','apex@corp.com','45000','website','2026-01-05','new'),('LD-002',NULL,'nova@soft.io','12000','referral','2026-01-08','qualified'),('LD-003','Quantum Corp','qcorp@q.com','8000','event','2026-01-12','new'),('LD-003','Quantum Corp','qcorp@q.com','8000','event','2026-01-12','new'),('LD-004','BrightIdeas',NULL,'6500','website','2026-01-15','closed'),('LD-005','TechWave','tw@wave.io','-500','email','2026-01-18','new'),('LD-006','DataFirst','df@first.com','25000','referral','2026-01-20','qualified'),('LD-007','Metro','metro@a.com','18000','website','2026-01-25','archived'),('LD-008','Sunrise','sun@rise.com','9000','email','2026-02-01','new'),('LD-009','CloudBase','cb@cloud.com','75000','website','2025-12-01','new');
  `,
  schemaPreview: [{ table: "raw_leads", columns: ["lead_id","company_name","email","deal_value","source","created_date","status"] }],
  expectedColumns: ["null_company", "null_email", "duplicate_leads", "negative_values", "invalid_status"],
  expectedRows: [
    [1, 1, 1, 1, 1],
  ],
  requireRowOrder: false,
  hints: [
    "Five scalar subqueries in one SELECT — each is a different WHERE condition counting violations.",
    "duplicate_leads = COUNT(*) - COUNT(DISTINCT lead_id), which counts the 'extra' rows beyond the first.",
    "Try: SELECT (SELECT COUNT(*) FROM raw_leads WHERE company_name IS NULL) AS null_company, (SELECT COUNT(*) FROM raw_leads WHERE email IS NULL) AS null_email, (SELECT COUNT(*)-COUNT(DISTINCT lead_id) FROM raw_leads) AS duplicate_leads, (SELECT COUNT(*) FROM raw_leads WHERE CAST(deal_value AS REAL)<0) AS negative_values, (SELECT COUNT(*) FROM raw_leads WHERE status NOT IN ('new','qualified','closed')) AS invalid_status;",
  ],
  xpAward: 300,
};
