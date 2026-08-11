import type { Mission } from "../missions/level001";

export const da046: Mission = {
  id: "da-ticket-046",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-046 // Final Assessment 2 of 6",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:00 AM. Internal system. Priority: Critical.",
    "\"Marketing wants the lead list broken down by email provider — how many leads per domain, most popular first. The raw emails are still messy, so a naive breakdown would split the same domain into several buckets. Clean before you count.\"",
  ],
  objective:
    "Count leads per cleaned, lowercase email domain, sorted by count descending and then domain alphabetically.",
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
  expectedColumns: ["domain", "lead_count"],
  expectedRows: [
    ["gmail.com", 5],
    ["yahoo.com", 3],
    ["outlook.com", 2],
    ["x.com", 1],
  ],
  requireRowOrder: true,
  hints: [
    "The domain extraction is a pattern you built in the cleaning module — trim, lowercase, find the @, take everything after it.",
    "You can GROUP BY the alias of a calculated column directly, then sort by the count.",
    "Try: SELECT LOWER(SUBSTR(TRIM(email), INSTR(TRIM(email), '@') + 1)) AS domain, COUNT(*) AS lead_count FROM leads GROUP BY domain ORDER BY lead_count DESC, domain;",
  ],
  xpAward: 275,
};
