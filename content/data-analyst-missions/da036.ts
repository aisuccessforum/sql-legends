import type { Mission } from "../missions/level001";

export const da036: Mission = {
  id: "da-ticket-036",
  world: "Northgate Bank",
  levelLabel: "Ticket DA-036 // Priority: High",
  npc: "PRINCIPAL DATA ANALYST NEIL FERNANDES",
  briefing: [
    "10:50 AM. Client: Northgate Bank. Priority: High.",
    "\"Your turn to build one. Create a view called high_value_customers, showing each customer's name and total balance across all their accounts, but only customers whose total exceeds 100,000. Then list just the names from it.\"",
    "\"CREATE VIEW view_name AS, followed by the query that defines it, ending in a semicolon. After that, query the view by name like any table — in the same submission, as a second statement.\"",
  ],
  objective:
    "Create a view called high_value_customers showing customer names and total balances over 100000, then select the names from it.",
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
  expectedRows: [["Ishita Ghosh"], ["Rajiv Menon"]],
  requireRowOrder: false,
  hints: [
    "The view definition itself is a normal JOIN + GROUP BY + HAVING query, the same shape you've written many times — CREATE VIEW just wraps a name around it.",
    "Once created, the second statement can reference the view by name in FROM, exactly like a table.",
    "Try: CREATE VIEW high_value_customers AS SELECT c.name, SUM(a.balance) AS total_balance FROM customers c JOIN accounts a ON c.id = a.customer_id GROUP BY c.name HAVING SUM(a.balance) > 100000; SELECT name FROM high_value_customers;",
  ],
  xpAward: 225,
};
