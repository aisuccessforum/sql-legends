import type { Mission } from "../missions/level001";

export const sda014: Mission = {
  id: "sda-ticket-014",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-014 // Priority: Low",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "12:30 PM. Internal system. Priority: Low.",
    "\"Two more leads from this morning's webinar — Tara Bedi (id 12, tara.bedi@gmail.com, 9876543221, Sky Airlines, referral) and Aman Joshi (id 13, aman.joshi@yahoo.com, 9876543222, City Hospital, Website). One INSERT, both rows, then the new total.\"",
  ],
  objective:
    "Insert both new leads in a single INSERT statement, then select the total lead count.",
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
  expectedColumns: ["total_leads"],
  expectedRows: [
    [13],
  ],
  requireRowOrder: false,
  hints: [
    "A single INSERT can carry multiple row tuples: VALUES (...), (...) — comma-separated.",
    "Eleven existing plus two new should verify as thirteen.",
    "Try: INSERT INTO leads (id, full_name, email, phone, company_name, source) VALUES (12, 'Tara Bedi', 'tara.bedi@gmail.com', '9876543221', 'Sky Airlines', 'referral'), (13, 'Aman Joshi', 'aman.joshi@yahoo.com', '9876543222', 'City Hospital', 'Website'); SELECT COUNT(*) AS total_leads FROM leads;",
  ],
  xpAward: 225,
};
