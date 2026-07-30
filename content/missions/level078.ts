import type { Mission } from "./level001";

export const level078: Mission = {
  id: "intern-ticket-078",
  world: "Northgate Bank",
  levelLabel: "Ticket INT-078 // Final Assessment 3 of 5",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:30 AM. Final Internship Assessment. Priority: Critical.",
    "\"Northgate wants a re-engagement list — every customer who doesn't currently have a single active account. That includes anyone whose only accounts are dormant or closed, and it would include anyone with no accounts at all, if we had one.\"",
    "\"This is the hardest one today. Think carefully about what 'zero active accounts' actually means for someone who has several accounts, all inactive, versus someone with none.\"",
  ],
  objective:
    "Select the name of every customer who has no active accounts at all.",
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
    "A regular JOIN would silently drop customers with no accounts at all — you need the version that keeps every customer regardless of matches.",
    "Score each account 1 or 0 for being active, sum that per customer, and keep only the customers where that sum is 0 — a technique you've used before, just applied to a new question.",
    "Try: SELECT c.name FROM customers c LEFT JOIN accounts a ON c.id = a.customer_id GROUP BY c.name HAVING SUM(CASE WHEN a.status = 'active' THEN 1 ELSE 0 END) = 0;",
  ],
  expectedColumns: ["name"],
  expectedRows: [["Arvind Bose"], ["Nikhil Deshmukh"]],
  requireRowOrder: false,
  xpAward: 250,
};
