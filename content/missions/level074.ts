import type { Mission } from "./level001";

export const level074: Mission = {
  id: "intern-ticket-074",
  world: "Northgate Bank",
  levelLabel: "Ticket INT-074 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "03:10 PM. Client: Northgate Bank. Priority: Medium.",
    "\"Tag every account by its financial state — 'Overdrawn' if the balance is negative, 'Empty' if it's exactly zero, otherwise 'Funded'. Customer name and account type alongside it.\"",
  ],
  objective:
    "For every account, select the customer name, account type, and a state label: 'Overdrawn' if negative, 'Empty' if zero, otherwise 'Funded'.",
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
    "This is a join, plus a per-row label based on a number — you've combined a join with a labeling technique before, just not on this dataset.",
    "Three outcomes, checked in a specific order: negative first, then exactly zero, then everything else.",
    "Try: SELECT c.name, a.account_type, CASE WHEN a.balance < 0 THEN 'Overdrawn' WHEN a.balance = 0 THEN 'Empty' ELSE 'Funded' END AS account_state FROM accounts a JOIN customers c ON a.customer_id = c.id;",
  ],
  expectedColumns: ["name", "account_type", "account_state"],
  expectedRows: [
    ["Meera Chandrasekaran", "Savings", "Funded"],
    ["Meera Chandrasekaran", "Current", "Funded"],
    ["Arvind Bose", "Savings", "Funded"],
    ["Tanya Kapoor", "Savings", "Funded"],
    ["Tanya Kapoor", "Loan", "Overdrawn"],
    ["Rajiv Menon", "Current", "Funded"],
    ["Rajiv Menon", "Savings", "Funded"],
    ["Sneha Pillai", "Savings", "Funded"],
    ["Farhan Qureshi", "Current", "Funded"],
    ["Ishita Ghosh", "Savings", "Funded"],
    ["Ishita Ghosh", "Loan", "Overdrawn"],
    ["Nikhil Deshmukh", "Savings", "Empty"],
  ],
  requireRowOrder: false,
  xpAward: 125,
};
