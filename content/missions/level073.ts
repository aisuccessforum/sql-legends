import type { Mission } from "./level001";

export const level073: Mission = {
  id: "intern-ticket-073",
  world: "Northgate Bank",
  levelLabel: "Ticket INT-073 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "02:30 PM. Client: Northgate Bank. Priority: High.",
    "\"Compliance needs a review sheet — every active account, with the customer's name and risk tier attached, plus what kind of account it is and the balance. Dormant and closed accounts aren't in scope for this review.\"",
  ],
  objective:
    "Select the customer name, risk tier, account type, and balance for every account with status 'active'.",
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
  hints: [
    "Four columns from two different tables, plus a filter — nothing here is new on its own, it's just the first time you've combined this many pieces.",
    "The status you're filtering on belongs to the account, not the customer — reference it from the right alias.",
    "Try: SELECT c.name, c.risk_tier, a.account_type, a.balance FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE a.status = 'active';",
  ],
  expectedColumns: ["name", "risk_tier", "account_type", "balance"],
  expectedRows: [
    ["Meera Chandrasekaran", "Low", "Savings", 45000],
    ["Meera Chandrasekaran", "Low", "Current", 12000],
    ["Tanya Kapoor", "Low", "Savings", 95000],
    ["Tanya Kapoor", "Low", "Loan", -150000],
    ["Rajiv Menon", "High", "Current", 230000],
    ["Sneha Pillai", "Low", "Savings", 6000],
    ["Farhan Qureshi", "Medium", "Current", 42000],
    ["Ishita Ghosh", "High", "Savings", 310000],
  ],
  requireRowOrder: false,
  xpAward: 125,
};
