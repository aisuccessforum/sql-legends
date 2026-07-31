import type { Mission } from "../missions/level001";

export const junior044: Mission = {
  id: "junior-ticket-044",
  world: "AstraMind Analytics",
  levelLabel: "Ticket JDA-044 // Priority: Critical",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "03:45 PM. Internal system. Priority: Critical.",
    "\"Last one on advanced joins. Build one combined outreach list — employees scoring below their own department's average, and separately, Northgate customers with no active accounts at all. Both need a check-in, from different teams, for different reasons.\"",
    "\"Two completely different data problems, merged into one list, each row labeled with which type it is. This is what the job actually looks like — nobody hands you a single clean table anymore.\"",
  ],
  objective:
    "Select a combined list of employee names (below their department average) and customer names (with no active accounts), each labeled with a contact_type of 'Employee' or 'Customer'.",
  schemaLabel: "employees, customers, accounts",
  seedSql: `
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      status TEXT,
      role TEXT,
      tenure_months INTEGER,
      performance_score INTEGER
    );
    INSERT INTO employees (id, name, department, status, role, tenure_months, performance_score) VALUES
      (1, 'Rhea Kapoor', 'Data Analytics', 'active', 'Analyst', 10, 82),
      (2, 'Aman Gupta', 'Data Analytics', 'active', 'Analyst', 5, 91),
      (3, 'Simran Kaur', 'Data Analytics', 'on_leave', 'Analyst', 20, 76),
      (4, 'Farhan Sheikh', 'Business Intelligence', 'active', 'Consultant', 14, 88),
      (5, 'Pooja Desai', 'Business Intelligence', 'active', 'Consultant', 7, 95),
      (6, 'Rahul Bose', 'Business Intelligence', 'terminated', 'Consultant', 30, 60),
      (7, 'Tanvi Shetty', 'Data Engineering', 'active', 'Engineer', 3, 70),
      (8, 'Kunal Saxena', 'Data Engineering', 'active', 'Engineer', 16, 85),
      (9, 'Anjali Rathore', 'Data Engineering', 'active', 'Engineer', 9, 92),
      (10, 'Vivek Nanda', 'Dashboard Development', 'active', 'Developer', 11, 79),
      (11, 'Meher Ahluwalia', 'Dashboard Development', 'on_leave', 'Developer', 22, 68),
      (12, 'Siddharth Oberoi', 'Dashboard Development', 'active', 'Developer', 6, 90);
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
    {
      table: "employees",
      columns: [
        "id",
        "name",
        "department",
        "status",
        "role",
        "tenure_months",
        "performance_score",
      ],
    },
    { table: "customers", columns: ["id", "name", "city", "risk_tier"] },
    {
      table: "accounts",
      columns: ["id", "customer_id", "account_type", "balance", "status"],
    },
  ],
  expectedColumns: ["name", "contact_type"],
  expectedRows: [
    ["Arvind Bose", "Customer"],
    ["Meher Ahluwalia", "Employee"],
    ["Nikhil Deshmukh", "Customer"],
    ["Rahul Bose", "Employee"],
    ["Rhea Kapoor", "Employee"],
    ["Simran Kaur", "Employee"],
    ["Tanvi Shetty", "Employee"],
  ],
  requireRowOrder: false,
  hints: [
    "Build each half separately first: a CTE-based department-average comparison for employees, and a NOT EXISTS check for customers with no active accounts. Confirm each works on its own before combining.",
    "Both SELECT statements need exactly two columns, in the same order, with the same meaning, for UNION to combine them correctly — name, then a literal text label.",
    "Try: WITH dept_avg AS (SELECT department, AVG(performance_score) AS avg_score FROM employees GROUP BY department) SELECT e.name, 'Employee' AS contact_type FROM employees e JOIN dept_avg da ON e.department = da.department WHERE e.performance_score < da.avg_score UNION SELECT c.name, 'Customer' AS contact_type FROM customers c WHERE NOT EXISTS (SELECT 1 FROM accounts a WHERE a.customer_id = c.id AND a.status = 'active');",
  ],
  xpAward: 250,
};
