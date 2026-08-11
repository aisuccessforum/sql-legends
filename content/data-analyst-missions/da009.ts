import type { Mission } from "../missions/level001";

export const da009: Mission = {
  id: "da-ticket-009",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-009 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:00 AM. Internal system. Priority: Medium.",
    "New module — string cleaning. Sales ops just exported the raw lead form submissions, and it's a mess.",
    "\"Half these names have stray spaces at the start or end, probably from copy-pasting into the form field. Clean it up — every name, whitespace trimmed from both ends.\"",
  ],
  objective: "Select every lead's name with leading and trailing whitespace removed.",
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
  expectedColumns: ["clean_name"],
  expectedRows: [
    ["Ravi Kumar"],
    ["Priya Singh"],
    ["Arjun Mehta"],
    ["Sneha Patel"],
    ["Karan  Shah"],
    ["Divya Rao"],
    ["Vikram Singh"],
    ["Meera Kapoor"],
    ["Rohan Verma"],
    ["Anjali Patel"],
    ["Raj"],
  ],
  requireRowOrder: false,
  hints: [
    "TRIM() removes whitespace from both the start and end of a string — nothing in the middle.",
    "Karan Shah's double space in the middle stays exactly as it was — TRIM only ever touches the edges.",
    "Try: SELECT TRIM(full_name) AS clean_name FROM leads;",
  ],
  xpAward: 175,
};
