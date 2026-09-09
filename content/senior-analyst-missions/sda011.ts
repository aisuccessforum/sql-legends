import type { Mission } from "../missions/level001";

export const sda011: Mission = {
  id: "sda-ticket-011",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-011 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "10:20 AM. Internal system. Priority: High.",
    "\"You've been cleaning emails in SELECTs for weeks — but every report keeps re-cleaning the same mess. Fix the data itself, once: overwrite every email with its trimmed, lowercase form. Verify against the three that were worst.\"",
  ],
  objective:
    "Update every lead's email to its trimmed, lowercase form, then select the emails of leads 1, 4, and 9 to verify.",
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
  expectedColumns: ["email"],
  expectedRows: [
    ["ravi.kumar@gmail.com"],
    ["sneha.patel@gmail.com"],
    ["rohan.verma@gmail.com"],
  ],
  requireRowOrder: false,
  hints: [
    "An UPDATE with no WHERE touches every row — exactly what you want here, and exactly why you should always pause before running one.",
    "SET email = LOWER(TRIM(email)) reuses the same cleaning functions you know, applied in place.",
    "Try: UPDATE leads SET email = LOWER(TRIM(email)); SELECT email FROM leads WHERE id IN (1, 4, 9);",
  ],
  xpAward: 250,
};
