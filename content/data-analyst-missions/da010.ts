import type { Mission } from "../missions/level001";

export const da010: Mission = {
  id: "da-ticket-010",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-010 // Priority: Low",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:35 AM. Internal system. Priority: Low.",
    "\"Source values are all over the place — 'Website', '  Website  ', 'website' would all count as different values in a GROUP BY right now. Standardize source to uppercase, trimmed, for the marketing report.\"",
  ],
  objective:
    "Select every lead's source, trimmed and converted to uppercase.",
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
  expectedColumns: ["clean_source"],
  expectedRows: [
    ["WEBSITE"],
    ["REFERRAL"],
    ["LINKEDIN"],
    ["WEBSITE"],
    ["REFERRAL"],
    ["LINKEDIN"],
    ["WEBSITE"],
    ["REFERRAL"],
    ["LINKEDIN"],
    ["WEBSITE"],
    ["WEBSITE"],
  ],
  requireRowOrder: false,
  hints: [
    "Two functions nested together — trim first, then uppercase the result.",
    "UPPER() wraps around whatever's inside it, same as any nested function call.",
    "Try: SELECT UPPER(TRIM(source)) AS clean_source FROM leads;",
  ],
  xpAward: 150,
};
