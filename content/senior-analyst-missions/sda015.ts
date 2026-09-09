import type { Mission } from "../missions/level001";

export const sda015: Mission = {
  id: "sda-ticket-015",
  world: "AstraMind Analytics",
  levelLabel: "Ticket SDA-015 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "01:15 PM. Internal system. Priority: High.",
    "\"The source column is chaos — 'referral', 'Referral  ', '  Website'. Standardize it in place with one UPDATE: Website, Referral, LinkedIn, exact capitalization, no stray spaces. Then show the breakdown by source to prove it collapsed to three clean values.\"",
  ],
  objective:
    "Update every lead's source to its canonical form (Website, Referral, or LinkedIn), then select each source with its lead count, sorted by source.",
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
  expectedColumns: ["source", "lead_count"],
  expectedRows: [
    ["LinkedIn", 3],
    ["Referral", 3],
    ["Website", 5],
  ],
  requireRowOrder: true,
  hints: [
    "A CASE expression inside SET lets one UPDATE apply different canonical values depending on what the messy value lowercases to.",
    "Compare on LOWER(TRIM(source)) so 'referral' and 'Referral  ' both match the same branch.",
    "Try: UPDATE leads SET source = CASE WHEN LOWER(TRIM(source)) = 'website' THEN 'Website' WHEN LOWER(TRIM(source)) = 'referral' THEN 'Referral' WHEN LOWER(TRIM(source)) = 'linkedin' THEN 'LinkedIn' ELSE TRIM(source) END; SELECT source, COUNT(*) AS lead_count FROM leads GROUP BY source ORDER BY source;",
  ],
  xpAward: 275,
};
