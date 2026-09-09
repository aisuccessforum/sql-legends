import type { Mission } from "../missions/level001";

export const sda013: Mission = {
  id: "sda-ticket-013",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-013 // Priority: Medium",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "11:45 AM. Internal system. Priority: Medium.",
    "\"Nova Retail rebranded to Nova Retail Group. Update every lead carrying the old name, then count how many rows now carry the new one.\"",
  ],
  objective:
    "Update every lead's company_name from 'Nova Retail' to 'Nova Retail Group', then select the count of leads with the new name.",
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
  expectedColumns: ["renamed"],
  expectedRows: [
    [3],
  ],
  requireRowOrder: false,
  hints: [
    "One UPDATE with a WHERE on the old value handles all matching rows at once — no need to touch them one by one.",
    "The count in the verification should exactly match the number of rows that had the old name.",
    "Try: UPDATE leads SET company_name = 'Nova Retail Group' WHERE company_name = 'Nova Retail'; SELECT COUNT(*) AS renamed FROM leads WHERE company_name = 'Nova Retail Group';",
  ],
  xpAward: 225,
};
