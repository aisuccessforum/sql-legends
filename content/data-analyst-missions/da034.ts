import type { Mission } from "../missions/level001";

export const da034: Mission = {
  id: "da-ticket-034",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-034 // Priority: Low",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:35 AM. Client: Northgate Bank. Priority: Low.",
    "\"Same view, narrower question — which active accounts are actually sitting on serious money, over 50,000?\"",
  ],
  objective:
    "Using active_accounts_view, select the customer name and balance of every active account with a balance over 50000.",
  schemaLabel: "customers, accounts, active_accounts_view",
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
    CREATE VIEW active_accounts_view AS
      SELECT a.id, a.customer_id, a.account_type, a.balance, a.status,
             c.name AS customer_name, c.risk_tier
      FROM accounts a JOIN customers c ON a.customer_id = c.id
      WHERE a.status = 'active';
  `,
  schemaPreview: [
    { table: "customers", columns: ["id", "name", "city", "risk_tier"] },
    {
      table: "accounts",
      columns: ["id", "customer_id", "account_type", "balance", "status"],
    },
    {
      table: "active_accounts_view",
      columns: [
        "id",
        "customer_id",
        "account_type",
        "balance",
        "status",
        "customer_name",
        "risk_tier",
      ],
    },
  ],
  expectedColumns: ["customer_name", "balance"],
  expectedRows: [
    ["Tanya Kapoor", 95000],
    ["Rajiv Menon", 230000],
    ["Ishita Ghosh", 310000],
  ],
  requireRowOrder: false,
  hints: [
    "A regular WHERE, filtering on the view's own balance column, exactly as if it were a table column.",
    "The view already excludes dormant and closed accounts — you're only narrowing an already-filtered set further.",
    "Try: SELECT customer_name, balance FROM active_accounts_view WHERE balance > 50000;",
  ],
  xpAward: 150,
};
