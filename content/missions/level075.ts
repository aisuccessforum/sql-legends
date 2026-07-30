import type { Mission } from "./level001";

export const level075: Mission = {
  id: "intern-ticket-075",
  world: "Northgate Bank",
  levelLabel: "Ticket INT-075 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "04:00 PM. Client: Northgate Bank. Priority: High.",
    "\"Last ticket before the final assessment. High-risk customers, active accounts only — name, account type, balance, largest balance first. This decides who gets pulled for manual review before anything moves further down the pipeline.\"",
    "\"You've made every decision on this whole batch of tickets yourself — which technique, which conditions, how to combine them. That's the actual job now. The final assessment is just more of exactly this.\"",
  ],
  objective:
    "For active accounts belonging to customers with a 'High' risk tier, select the customer name, account type, and balance, sorted from highest balance to lowest.",
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
    "Two separate filter conditions here, on two different tables, plus a sort at the end — you've used every one of these pieces before, just not all together on one ticket.",
    "One condition checks the customer's risk tier, the other checks the account's status — both have to be true for a row to make the cut.",
    "Try: SELECT c.name, a.account_type, a.balance FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE c.risk_tier = 'High' AND a.status = 'active' ORDER BY a.balance DESC;",
  ],
  expectedColumns: ["name", "account_type", "balance"],
  expectedRows: [
    ["Ishita Ghosh", "Savings", 310000],
    ["Rajiv Menon", "Current", 230000],
  ],
  requireRowOrder: true,
  xpAward: 125,
};
