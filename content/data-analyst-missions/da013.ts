import type { Mission } from "../missions/level001";

export const da013: Mission = {
  id: "da-ticket-013",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-013 // Priority: High",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "11:20 AM. Internal system. Priority: High.",
    "\"Marketing wants to know which email providers our leads actually use — gmail, yahoo, outlook, whatever. Pull just the domain out of each email, cleaned up.\"",
    "\"You need to find where the @ sits in each string, then take everything after it. INSTR finds a position, SUBSTR cuts from a position.\"",
  ],
  objective:
    "Select the domain (everything after the @) from every lead's cleaned, lowercase email.",
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
  expectedColumns: ["domain"],
  expectedRows: [
    ["gmail.com"],
    ["yahoo.com"],
    ["outlook.com"],
    ["gmail.com"],
    ["gmail.com"],
    ["yahoo.com"],
    ["gmail.com"],
    ["outlook.com"],
    ["gmail.com"],
    ["yahoo.com"],
    ["x.com"],
  ],
  requireRowOrder: false,
  hints: [
    "Clean the email first (trim and lowercase), same as two tickets ago — build on top of that, don't skip it.",
    "INSTR(email, '@') gives you the position of the @ symbol; SUBSTR(email, that position + 1) grabs everything after it.",
    "Try: SELECT LOWER(SUBSTR(TRIM(email), INSTR(TRIM(email), '@') + 1)) AS domain FROM leads;",
  ],
  xpAward: 200,
};
