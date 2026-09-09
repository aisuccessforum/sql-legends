import type { Mission } from "../missions/level001";

export const sda012: Mission = {
  id: "sda-ticket-012",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-012 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "11:00 AM. Internal system. Priority: Medium.",
    "\"Records with names under 5 characters after trimming were agreed to be junk — delete them, then confirm the table count afterward.\"",
  ],
  objective:
    "Delete every lead whose trimmed name is shorter than 5 characters, then select the remaining lead count.",
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
  expectedColumns: ["remaining"],
  expectedRows: [
    [10],
  ],
  requireRowOrder: false,
  hints: [
    "DELETE FROM leads WHERE condition — the same LENGTH(TRIM(...)) test you wrote as a Data Analyst, now with consequences.",
    "The verification is a plain COUNT(*) after the deletion.",
    "Try: DELETE FROM leads WHERE LENGTH(TRIM(full_name)) < 5; SELECT COUNT(*) AS remaining FROM leads;",
  ],
  xpAward: 225,
};
