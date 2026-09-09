import type { Mission } from "../missions/level001";

export const ae026: Mission = {
  id: "ae-ticket-026",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-026 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "11:15 AM. Internal system. Priority: High.",
    "\"Range check — deal_value should always be positive. Negative values are data entry errors. Return the full rows that fail the range check so they can be investigated.\"",
  ],
  objective:
    "Return the lead_id, company_name, and deal_value (as a real number) for any lead where deal_value is negative.",
  schemaLabel: "raw_leads",
  seedSql: `
    CREATE TABLE raw_leads (lead_id TEXT, company_name TEXT, email TEXT, deal_value TEXT, source TEXT, created_date TEXT, status TEXT);
    INSERT INTO raw_leads VALUES ('LD-001','Apex Corp','apex@corp.com','45000','website','2026-01-05','new'),('LD-002',NULL,'nova@soft.io','12000','referral','2026-01-08','qualified'),('LD-003','Quantum Corp','qcorp@q.com','8000','event','2026-01-12','new'),('LD-003','Quantum Corp','qcorp@q.com','8000','event','2026-01-12','new'),('LD-004','BrightIdeas',NULL,'6500','website','2026-01-15','closed'),('LD-005','TechWave','tw@wave.io','-500','email','2026-01-18','new'),('LD-006','DataFirst','df@first.com','25000','referral','2026-01-20','qualified'),('LD-007','Metro','metro@a.com','18000','website','2026-01-25','archived'),('LD-008','Sunrise','sun@rise.com','9000','email','2026-02-01','new'),('LD-009','CloudBase','cb@cloud.com','75000','website','2025-12-01','new');
  `,
  schemaPreview: [{ table: "raw_leads", columns: ["lead_id","company_name","email","deal_value","source","created_date","status"] }],
  expectedColumns: ["lead_id", "company_name", "deal_value"],
  expectedRows: [
    ["LD-005", "TechWave", -500],
  ],
  requireRowOrder: false,
  hints: [
    "CAST(deal_value AS REAL) converts the text column for comparison. Filter WHERE CAST(deal_value AS REAL) < 0.",
    "Try: SELECT lead_id, company_name, CAST(deal_value AS REAL) AS deal_value FROM raw_leads WHERE CAST(deal_value AS REAL) < 0;",
  ],
  xpAward: 200,
};
