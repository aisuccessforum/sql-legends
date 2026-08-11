import type { Mission } from "../missions/level001";

export const da016: Mission = {
  id: "da-ticket-016",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-016 // Priority: Critical",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "01:30 PM. Internal system. Priority: Critical.",
    "\"Last one on cleaning. Full clean export for Ravi Kumar's record — trimmed name, clean lowercase email, clean digits-only phone, and the domain pulled out separately. Every technique from today, one row.\"",
  ],
  objective:
    "For the lead with ID 1, select their trimmed name, clean lowercase email, clean phone (no +91 prefix or dashes), and email domain, all in one query.",
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
  expectedColumns: ["clean_name", "clean_email", "clean_phone", "domain"],
  expectedRows: [["Ravi Kumar", "ravi.kumar@gmail.com", "9876543210", "gmail.com"]],
  requireRowOrder: false,
  hints: [
    "Four separate calculated columns, each reusing a pattern from earlier tickets today — nothing new to figure out, just assembling what you've already built.",
    "Every column can be worked out independently; build and check them one at a time if that's easier than writing all four at once.",
    "Try: SELECT TRIM(full_name) AS clean_name, LOWER(TRIM(email)) AS clean_email, REPLACE(REPLACE(TRIM(phone), '+91-', ''), '+91 ', '') AS clean_phone, LOWER(SUBSTR(TRIM(email), INSTR(TRIM(email), '@') + 1)) AS domain FROM leads WHERE id = 1;",
  ],
  xpAward: 250,
};
