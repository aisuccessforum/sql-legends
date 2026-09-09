import type { Mission } from "../missions/level001";

export const sda001: Mission = {
  id: "sda-ticket-001",
  world: "Northgate Bank",
  levelLabel: "Ticket SDA-001 // Priority: High",
  npc: "HEAD OF ANALYTICS PRIYA VENKATESH",
  briefing: [
    "09:00 AM. Client: Northgate Bank. Priority: High.",
    "\"Senior Data Analyst — congratulations. I'm Priya, I run analytics across every client engagement. At this level, you build the reports executives actually read.\"",
    "\"First skill: pivoting. Executives don't want status as rows, they want it as columns — one line, three numbers. COUNT can take a CASE inside it: rows that don't match become NULL, and COUNT skips NULLs. That's how a filter becomes a column.\"",
  ],
  objective:
    "In a single row, count how many accounts are active, dormant, and closed — one column per status.",
  schemaLabel: "customers, accounts",
  seedSql: `
    CREATE TABLE customers (
      id INTEGER PRIMARY KEY,
      name TEXT,
      city TEXT,
      risk_tier TEXT
    );
    CREATE TABLE accounts (
      id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      account_type TEXT,
      balance INTEGER,
      status TEXT
    );
    INSERT INTO customers (id, name, city, risk_tier) VALUES
      (1, 'Meera Chandrasekaran', 'Chennai', 'Low'),
      (2, 'Arvind Bose', 'Kolkata', 'Medium'),
      (3, 'Tanya Kapoor', 'Delhi', 'Low'),
      (4, 'Rajiv Menon', 'Mumbai', 'High'),
      (5, 'Sneha Pillai', 'Bangalore', 'Low'),
      (6, 'Farhan Qureshi', 'Hyderabad', 'Medium'),
      (7, 'Ishita Ghosh', 'Kolkata', 'High'),
      (8, 'Nikhil Deshmukh', 'Pune', 'Low');
    INSERT INTO accounts (id, customer_id, account_type, balance, status) VALUES
      (1, 1, 'Savings', 45000, 'active'),
      (2, 1, 'Current', 12000, 'active'),
      (3, 2, 'Savings', 8000, 'dormant'),
      (4, 3, 'Savings', 95000, 'active'),
      (5, 3, 'Loan', -150000, 'active'),
      (6, 4, 'Current', 230000, 'active'),
      (7, 4, 'Savings', 15000, 'closed'),
      (8, 5, 'Savings', 6000, 'active'),
      (9, 6, 'Current', 42000, 'active'),
      (10, 7, 'Savings', 310000, 'active'),
      (11, 7, 'Loan', -80000, 'dormant'),
      (12, 8, 'Savings', 0, 'dormant');
  `,
  schemaPreview: [
    { table: "customers", columns: ["id", "name", "city", "risk_tier"] },
    {
      table: "accounts",
      columns: ["id", "customer_id", "account_type", "balance", "status"],
    },
  ],
  expectedColumns: ["active_count", "dormant_count", "closed_count"],
  expectedRows: [
    [8, 3, 1],
  ],
  requireRowOrder: false,
  hints: [
    "COUNT(CASE WHEN status = 'active' THEN 1 END) counts only the matching rows — everything else becomes NULL, and COUNT ignores NULLs.",
    "Three of those expressions side by side, no GROUP BY at all — the whole table collapses into one row.",
    "Try: SELECT COUNT(CASE WHEN status = 'active' THEN 1 END) AS active_count, COUNT(CASE WHEN status = 'dormant' THEN 1 END) AS dormant_count, COUNT(CASE WHEN status = 'closed' THEN 1 END) AS closed_count FROM accounts;",
  ],
  xpAward: 225,
};
