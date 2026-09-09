import type { Mission } from "../missions/level001";

export const sda009: Mission = {
  id: "sda-ticket-009",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-009 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:00 AM. Internal system. Priority: High.",
    "\"New module — changing data, not just reading it. Senior analysts get write access, and with it the habit of verifying every change immediately.\"",
    "\"A new lead came in by phone: Tara Bedi, tara.bedi@gmail.com, phone 9876543221, company Sky Airlines, source referral, id 12. Insert her, then prove she's there by selecting her name and company back.\"",
  ],
  objective:
    "Insert a new lead (id 12, Tara Bedi, tara.bedi@gmail.com, 9876543221, Sky Airlines, referral), then select her full_name and company_name to verify.",
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
  expectedColumns: ["full_name", "company_name"],
  expectedRows: [
    ["Tara Bedi", "Sky Airlines"],
  ],
  requireRowOrder: false,
  hints: [
    "INSERT INTO leads (columns...) VALUES (values...) — then a second statement, a plain SELECT, in the same submission.",
    "The verification SELECT is what gets graded — the insert has to have actually worked for it to return her row.",
    "Try: INSERT INTO leads (id, full_name, email, phone, company_name, source) VALUES (12, 'Tara Bedi', 'tara.bedi@gmail.com', '9876543221', 'Sky Airlines', 'referral'); SELECT full_name, company_name FROM leads WHERE id = 12;",
  ],
  xpAward: 225,
};
