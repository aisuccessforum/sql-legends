import type { Mission } from "../missions/level001";

export const da014: Mission = {
  id: "da-ticket-014",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-014 // Priority: High",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:00 PM. Internal system. Priority: High.",
    "\"Phone numbers are a mess — some have '+91-', some have '+91 ', some have neither. The dialer tool needs plain digits, nothing else. Clean up just the four leads whose numbers currently have a country code prefix.\"",
  ],
  objective:
    "For leads with IDs 1, 3, 6, and 9, select their phone number with the '+91-' and '+91 ' prefixes and any dashes removed.",
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
  expectedColumns: ["clean_phone"],
  expectedRows: [["9876543210"], ["9876543212"], ["9876543215"], ["9876543218"]],
  requireRowOrder: false,
  hints: [
    "REPLACE() swaps every occurrence of one substring for another — an empty string as the replacement effectively deletes it.",
    "You need three REPLACE calls chained together, one per pattern to remove, each wrapping the previous result. Trim first too, in case whitespace is still hiding at the edges.",
    "Try: SELECT REPLACE(REPLACE(REPLACE(TRIM(phone), '+91-', ''), '+91 ', ''), '-', '') AS clean_phone FROM leads WHERE id IN (1, 3, 6, 9);",
  ],
  xpAward: 200,
};
