import type { Mission } from "../missions/level001";

export const ae024: Mission = {
  id: "ae-ticket-024",
  world: "AstraMind Analytics",
  levelLabel: "Ticket AE-024 // Priority: High",
  npc: "DATA PLATFORM LEAD ARYAN KAPOOR",
  briefing: [
    "09:45 AM. Internal system. Priority: High.",
    "\"Uniqueness test — lead_id should be a primary key. Find any lead_id that appears more than once. A clean uniqueness test returns zero rows; even one row is a pipeline failure.\"",
  ],
  objective:
    "Find any lead_id that appears more than once in raw_leads, showing the id and occurrence count.",
  schemaLabel: "raw_leads",
  seedSql: `
    CREATE TABLE raw_leads (lead_id TEXT, company_name TEXT, email TEXT, deal_value TEXT, source TEXT, created_date TEXT, status TEXT);
    INSERT INTO raw_leads VALUES ('LD-001','Apex Corp','apex@corp.com','45000','website','2026-01-05','new'),('LD-002',NULL,'nova@soft.io','12000','referral','2026-01-08','qualified'),('LD-003','Quantum Corp','qcorp@q.com','8000','event','2026-01-12','new'),('LD-003','Quantum Corp','qcorp@q.com','8000','event','2026-01-12','new'),('LD-004','BrightIdeas',NULL,'6500','website','2026-01-15','closed'),('LD-005','TechWave','tw@wave.io','-500','email','2026-01-18','new'),('LD-006','DataFirst','df@first.com','25000','referral','2026-01-20','qualified'),('LD-007','Metro','metro@a.com','18000','website','2026-01-25','archived'),('LD-008','Sunrise','sun@rise.com','9000','email','2026-02-01','new'),('LD-009','CloudBase','cb@cloud.com','75000','website','2025-12-01','new');
  `,
  schemaPreview: [{ table: "raw_leads", columns: ["lead_id","company_name","email","deal_value","source","created_date","status"] }],
  expectedColumns: ["lead_id", "occurrences"],
  expectedRows: [
    ["LD-003", 2],
  ],
  requireRowOrder: false,
  hints: [
    "GROUP BY lead_id, HAVING COUNT(*) > 1 — the classic duplicate-detection pattern.",
    "Try: SELECT lead_id, COUNT(*) AS occurrences FROM raw_leads GROUP BY lead_id HAVING COUNT(*) > 1 ORDER BY lead_id;",
  ],
  xpAward: 200,
};
