import type { Mission } from "../missions/level001";

export const sda010: Mission = {
  id: "sda-ticket-010",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-010 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:40 AM. Internal system. Priority: Medium.",
    "\"That short 'Raj' record you flagged as a Data Analyst? He called back — full name is Raj Malhotra. Fix the record, then verify it.\"",
  ],
  objective:
    "Update lead id 11's full_name to 'Raj Malhotra', then select his full_name to verify.",
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
  expectedColumns: ["full_name"],
  expectedRows: [
    ["Raj Malhotra"],
  ],
  requireRowOrder: false,
  hints: [
    "UPDATE leads SET column = value WHERE condition — the WHERE is what keeps you from renaming all eleven leads at once.",
    "Always target by id for a single-row fix, not by the old name — names change, ids don't.",
    "Try: UPDATE leads SET full_name = 'Raj Malhotra' WHERE id = 11; SELECT full_name FROM leads WHERE id = 11;",
  ],
  xpAward: 225,
};
