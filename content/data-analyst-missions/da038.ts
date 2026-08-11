import type { Mission } from "../missions/level001";

export const da038: Mission = {
  id: "da-ticket-038",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-038 // Priority: Critical",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "12:10 PM. Client: Northgate Bank. Priority: Critical.",
    "\"Last one on views. Create account_summary_view joining every account to its customer's name. Then, from that view, label each active account's financial state — Overdrawn, Empty, or Funded — same labels you've used before.\"",
    "\"The view itself stays simple — just the join, no filtering. All the real logic happens in how you query it afterward.\"",
  ],
  objective:
    "Create a view called account_summary_view joining accounts to customer names, then select the customer name, account type, and a financial state label (Overdrawn, Empty, or Funded) for active accounts only.",
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
  expectedColumns: ["name", "account_type", "account_state"],
  expectedRows: [
    ["Meera Chandrasekaran", "Savings", "Funded"],
    ["Meera Chandrasekaran", "Current", "Funded"],
    ["Tanya Kapoor", "Savings", "Funded"],
    ["Tanya Kapoor", "Loan", "Overdrawn"],
    ["Rajiv Menon", "Current", "Funded"],
    ["Sneha Pillai", "Savings", "Funded"],
    ["Farhan Qureshi", "Current", "Funded"],
    ["Ishita Ghosh", "Savings", "Funded"],
  ],
  requireRowOrder: false,
  hints: [
    "Keep the view unfiltered — just accounts joined to customer names, status included as a plain column.",
    "The status filter and the CASE label both belong in the second statement, querying the view.",
    "Try: CREATE VIEW account_summary_view AS SELECT c.name, a.account_type, a.balance, a.status FROM accounts a JOIN customers c ON a.customer_id = c.id; SELECT name, account_type, CASE WHEN balance < 0 THEN 'Overdrawn' WHEN balance = 0 THEN 'Empty' ELSE 'Funded' END AS account_state FROM account_summary_view WHERE status = 'active';",
  ],
  xpAward: 250,
};
