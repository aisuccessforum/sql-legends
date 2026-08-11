import type { Mission } from "../missions/level001";

export const da011: Mission = {
  id: "da-ticket-011",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-011 // Priority: High",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:10 AM. Internal system. Priority: High.",
    "\"Duplicate lead alert — 'RAVI.KUMAR@GMAIL.COM ' and 'ravi.kumar@gmail.com' are the same person, but our CRM sees them as different emails because of case and stray spaces. Clean every email before it goes anywhere near deduplication logic.\"",
  ],
  objective:
    "Select every lead's email, trimmed and converted to lowercase.",
  schemaLabel: "leads",
  seedSql: `
    CREATE TABLE leads (
      id INTEGER PRIMARY KEY,
      full_name TEXT,
      email TEXT,
      phone TEXT,
      company_name TEXT,
      source TEXT
    );
    INSERT INTO leads (id, full_name, email, phone, company_name, source) VALUES
      (1, '  Ravi Kumar  ', 'RAVI.KUMAR@GMAIL.COM ', '+91-9876543210', 'Titan Manufacturing', '  Website  '),
      (2, 'Priya Singh', 'priya.singh@yahoo.com', '9876543211', 'Nova Retail', 'referral'),
      (3, '  Arjun Mehta', ' arjun.mehta@outlook.com', '+91 9876543212 ', 'City Hospital', 'LinkedIn'),
      (4, 'Sneha Patel  ', 'SNEHA.PATEL@GMAIL.COM', '9876543213', 'Northgate Bank', 'Website'),
      (5, 'Karan  Shah', 'karan.shah@gmail.com ', ' 9876543214', 'Titan Manufacturing', 'referral  '),
      (6, '  Divya Rao', 'divya.rao@yahoo.com', '+91-9876543215', 'Sky Airlines', 'LinkedIn  '),
      (7, 'Vikram Singh', ' vikram.singh@gmail.com', '9876543216 ', 'Nova Retail', '  Website'),
      (8, 'Meera Kapoor', 'meera.kapoor@outlook.com ', '9876543217', 'City Hospital', 'referral'),
      (9, 'Rohan Verma', 'ROHAN.VERMA@gmail.com', ' +91 9876543218', 'Titan Manufacturing', 'LinkedIn'),
      (10, 'Anjali Patel  ', 'anjali.patel@yahoo.com', '9876543219 ', 'Northgate Bank', 'Website  '),
      (11, 'Raj', 'raj@x.com', '9876543220', 'Nova Retail', 'Website');
  `,
  schemaPreview: [
    {
      table: "leads",
      columns: ["id", "full_name", "email", "phone", "company_name", "source"],
    },
  ],
  expectedColumns: ["clean_email"],
  expectedRows: [
    ["ravi.kumar@gmail.com"],
    ["priya.singh@yahoo.com"],
    ["arjun.mehta@outlook.com"],
    ["sneha.patel@gmail.com"],
    ["karan.shah@gmail.com"],
    ["divya.rao@yahoo.com"],
    ["vikram.singh@gmail.com"],
    ["meera.kapoor@outlook.com"],
    ["rohan.verma@gmail.com"],
    ["anjali.patel@yahoo.com"],
    ["raj@x.com"],
  ],
  requireRowOrder: false,
  hints: [
    "Same nested-function pattern as the last ticket, just with LOWER instead of UPPER.",
    "Order doesn't matter here — TRIM(LOWER(email)) and LOWER(TRIM(email)) give the same result either way.",
    "Try: SELECT LOWER(TRIM(email)) AS clean_email FROM leads;",
  ],
  xpAward: 150,
};
