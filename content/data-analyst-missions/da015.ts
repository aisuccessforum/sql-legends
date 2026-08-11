import type { Mission } from "../missions/level001";

export const da015: Mission = {
  id: "da-ticket-015",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-015 // Priority: Low",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:40 PM. Internal system. Priority: Low.",
    "\"For the sales dashboard, build a single display label for Ravi Kumar — his name, followed by his company in parentheses. One column, human-readable.\"",
  ],
  objective:
    "For the lead with ID 1, select their trimmed name followed by their company name in parentheses, as a single label.",
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
  expectedColumns: ["display_label"],
  expectedRows: [["Ravi Kumar (Titan Manufacturing)"]],
  requireRowOrder: false,
  hints: [
    "Two pipe characters together, ||, glue strings side by side — including literal text you write yourself, like a space or a parenthesis.",
    "You need TRIM on the name, then || to join it with the literal text ' (', the company name, and a closing ')'.",
    "Try: SELECT TRIM(full_name) || ' (' || company_name || ')' AS display_label FROM leads WHERE id = 1;",
  ],
  xpAward: 175,
};
