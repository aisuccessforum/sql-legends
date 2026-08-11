import type { Mission } from "../missions/level001";

export const da037: Mission = {
  id: "da-ticket-037",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-037 // Priority: Medium",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "11:30 AM. Client: Northgate Bank. Priority: Medium.",
    "\"One more. Create a view called dormant_accounts_view showing accounts that are dormant or closed, with the customer's name and city attached. Then, from that view, list just the customers based in Kolkata.\"",
  ],
  objective:
    "Create a view called dormant_accounts_view showing dormant or closed accounts with customer name and city, then select the customer names for Kolkata only.",
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
  expectedColumns: ["customer_name"],
  expectedRows: [["Arvind Bose"], ["Ishita Ghosh"]],
  requireRowOrder: false,
  hints: [
    "The view's WHERE needs status IN ('dormant', 'closed') — an IN check you've used many times before.",
    "The view carries the city column through so the second statement can filter on it without joining anything again.",
    "Try: CREATE VIEW dormant_accounts_view AS SELECT a.id, a.customer_id, a.status, c.name AS customer_name, c.city FROM accounts a JOIN customers c ON a.customer_id = c.id WHERE a.status IN ('dormant', 'closed'); SELECT customer_name FROM dormant_accounts_view WHERE city = 'Kolkata';",
  ],
  xpAward: 225,
};
