import type { Mission } from "../missions/level001";

export const da012: Mission = {
  id: "da-ticket-012",
  world: "AstraMind Analytics",
  levelLabel: "Ticket DA-012 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:45 AM. Internal system. Priority: Medium.",
    "\"Flag anything that looks like a data entry mistake — a name under 5 characters after trimming is almost never a real full name. Probably someone rushed the form.\"",
  ],
  objective:
    "Select the trimmed name of every lead whose name is shorter than 5 characters after trimming.",
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
  expectedRows: [["Raj"]],
  requireRowOrder: false,
  hints: [
    "LENGTH() counts characters in a string — trim first, or the whitespace itself would count toward the length.",
    "This is a WHERE filter on the result of a function call, same as filtering on any calculated value.",
    "Try: SELECT TRIM(full_name) AS full_name FROM leads WHERE LENGTH(TRIM(full_name)) < 5;",
  ],
  xpAward: 175,
};
