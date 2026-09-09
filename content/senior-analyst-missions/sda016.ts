import type { Mission } from "../missions/level001";

export const sda016: Mission = {
  id: "sda-ticket-016",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-016 // Priority: Critical",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "02:00 PM. Internal system. Priority: Critical.",
    "\"Module capstone — the full cleanup, permanently. Trim every name, clean every email to lowercase, delete anything whose cleaned name is still under 5 characters. Then verify with one row: how many leads remain, and the length of the shortest surviving name.\"",
  ],
  objective:
    "Run the full cleanup (trim names, clean emails, delete short names), then select the remaining count and the shortest name length as one row.",
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
  expectedColumns: ["remaining", "shortest_name"],
  expectedRows: [
    [10, 9],
  ],
  requireRowOrder: false,
  hints: [
    "Three modification statements in sequence, then one verification SELECT — order matters: trim the names before measuring their length for deletion.",
    "MIN(LENGTH(full_name)) proves no junk survived — the shortest real name left is 9 characters.",
    "Try: UPDATE leads SET full_name = TRIM(full_name); UPDATE leads SET email = LOWER(TRIM(email)); DELETE FROM leads WHERE LENGTH(full_name) < 5; SELECT COUNT(*) AS remaining, MIN(LENGTH(full_name)) AS shortest_name FROM leads;",
  ],
  xpAward: 300,
};
