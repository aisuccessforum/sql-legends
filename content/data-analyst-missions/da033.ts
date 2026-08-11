import type { Mission } from "../missions/level001";

export const da033: Mission = {
  id: "da-ticket-033",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-033 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "09:00 AM. Client: Northgate Bank. Priority: Medium.",
    "New module — views. Someone already built active_accounts_view for this database, joining accounts to customers and filtering to active status.",
    "\"A view is a saved query with a name. Once it exists, you query it exactly like a regular table — you don't need to know or repeat the JOIN and WHERE that built it.\"",
    "\"Pull every active account's customer name and balance, straight from the view.\"",
  ],
  objective: "Using active_accounts_view, select every active account's customer name and balance.",
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
    ["Meera Chandrasekaran", 45000],
    ["Meera Chandrasekaran", 12000],
    ["Tanya Kapoor", 95000],
    ["Tanya Kapoor", -150000],
    ["Rajiv Menon", 230000],
    ["Sneha Pillai", 6000],
    ["Farhan Qureshi", 42000],
    ["Ishita Ghosh", 310000],
  ],
  requireRowOrder: false,
  hints: [
    "No JOIN needed here — active_accounts_view already has the join and filter baked in.",
    "Treat it exactly like a table in FROM.",
    "Try: SELECT customer_name, balance FROM active_accounts_view;",
  ],
  xpAward: 175,
};
