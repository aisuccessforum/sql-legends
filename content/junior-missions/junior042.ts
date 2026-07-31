import type { Mission } from "../missions/level001";

export const junior042: Mission = {
  id: "junior-ticket-042",
  world: "Northgate Bank",
  levelLabel: "Ticket JDA-042 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "02:15 PM. Client: Northgate Bank. Priority: Medium.",
    "\"You've already solved this exact problem with IN, weeks ago — customers holding at least one active account. Solve it again with EXISTS. It's the more natural tool once the check is 'does a matching row exist at all,' rather than 'does this value appear in a specific list.'\"",
  ],
  objective:
    "Using EXISTS, select the name of every customer who has at least one active account.",
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
  expectedColumns: ["name"],
  expectedRows: [
    ["Meera Chandrasekaran"],
    ["Tanya Kapoor"],
    ["Rajiv Menon"],
    ["Sneha Pillai"],
    ["Farhan Qureshi"],
    ["Ishita Ghosh"],
  ],
  requireRowOrder: false,
  hints: [
    "EXISTS takes a subquery and just checks whether it returns any rows at all — the actual values don't matter, only whether something matched.",
    "The subquery needs to be correlated: it references the outer customer's id, filtered to active status.",
    "Try: SELECT c.name FROM customers c WHERE EXISTS (SELECT 1 FROM accounts a WHERE a.customer_id = c.id AND a.status = 'active');",
  ],
  xpAward: 200,
};
