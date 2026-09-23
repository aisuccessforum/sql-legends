export interface StudyModule {
  id: string;
  num: number;
  title: string;
  tags: string[];
  ticketRange: string;
  startIdx: number;
  endIdx: number;
  concept: string;
  syntax: string;
  keyPoints: string[];
}

export interface RankStudy {
  rank: string;
  npc: string;
  tagline: string;
  totalTickets: number;
  modules: StudyModule[];
}

export const RANK_ORDER = [
  "Intern","Junior Data Analyst","Data Analyst","Senior Data Analyst",
  "BI Developer","Analytics Engineer","Data Engineer","Staff Analyst","Principal Analyst",
];

export const allRankStudy: RankStudy[] = 
[
  {
    "rank": "Intern",
    "npc": "Team Lead Malhotra",
    "tagline": "Master the fundamentals. Every expert started here.",
    "totalTickets": 80,
    "modules": [
      {
        "id": "intern-m1",
        "num": 1,
        "title": "SELECT & FROM",
        "tags": [
          "SELECT",
          "FROM",
          "*",
          "columns"
        ],
        "ticketRange": "INT-001 → INT-010",
        "startIdx": 0,
        "endIdx": 9,
        "concept": "SELECT tells the database which columns to return; FROM tells it which table to look in. You can select all columns with * or name specific ones. Column order in SELECT determines the output order.",
        "syntax": "-- All columns\nSELECT * FROM employees;\n\n-- Specific columns\nSELECT name, salary, department\nFROM employees;\n\n-- Alias a column\nSELECT name AS employee_name, salary AS base_pay\nFROM employees;",
        "keyPoints": [
          "SELECT * returns every column — use named columns in production to avoid surprises when schema changes",
          "Column aliases (AS) rename output headers without touching the table",
          "SQL keywords are case-insensitive — SELECT and select are identical",
          "Semicolons end a statement; most engines tolerate their absence in single-statement queries"
        ]
      },
      {
        "id": "intern-m2",
        "num": 2,
        "title": "WHERE & filtering",
        "tags": [
          "WHERE",
          "AND",
          "OR",
          "IN",
          "BETWEEN",
          "LIKE"
        ],
        "ticketRange": "INT-011 → INT-020",
        "startIdx": 10,
        "endIdx": 19,
        "concept": "WHERE filters rows before they reach your SELECT. Conditions are evaluated per row — only rows where the expression is TRUE survive. Combine conditions with AND (both must be true) and OR (either must be true).",
        "syntax": "-- Comparison\nSELECT * FROM orders WHERE amount > 1000;\n\n-- Range\nSELECT * FROM orders WHERE amount BETWEEN 500 AND 2000;\n\n-- List\nSELECT * FROM orders WHERE status IN ('pending','processing');\n\n-- Pattern\nSELECT * FROM customers WHERE name LIKE 'A%';",
        "keyPoints": [
          "AND has higher precedence than OR — use parentheses when mixing both",
          "BETWEEN is inclusive on both ends: BETWEEN 1 AND 10 includes 1 and 10",
          "IN is shorthand for multiple OR conditions on the same column",
          "LIKE patterns: % matches any sequence, _ matches exactly one character"
        ]
      },
      {
        "id": "intern-m3",
        "num": 3,
        "title": "ORDER BY & LIMIT",
        "tags": [
          "ORDER BY",
          "LIMIT",
          "OFFSET",
          "ASC",
          "DESC"
        ],
        "ticketRange": "INT-021 → INT-030",
        "startIdx": 20,
        "endIdx": 29,
        "concept": "ORDER BY sorts the result set by one or more columns. Without it SQL makes no guarantee about row order. LIMIT caps how many rows you get back — essential for top-N queries and pagination.",
        "syntax": "-- Sort descending, take top 5\nSELECT name, revenue FROM sales_reps\nORDER BY revenue DESC LIMIT 5;\n\n-- Pagination: skip first 10, get next 5\nSELECT * FROM products\nORDER BY created_at DESC LIMIT 5 OFFSET 10;",
        "keyPoints": [
          "ASC is the default sort direction — you can omit it",
          "ORDER BY can reference column positions (ORDER BY 2 DESC) but named columns are clearer",
          "LIMIT without ORDER BY returns arbitrary rows — always pair them for predictable results",
          "OFFSET n skips the first n rows — useful for page 2, 3, etc. of paginated results"
        ]
      },
      {
        "id": "intern-m4",
        "num": 4,
        "title": "Aggregate functions",
        "tags": [
          "COUNT",
          "SUM",
          "AVG",
          "MIN",
          "MAX"
        ],
        "ticketRange": "INT-031 → INT-040",
        "startIdx": 30,
        "endIdx": 39,
        "concept": "Aggregate functions collapse many rows into a single value. COUNT(*) counts rows; SUM/AVG/MIN/MAX operate on numeric columns. They ignore NULLs except COUNT(*), which counts every row regardless.",
        "syntax": "SELECT\n  COUNT(*)              AS total_rows,\n  COUNT(email)          AS non_null_emails,\n  SUM(revenue)          AS total_rev,\n  ROUND(AVG(revenue),2) AS avg_rev,\n  MIN(revenue)          AS min_rev,\n  MAX(revenue)          AS max_rev\nFROM sales_reps;",
        "keyPoints": [
          "COUNT(*) counts all rows; COUNT(col) counts non-NULL values in that column",
          "AVG ignores NULLs — a column with 8 values and 2 NULLs averages across 8, not 10",
          "ROUND(value, decimals) prevents float noise in AVG results",
          "You can combine multiple aggregates in one SELECT — they all run in a single pass"
        ]
      },
      {
        "id": "intern-m5",
        "num": 5,
        "title": "GROUP BY & HAVING",
        "tags": [
          "GROUP BY",
          "HAVING",
          "aggregate",
          "filter groups"
        ],
        "ticketRange": "INT-041 → INT-050",
        "startIdx": 40,
        "endIdx": 49,
        "concept": "GROUP BY splits rows into groups then aggregates each group independently. HAVING filters groups after aggregation — it is to GROUP BY what WHERE is to individual rows.",
        "syntax": "SELECT department, COUNT(*) AS reps, SUM(revenue) AS total\nFROM sales_reps\nGROUP BY department\nHAVING SUM(revenue) > 100000\nORDER BY total DESC;",
        "keyPoints": [
          "Every column in SELECT must be either in GROUP BY or wrapped in an aggregate",
          "HAVING filters groups; WHERE filters rows before grouping — they run at different stages",
          "You can GROUP BY multiple columns: each unique combination becomes one group",
          "HAVING can reference aggregate expressions directly: HAVING COUNT(*) >= 3"
        ]
      },
      {
        "id": "intern-m6",
        "num": 6,
        "title": "JOINs",
        "tags": [
          "JOIN",
          "INNER JOIN",
          "LEFT JOIN",
          "ON"
        ],
        "ticketRange": "INT-051 → INT-060",
        "startIdx": 50,
        "endIdx": 59,
        "concept": "JOINs combine rows from two tables based on a matching condition. INNER JOIN returns only rows with a match in both tables. LEFT JOIN keeps all rows from the left table even when there is no match in the right.",
        "syntax": "-- Inner join: only matched rows\nSELECT o.order_id, c.name, o.amount\nFROM orders o\nJOIN customers c ON o.customer_id = c.id;\n\n-- Left join: all orders, customer name or NULL\nSELECT o.order_id, c.name, o.amount\nFROM orders o\nLEFT JOIN customers c ON o.customer_id = c.id;",
        "keyPoints": [
          "Table aliases (o, c) shorten column references and are required when column names clash",
          "ON specifies the match condition — usually a foreign key equals a primary key",
          "LEFT JOIN preserves unmatched left rows; right-side columns are NULL for those rows",
          "JOIN order matters for LEFT JOIN — the 'left' table is whichever comes first in FROM"
        ]
      },
      {
        "id": "intern-m7",
        "num": 7,
        "title": "Subqueries",
        "tags": [
          "subquery",
          "IN",
          "EXISTS",
          "scalar subquery"
        ],
        "ticketRange": "INT-061 → INT-070",
        "startIdx": 60,
        "endIdx": 69,
        "concept": "A subquery is a SELECT inside another SELECT. They can appear in WHERE (as a filter), in FROM (as a derived table), or in SELECT (as a scalar value).",
        "syntax": "-- Subquery in WHERE\nSELECT name FROM employees\nWHERE dept_id IN (SELECT id FROM departments WHERE budget > 500000);\n\n-- Scalar subquery in SELECT\nSELECT name, salary,\n  (SELECT AVG(salary) FROM employees) AS company_avg\nFROM employees;",
        "keyPoints": [
          "A subquery in IN must return exactly one column",
          "Scalar subqueries (in SELECT) must return exactly one row and one column",
          "Subqueries can reference outer query columns — this makes them correlated and reruns per row",
          "CTEs (WITH ...) are usually cleaner than nested subqueries for anything beyond one level"
        ]
      },
      {
        "id": "intern-m8",
        "num": 8,
        "title": "Final assessment",
        "tags": [
          "SELECT",
          "JOIN",
          "GROUP BY",
          "WHERE",
          "ORDER BY"
        ],
        "ticketRange": "INT-071 → INT-080",
        "startIdx": 70,
        "endIdx": 79,
        "concept": "The final ten tickets combine everything from the rank: filtering, aggregation, joins, and subqueries in multi-step queries. Each ticket is a realistic question a manager would ask on your first week.",
        "syntax": "SELECT d.name AS dept, COUNT(e.id) AS headcount,\n  ROUND(AVG(e.salary),0) AS avg_salary\nFROM departments d\nJOIN employees e ON e.dept_id = d.id\nWHERE e.active = 1\nGROUP BY d.name\nHAVING COUNT(e.id) >= 3\nORDER BY avg_salary DESC;",
        "keyPoints": [
          "Read the objective carefully — it is the spec, not a suggestion",
          "Build complex queries layer by layer: join first, then WHERE, then GROUP BY",
          "Use column aliases in GROUP BY when the expression is complex — SQLite allows it",
          "If stuck, run a simpler version first and add conditions one at a time"
        ]
      }
    ]
  },
  {
    "rank": "Junior Data Analyst",
    "npc": "Senior Analyst Kavya Rathi",
    "tagline": "Move beyond basics. Real data is messy and multi-table.",
    "totalTickets": 50,
    "modules": [
      {
        "id": "jda-m1",
        "num": 1,
        "title": "DISTINCT & aliases",
        "tags": [
          "DISTINCT",
          "AS",
          "COUNT DISTINCT",
          "table alias"
        ],
        "ticketRange": "JDA-001 → JDA-008",
        "startIdx": 0,
        "endIdx": 7,
        "concept": "DISTINCT removes duplicate rows from results. Aliases (AS) rename columns or tables. Table aliases are especially useful in multi-table queries to avoid ambiguous column references.",
        "syntax": "-- Unique values\nSELECT DISTINCT department FROM employees;\n\n-- Column alias\nSELECT department AS dept, COUNT(*) AS headcount\nFROM employees GROUP BY department;\n\n-- COUNT DISTINCT\nSELECT COUNT(DISTINCT customer_id) AS unique_customers FROM orders;",
        "keyPoints": [
          "DISTINCT applies to the entire row, not a single column",
          "AS is optional — 'SELECT name emp_name' works but AS is clearer",
          "Table aliases must be used consistently once declared in a query",
          "COUNT(DISTINCT col) counts unique non-NULL values in that column"
        ]
      },
      {
        "id": "jda-m2",
        "num": 2,
        "title": "Multi-table JOINs",
        "tags": [
          "3-table JOIN",
          "chain JOIN",
          "ON",
          "NULL rows"
        ],
        "ticketRange": "JDA-009 → JDA-016",
        "startIdx": 8,
        "endIdx": 15,
        "concept": "Real schemas span many tables. Chain multiple JOINs in one query — each JOIN adds another table to the working row set.",
        "syntax": "SELECT o.id, c.name, p.product_name, o.qty\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nJOIN products  p ON o.product_id  = p.id\nWHERE o.status = 'shipped'\nORDER BY o.created_at DESC;",
        "keyPoints": [
          "Each JOIN introduces a new ON condition — one per table added",
          "LEFT JOIN on a middle table can produce unexpected NULLs in later columns",
          "When two tables share a column name, always prefix with the alias: o.id not just id",
          "Check row counts after each JOIN — unexpectedly high counts usually mean a missing ON condition"
        ]
      },
      {
        "id": "jda-m3",
        "num": 3,
        "title": "CASE WHEN",
        "tags": [
          "CASE",
          "WHEN",
          "THEN",
          "ELSE",
          "conditional aggregation"
        ],
        "ticketRange": "JDA-017 → JDA-024",
        "startIdx": 16,
        "endIdx": 23,
        "concept": "CASE WHEN is SQL's if-then-else. It evaluates conditions in order and returns the first THEN that is true. The ELSE clause is the fallback — without it, unmatched rows return NULL.",
        "syntax": "SELECT name, revenue,\n  CASE\n    WHEN revenue >= 100000 THEN 'High'\n    WHEN revenue >= 50000  THEN 'Medium'\n    ELSE 'Low'\n  END AS tier\nFROM sales_reps;\n\n-- Conditional aggregate\nSELECT SUM(CASE WHEN status='won' THEN revenue ELSE 0 END) AS won_rev\nFROM deals;",
        "keyPoints": [
          "Conditions are checked top to bottom — once a WHEN is true, the rest are skipped",
          "Omitting ELSE returns NULL for unmatched rows — always add an explicit ELSE unless NULL is intentional",
          "SUM(CASE WHEN ... THEN value END) is the SQLite pattern for conditional aggregation (no SUMIF)",
          "CASE can be nested, but more than 2 levels is a sign the logic belongs in a CTE"
        ]
      },
      {
        "id": "jda-m4",
        "num": 4,
        "title": "Correlated subqueries",
        "tags": [
          "correlated",
          "EXISTS",
          "per-row subquery",
          "outer query"
        ],
        "ticketRange": "JDA-025 → JDA-033",
        "startIdx": 24,
        "endIdx": 32,
        "concept": "A correlated subquery references a column from the outer query. It re-executes for every outer row, making it powerful for row-level comparisons (is this row above its group average?).",
        "syntax": "-- Above-average salary in same department\nSELECT name, salary, department\nFROM employees e1\nWHERE salary > (\n  SELECT AVG(salary)\n  FROM employees e2\n  WHERE e2.department = e1.department\n);",
        "keyPoints": [
          "The outer query alias (e1) is referenced inside the subquery — that is the correlation",
          "EXISTS returns TRUE/FALSE only — use it when you care about row presence, not values",
          "Correlated subqueries run once per outer row — on large tables prefer JOINs when possible",
          "SQLite handles correlated subqueries correctly but does not optimize them away — keep outer sets small"
        ]
      },
      {
        "id": "jda-m5",
        "num": 5,
        "title": "String & date functions",
        "tags": [
          "UPPER",
          "SUBSTR",
          "LENGTH",
          "strftime",
          "date math"
        ],
        "ticketRange": "JDA-034 → JDA-039",
        "startIdx": 33,
        "endIdx": 38,
        "concept": "SQLite includes built-in string functions (UPPER, LOWER, LENGTH, SUBSTR, REPLACE, TRIM) and date helpers via strftime(). Date arithmetic uses the date() function with modifiers like '+7 days'.",
        "syntax": "-- String\nSELECT UPPER(name), LENGTH(email), SUBSTR(phone,1,3) AS area\nFROM customers;\n\n-- Date\nSELECT order_date,\n  strftime('%Y-%m', order_date) AS yr_month,\n  date(order_date, '+30 days')  AS due_date\nFROM orders;",
        "keyPoints": [
          "SUBSTR(str, start, length) — start index is 1-based in SQLite, not 0",
          "strftime('%Y-%m-%d', col) formats dates; '%Y-%m' groups by month",
          "TRIM removes leading/trailing whitespace — always use it on user-input text columns",
          "Date comparison works on ISO strings ('2026-01-15') — always store dates in ISO format"
        ]
      },
      {
        "id": "jda-m6",
        "num": 6,
        "title": "NULL handling",
        "tags": [
          "NULL",
          "IS NULL",
          "COALESCE",
          "NULLIF",
          "IFNULL"
        ],
        "ticketRange": "JDA-040 → JDA-044",
        "startIdx": 39,
        "endIdx": 43,
        "concept": "NULL means 'unknown'. Any arithmetic with NULL returns NULL. Comparisons with NULL using = always return NULL, not TRUE or FALSE. Use IS NULL / IS NOT NULL for NULL checks.",
        "syntax": "-- NULL check\nSELECT * FROM leads WHERE assigned_to IS NULL;\n\n-- Default substitute\nSELECT name, COALESCE(phone, email, 'no contact') AS reach\nFROM contacts;\n\n-- Avoid divide by zero\nSELECT revenue / NULLIF(units, 0) AS rev_per_unit FROM products;",
        "keyPoints": [
          "= NULL never works — always use IS NULL or IS NOT NULL",
          "COALESCE returns the first non-NULL argument from its list",
          "NULLIF(a, b) returns NULL when a equals b — the classic divide-by-zero guard",
          "Aggregates silently skip NULLs — COUNT(col) != COUNT(*) when the column has NULLs"
        ]
      },
      {
        "id": "jda-m7",
        "num": 7,
        "title": "Final assessment",
        "tags": [
          "multi-table",
          "CASE",
          "NULL",
          "subqueries"
        ],
        "ticketRange": "JDA-045 → JDA-050",
        "startIdx": 44,
        "endIdx": 49,
        "concept": "Six capstone tickets combining JOINs, CASE WHEN, NULL handling, correlated subqueries, and string/date functions — the kind of ad-hoc requests a Junior Analyst receives in their first month.",
        "syntax": "SELECT c.name,\n  COALESCE(c.phone,'missing')  AS contact,\n  COUNT(o.id)                  AS orders,\n  ROUND(AVG(o.amount),2)       AS avg_order,\n  CASE WHEN COUNT(o.id)>5 THEN 'Loyal' ELSE 'New' END AS segment\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nGROUP BY c.id ORDER BY orders DESC;",
        "keyPoints": [
          "LEFT JOIN + GROUP BY is one of the most common real-world patterns — master it",
          "COALESCE and CASE can both live in the same SELECT",
          "Aggregate functions ignore NULLs — a LEFT JOIN with no matches gives COUNT=0, AVG=NULL",
          "Build the JOIN skeleton first, then layer in CASE and COALESCE last"
        ]
      }
    ]
  },
  {
    "rank": "Data Analyst",
    "npc": "Principal Data Analyst Neil Fernandes",
    "tagline": "Window functions unlock a new class of analysis. This is where SQL gets powerful.",
    "totalTickets": 50,
    "modules": [
      {
        "id": "da-m1",
        "num": 1,
        "title": "Window functions intro",
        "tags": [
          "OVER()",
          "window",
          "non-aggregating",
          "alongside rows"
        ],
        "ticketRange": "DA-001 → DA-008",
        "startIdx": 0,
        "endIdx": 7,
        "concept": "Window functions compute an aggregate over a set of rows related to the current row without collapsing them. They use OVER() to define the window. Unlike GROUP BY, every input row produces exactly one output row.",
        "syntax": "SELECT name, salary,\n  AVG(salary) OVER () AS company_avg,\n  salary - AVG(salary) OVER () AS diff_from_avg\nFROM employees;",
        "keyPoints": [
          "OVER() with nothing inside means the entire result set is the window",
          "Window functions run after WHERE and GROUP BY, before ORDER BY and LIMIT",
          "You cannot reference a window function alias in the same SELECT — wrap in a CTE",
          "Every window function produces one output row per input row — no rows are collapsed"
        ]
      },
      {
        "id": "da-m2",
        "num": 2,
        "title": "PARTITION BY",
        "tags": [
          "PARTITION BY",
          "per-group window",
          "reset",
          "independent"
        ],
        "ticketRange": "DA-009 → DA-016",
        "startIdx": 8,
        "endIdx": 15,
        "concept": "PARTITION BY divides rows into independent sub-windows. The window function resets and runs independently within each partition — like running GROUP BY internally but still outputting every row.",
        "syntax": "SELECT name, department, salary,\n  AVG(salary) OVER (PARTITION BY department) AS dept_avg,\n  salary - AVG(salary) OVER (PARTITION BY department) AS vs_dept\nFROM employees;",
        "keyPoints": [
          "PARTITION BY is to window functions what GROUP BY is to aggregates",
          "Without PARTITION BY the window spans all rows; with it each partition is independent",
          "You can PARTITION BY multiple columns: OVER (PARTITION BY dept, location)",
          "The same column can appear in both PARTITION BY and ORDER BY in the same OVER()"
        ]
      },
      {
        "id": "da-m3",
        "num": 3,
        "title": "ROW_NUMBER, RANK, DENSE_RANK",
        "tags": [
          "ROW_NUMBER",
          "RANK",
          "DENSE_RANK",
          "ties",
          "sequence"
        ],
        "ticketRange": "DA-017 → DA-024",
        "startIdx": 16,
        "endIdx": 23,
        "concept": "These three functions assign a sequential position to each row. ROW_NUMBER assigns unique numbers even on ties. RANK skips numbers after ties (1,1,3). DENSE_RANK never skips (1,1,2). All require ORDER BY inside OVER().",
        "syntax": "SELECT name, score,\n  ROW_NUMBER() OVER (ORDER BY score DESC) AS row_num,\n  RANK()       OVER (ORDER BY score DESC) AS rank,\n  DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank\nFROM leaderboard;",
        "keyPoints": [
          "ROW_NUMBER is non-deterministic on ties — same data may get different numbers on each run",
          "RANK leaves gaps: two rows tied at rank 1 means the next rank is 3, not 2",
          "DENSE_RANK never gaps — use it when you need compact sequential tiers",
          "Top-N per group: ROW_NUMBER() OVER (PARTITION BY group ORDER BY score DESC) then WHERE rn <= N"
        ]
      },
      {
        "id": "da-m4",
        "num": 4,
        "title": "LAG & LEAD",
        "tags": [
          "LAG",
          "LEAD",
          "previous row",
          "next row",
          "MoM"
        ],
        "ticketRange": "DA-025 → DA-032",
        "startIdx": 24,
        "endIdx": 31,
        "concept": "LAG accesses the value from a previous row in the ordered window; LEAD accesses the next row. The idiomatic SQL way to compute period-over-period changes without a self-join.",
        "syntax": "SELECT month, revenue,\n  LAG(revenue) OVER (ORDER BY month) AS prev_month,\n  ROUND(100.0*(revenue - LAG(revenue) OVER (ORDER BY month)) /\n    LAG(revenue) OVER (ORDER BY month), 1) AS pct_change\nFROM monthly_sales;",
        "keyPoints": [
          "LAG(col, 1) is shorthand for LAG(col) — default offset is 1",
          "LAG(col, 1, 0) provides 0 as the default when there is no previous row",
          "The first row always returns NULL from LAG — handle with COALESCE or IS NOT NULL filter",
          "Using LAG twice in one SELECT is fine — the engine computes it efficiently"
        ]
      },
      {
        "id": "da-m5",
        "num": 5,
        "title": "Running totals & moving averages",
        "tags": [
          "ROWS BETWEEN",
          "running total",
          "cumulative",
          "rolling avg"
        ],
        "ticketRange": "DA-033 → DA-038",
        "startIdx": 32,
        "endIdx": 37,
        "concept": "A frame clause inside OVER() restricts which rows contribute to the window. ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW gives a running total. ROWS BETWEEN 2 PRECEDING AND CURRENT ROW gives a 3-row rolling average.",
        "syntax": "SELECT month, revenue,\n  SUM(revenue) OVER (\n    ORDER BY month\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_total,\n  ROUND(AVG(revenue) OVER (\n    ORDER BY month\n    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n  ), 0) AS rolling_3m_avg\nFROM monthly_sales;",
        "keyPoints": [
          "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW is the standard running total frame",
          "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW includes current + 2 prior = 3-row window",
          "ORDER BY inside OVER() is mandatory when using a frame clause",
          "SUM() OVER (ORDER BY ...) without ROWS defaults to RANGE UNBOUNDED PRECEDING — be explicit"
        ]
      },
      {
        "id": "da-m6",
        "num": 6,
        "title": "PERCENT_RANK & CUME_DIST",
        "tags": [
          "PERCENT_RANK",
          "CUME_DIST",
          "NTILE",
          "percentile",
          "distribution"
        ],
        "ticketRange": "DA-039 → DA-044",
        "startIdx": 38,
        "endIdx": 43,
        "concept": "PERCENT_RANK gives each row's relative position from 0 (lowest) to 1 (highest). CUME_DIST gives the fraction of rows at or below this value — always ends at 1. Both require ORDER BY.",
        "syntax": "SELECT name, score,\n  ROUND(PERCENT_RANK() OVER (ORDER BY score), 3) AS pct_rank,\n  ROUND(CUME_DIST()   OVER (ORDER BY score), 3) AS cume_dist\nFROM scores ORDER BY score;",
        "keyPoints": [
          "PERCENT_RANK: first row = 0.0, last row = 1.0 — formula: (rank-1)/(n-1)",
          "CUME_DIST: fraction of rows <= current value — last row always = 1.0",
          "NTILE(n) divides rows into n roughly equal buckets — use it for quartiles and deciles",
          "To filter by percentile rank, wrap in a CTE first — window aliases can not be used in WHERE directly"
        ]
      },
      {
        "id": "da-m7",
        "num": 7,
        "title": "Final assessment",
        "tags": [
          "ROW_NUMBER",
          "LAG",
          "PARTITION BY",
          "running total"
        ],
        "ticketRange": "DA-045 → DA-050",
        "startIdx": 44,
        "endIdx": 49,
        "concept": "Six tickets requiring window functions in combination: ranking within partitions, period comparisons with LAG, running totals, and percentile calculations.",
        "syntax": "SELECT region, month, revenue,\n  RANK() OVER (PARTITION BY region ORDER BY revenue DESC) AS region_rank,\n  SUM(revenue) OVER (PARTITION BY region ORDER BY month) AS region_running,\n  LAG(revenue) OVER (PARTITION BY region ORDER BY month) AS prior_month\nFROM sales;",
        "keyPoints": [
          "Multiple window functions can share PARTITION BY / ORDER BY but each OVER() is independent",
          "A CTE that adds a window column is often the cleanest way to filter on window results",
          "PARTITION BY and ORDER BY can use different columns in the same OVER()",
          "If two window specs are identical, the engine typically computes them in one pass"
        ]
      }
    ]
  },
  {
    "rank": "Senior Data Analyst",
    "npc": "Head of Analytics Priya Venkatesh",
    "tagline": "CTEs make complex logic readable. Multi-step thinking separates seniors from juniors.",
    "totalTickets": 50,
    "modules": [
      {
        "id": "sda-m1",
        "num": 1,
        "title": "Simple CTEs",
        "tags": [
          "WITH",
          "CTE",
          "named subquery",
          "readability"
        ],
        "ticketRange": "SDA-001 → SDA-008",
        "startIdx": 0,
        "endIdx": 7,
        "concept": "A Common Table Expression (WITH clause) names a subquery so you can reference it like a table. It runs once, its result is materialised, and the main query reads from it. CTEs make multi-step logic readable.",
        "syntax": "WITH high_revenue AS (\n  SELECT * FROM customers WHERE total_revenue > 100000\n)\nSELECT segment, COUNT(*) AS count, AVG(total_revenue) AS avg_rev\nFROM high_revenue\nGROUP BY segment ORDER BY avg_rev DESC;",
        "keyPoints": [
          "CTEs are defined with WITH name AS (...) before the main SELECT",
          "Multiple CTEs are separated by commas: WITH a AS (...), b AS (...) SELECT ...",
          "A CTE can reference a preceding CTE in the same WITH block — they run in order",
          "CTEs do not persist after the query ends — they are scoped to a single statement"
        ]
      },
      {
        "id": "sda-m2",
        "num": 2,
        "title": "Multi-step CTE chains",
        "tags": [
          "chained CTEs",
          "pipeline",
          "step-by-step",
          "intermediate results"
        ],
        "ticketRange": "SDA-009 → SDA-016",
        "startIdx": 8,
        "endIdx": 15,
        "concept": "Chaining CTEs builds a pipeline: each CTE transforms the previous result. This replaces deeply nested subqueries with named, sequential steps that mirror how you would think through the problem on paper.",
        "syntax": "WITH orders_2026 AS (\n  SELECT * FROM orders WHERE strftime('%Y',date)='2026'\n),\ncustomer_totals AS (\n  SELECT customer_id, SUM(amount) AS total\n  FROM orders_2026 GROUP BY customer_id\n),\nranked AS (\n  SELECT *, RANK() OVER (ORDER BY total DESC) AS rnk FROM customer_totals\n)\nSELECT * FROM ranked WHERE rnk <= 10;",
        "keyPoints": [
          "Name CTEs after what they represent, not how they work: 'top_customers' not 'cte1'",
          "Each CTE can only reference CTEs defined before it in the WITH block",
          "This pattern mirrors dbt models — analytics engineering builds on it directly",
          "Debug by temporarily making each CTE the final SELECT to inspect intermediate results"
        ]
      },
      {
        "id": "sda-m3",
        "num": 3,
        "title": "UNION & set operations",
        "tags": [
          "UNION",
          "UNION ALL",
          "INTERSECT",
          "EXCEPT"
        ],
        "ticketRange": "SDA-017 → SDA-024",
        "startIdx": 16,
        "endIdx": 23,
        "concept": "Set operations combine results from two SELECT statements. UNION deduplicates; UNION ALL keeps all rows. INTERSECT returns rows in both; EXCEPT returns rows in the first but not the second. Column count and types must match.",
        "syntax": "-- Stack two queries\nSELECT 'Q1' AS quarter, revenue FROM q1_sales\nUNION ALL\nSELECT 'Q2', revenue FROM q2_sales ORDER BY revenue DESC;\n\n-- Customers who bought A but not B\nSELECT customer_id FROM purchases WHERE product='A'\nEXCEPT\nSELECT customer_id FROM purchases WHERE product='B';",
        "keyPoints": [
          "UNION removes duplicates (slower); UNION ALL does not (faster) — prefer UNION ALL when data is distinct",
          "Column names come from the first SELECT — alias there for specific headers",
          "ORDER BY at the end applies to the combined result, not each individual SELECT",
          "INTERSECT and EXCEPT are often replaceable with EXISTS / NOT EXISTS for better readability"
        ]
      },
      {
        "id": "sda-m4",
        "num": 4,
        "title": "Self-joins & advanced JOINs",
        "tags": [
          "self-join",
          "hierarchy",
          "non-equi join",
          "CROSS JOIN"
        ],
        "ticketRange": "SDA-025 → SDA-032",
        "startIdx": 24,
        "endIdx": 31,
        "concept": "A self-join joins a table to itself using two different aliases — used for hierarchies, pair comparisons, or sequential relationships. Non-equi joins use conditions like < or BETWEEN instead of =.",
        "syntax": "-- Employee to manager hierarchy\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;\n\n-- Non-equi join: all pairs where revenue differs\nSELECT a.name, b.name, a.revenue-b.revenue AS diff\nFROM reps a JOIN reps b ON a.revenue > b.revenue;",
        "keyPoints": [
          "Both aliases in a self-join reference the same physical table",
          "LEFT JOIN in self-join handles top-level rows (those with no manager)",
          "Non-equi joins can produce many rows — always check result size before returning",
          "CROSS JOIN produces every combination of two tables — use it intentionally for matrix generation"
        ]
      },
      {
        "id": "sda-m5",
        "num": 5,
        "title": "Pivot & conditional aggregation",
        "tags": [
          "CASE SUM",
          "pivot",
          "MAX(CASE)",
          "crosstab"
        ],
        "ticketRange": "SDA-033 → SDA-038",
        "startIdx": 32,
        "endIdx": 37,
        "concept": "SQLite has no PIVOT keyword. Instead use conditional aggregation: SUM(CASE WHEN category='A' THEN value END) creates one column per category — the standard SQL crosstab technique.",
        "syntax": "-- Monthly revenue as columns\nSELECT\n  MAX(CASE WHEN month=1 THEN revenue END) AS jan,\n  MAX(CASE WHEN month=2 THEN revenue END) AS feb,\n  MAX(CASE WHEN month=3 THEN revenue END) AS mar\nFROM monthly_sales;\n\n-- A/B pivot\nSELECT\n  MAX(CASE WHEN variant='control'   THEN cr END) AS ctrl_cr,\n  MAX(CASE WHEN variant='treatment' THEN cr END) AS trt_cr\nFROM ab_summary;",
        "keyPoints": [
          "Use SUM for numeric totals per category; MAX for picking a single value",
          "The number of output columns must be known at query-write time — dynamic pivot needs application code",
          "GROUP BY before pivoting if each source row is raw; skip GROUP BY if source is already summarised",
          "This pattern drives A/B reporting, matrix reports, and category-as-column headers"
        ]
      },
      {
        "id": "sda-m6",
        "num": 6,
        "title": "Nested subqueries & EXISTS",
        "tags": [
          "EXISTS",
          "NOT EXISTS",
          "correlated",
          "anti-join"
        ],
        "ticketRange": "SDA-039 → SDA-044",
        "startIdx": 38,
        "endIdx": 43,
        "concept": "EXISTS tests for the presence of at least one matching row — it short-circuits on first match. NOT EXISTS is the anti-join: find rows in A with no match in B. It is often faster than NOT IN when B can contain NULLs.",
        "syntax": "-- Customers with at least one order > $1000\nSELECT c.name FROM customers c\nWHERE EXISTS (\n  SELECT 1 FROM orders o\n  WHERE o.customer_id=c.id AND o.amount>1000\n);\n\n-- Customers with no orders at all\nSELECT c.name FROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id=c.id\n);",
        "keyPoints": [
          "EXISTS only needs one matching row — SELECT 1 is conventional inside (the value is irrelevant)",
          "NOT EXISTS is safer than NOT IN when the subquery can return NULLs",
          "Index the join column in the subquery table for correlated EXISTS performance",
          "LEFT JOIN + WHERE right.id IS NULL is equivalent to NOT EXISTS and often more readable"
        ]
      },
      {
        "id": "sda-m7",
        "num": 7,
        "title": "Final assessment",
        "tags": [
          "CTEs",
          "UNION",
          "pivot",
          "EXISTS"
        ],
        "ticketRange": "SDA-045 → SDA-050",
        "startIdx": 44,
        "endIdx": 49,
        "concept": "Six demanding tickets combining multi-step CTEs, set operations, conditional aggregation, and correlated subqueries. Structure and naming discipline matter as much as correctness at this level.",
        "syntax": "WITH base AS (\n  SELECT customer_id, product, revenue FROM orders WHERE year=2026\n),\nsummary AS (\n  SELECT customer_id,\n    SUM(CASE WHEN product='A' THEN revenue END) AS rev_a,\n    SUM(CASE WHEN product='B' THEN revenue END) AS rev_b\n  FROM base GROUP BY customer_id\n)\nSELECT * FROM summary ORDER BY rev_a+rev_b DESC;",
        "keyPoints": [
          "Plan on paper first: name each CTE before writing SQL",
          "Test each CTE step individually when the final result is wrong",
          "UNION ALL + GROUP BY is often cleaner than complex CASE structures",
          "Exam tickets have exact expected output — column names, order, and values must all match"
        ]
      }
    ]
  },
  {
    "rank": "BI Developer",
    "npc": "VP of Analytics Krishna Mehta",
    "tagline": "Build reports that run at scale. The dashboard is only as good as the SQL beneath it.",
    "totalTickets": 50,
    "modules": [
      {
        "id": "bi-m1",
        "num": 1,
        "title": "ROLLUP & subtotals",
        "tags": [
          "ROLLUP",
          "GROUP BY",
          "subtotals",
          "grand total"
        ],
        "ticketRange": "BI-001 → BI-008",
        "startIdx": 0,
        "endIdx": 7,
        "concept": "GROUP BY ROLLUP adds subtotal rows automatically. It generates all prefix combinations of the GROUP BY columns, finishing with a grand total row where all grouped columns are NULL.",
        "syntax": "SELECT region, product, SUM(revenue) AS revenue\nFROM sales\nGROUP BY ROLLUP(region, product)\nORDER BY region, product;",
        "keyPoints": [
          "ROLLUP(a,b) generates: (a,b), (a,NULL), (NULL,NULL) — one subtotal per prefix level",
          "NULL in a ROLLUP row means 'all values of that column' — use GROUPING() to distinguish real NULLs",
          "GROUPING(col) returns 1 when NULL is from ROLLUP, 0 when it is actual data",
          "Use UNION ALL with GROUP BY combinations as the portable SQLite alternative to ROLLUP"
        ]
      },
      {
        "id": "bi-m2",
        "num": 2,
        "title": "GROUPING SETS",
        "tags": [
          "GROUPING SETS",
          "custom aggregation",
          "multiple rollups"
        ],
        "ticketRange": "BI-009 → BI-016",
        "startIdx": 8,
        "endIdx": 15,
        "concept": "GROUPING SETS lets you define exactly which GROUP BY combinations to compute. It is the generalisation of ROLLUP and CUBE, giving full control over which aggregations appear in one result set.",
        "syntax": "SELECT region, product, SUM(revenue)\nFROM sales\nGROUP BY GROUPING SETS (\n  (region),\n  (product),\n  ()\n);",
        "keyPoints": [
          "GROUPING SETS((),(a),(b),(a,b)) is equivalent to CUBE(a,b)",
          "The empty set () in GROUPING SETS produces the grand total row",
          "More efficient than UNION ALL: the engine reads the base table once",
          "Simulate with UNION ALL of individual GROUP BY queries when GROUPING SETS is unavailable"
        ]
      },
      {
        "id": "bi-m3",
        "num": 3,
        "title": "Time intelligence — YTD & MTD",
        "tags": [
          "YTD",
          "MTD",
          "strftime",
          "date filter",
          "cumulative"
        ],
        "ticketRange": "BI-017 → BI-024",
        "startIdx": 16,
        "endIdx": 23,
        "concept": "Year-to-date and month-to-date are the two most-asked BI metrics. In SQLite they use date-range filters combined with strftime() for period extraction and window functions for running totals.",
        "syntax": "SELECT month_label, revenue,\n  SUM(revenue) OVER (\n    PARTITION BY strftime('%Y', month_date)\n    ORDER BY month_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS ytd_revenue\nFROM monthly_sales;",
        "keyPoints": [
          "PARTITION BY year + ORDER BY month gives YTD that resets each January",
          "MTD: filter WHERE strftime('%Y-%m', date) = strftime('%Y-%m', 'now')",
          "strftime('%Y', date) extracts year; '%m' month; '%Y-%m' year-month for grouping",
          "For prior-year comparison: date(order_date, '-1 year') shifts dates back 365 days"
        ]
      },
      {
        "id": "bi-m4",
        "num": 4,
        "title": "Period comparisons with LAG",
        "tags": [
          "LAG",
          "MoM",
          "YoY",
          "period delta",
          "growth rate"
        ],
        "ticketRange": "BI-025 → BI-030",
        "startIdx": 24,
        "endIdx": 29,
        "concept": "Period comparisons (MoM, QoQ, YoY) use LAG to pull the prior period's value, then compute absolute delta and percentage change. The key is ordering by date within the correct partition.",
        "syntax": "SELECT month, revenue,\n  LAG(revenue,1)  OVER (ORDER BY month) AS prev_month,\n  LAG(revenue,12) OVER (ORDER BY month) AS same_month_last_year,\n  ROUND(100.0*(revenue-LAG(revenue,1) OVER(ORDER BY month))/\n    LAG(revenue,1) OVER(ORDER BY month),1) AS mom_pct\nFROM monthly_sales;",
        "keyPoints": [
          "LAG(col,1) = prior month; LAG(col,12) = same month last year on monthly data",
          "PARTITION BY year to compare months only within a year; no partition for rolling comparisons",
          "Division by zero risk when prior period = 0 — guard with NULLIF(prior_value,0)",
          "Always check that ORDER BY inside OVER() matches the intended period sequence"
        ]
      },
      {
        "id": "bi-m5",
        "num": 5,
        "title": "Star schema queries",
        "tags": [
          "fact table",
          "dimension table",
          "star schema",
          "JOIN"
        ],
        "ticketRange": "BI-031 → BI-036",
        "startIdx": 30,
        "endIdx": 35,
        "concept": "A star schema has one central fact table and surrounding dimension tables. BI queries join the fact table to multiple dimensions then aggregate. The join keys are always surrogate IDs.",
        "syntax": "SELECT d.year, d.quarter, c.segment, p.category,\n  SUM(f.revenue) AS total_revenue\nFROM fact_sales f\nJOIN dim_date     d ON f.date_id     = d.id\nJOIN dim_customer c ON f.customer_id = c.id\nJOIN dim_product  p ON f.product_id  = p.id\nGROUP BY d.year, d.quarter, c.segment, p.category\nORDER BY d.year, d.quarter;",
        "keyPoints": [
          "Fact tables are wide and tall — never GROUP BY the fact table directly",
          "Dimension tables are narrow and small — join them to add readable attributes to numeric facts",
          "Filter on dimension columns after joining: WHERE d.year=2026, not a subquery",
          "Star schema queries are additive — you can always add another dimension JOIN without changing aggregation"
        ]
      },
      {
        "id": "bi-m6",
        "num": 6,
        "title": "UPSERT & merge patterns",
        "tags": [
          "INSERT OR REPLACE",
          "INSERT OR IGNORE",
          "ON CONFLICT",
          "upsert"
        ],
        "ticketRange": "BI-037 → BI-042",
        "startIdx": 36,
        "endIdx": 41,
        "concept": "Upsert = insert if new, update if exists. SQLite provides INSERT OR REPLACE and INSERT OR IGNORE. ON CONFLICT DO UPDATE is the standard upsert that updates only specified columns.",
        "syntax": "INSERT INTO products (id, name, price)\nVALUES (101, 'Widget', 9.99)\nON CONFLICT(id) DO UPDATE SET\n  price = excluded.price,\n  updated_at = CURRENT_TIMESTAMP;\n\n-- Skip if already exists\nINSERT OR IGNORE INTO events (id, type) VALUES (42, 'click');",
        "keyPoints": [
          "ON CONFLICT requires a UNIQUE or PRIMARY KEY constraint on the conflict column",
          "'excluded' is a special alias for the row that was rejected — use it to reference incoming values",
          "INSERT OR REPLACE deletes the old row first — it resets auto-increment IDs",
          "INSERT OR IGNORE is the fastest option when you only need idempotent inserts with no updates"
        ]
      },
      {
        "id": "bi-m7",
        "num": 7,
        "title": "Final assessment",
        "tags": [
          "ROLLUP",
          "YTD",
          "star schema",
          "period comparison"
        ],
        "ticketRange": "BI-045 → BI-050",
        "startIdx": 44,
        "endIdx": 49,
        "concept": "Six report-grade tickets combining time intelligence, star schema joins, ROLLUP totals, and period comparisons. Each ticket produces output a BI dashboard would display directly.",
        "syntax": "WITH base AS (\n  SELECT d.year, d.month, c.segment, SUM(f.revenue) AS revenue\n  FROM fact_sales f\n  JOIN dim_date d ON f.date_id=d.id\n  JOIN dim_customer c ON f.customer_id=c.id\n  GROUP BY d.year, d.month, c.segment\n)\nSELECT *, SUM(revenue) OVER (PARTITION BY year,segment ORDER BY month) AS ytd\nFROM base ORDER BY year,month,segment;",
        "keyPoints": [
          "BI queries are often slow at scale — index join keys and date columns",
          "Always verify row counts at each CTE step when debugging unexpected totals",
          "ROLLUP NULL vs real NULL: use COALESCE(region,'All Regions') for clean report labels",
          "The pattern is: fact JOIN dimensions → CTE → window functions → final output"
        ]
      }
    ]
  },
  {
    "rank": "Analytics Engineer",
    "npc": "Data Platform Lead Aryan Kapoor",
    "tagline": "SQL as code. Modular, testable, idempotent transforms — the dbt mindset.",
    "totalTickets": 50,
    "modules": [
      {
        "id": "ae-m1",
        "num": 1,
        "title": "CTEs as models",
        "tags": [
          "model",
          "transformation",
          "stg_",
          "int_",
          "layered CTE"
        ],
        "ticketRange": "AE-001 → AE-008",
        "startIdx": 0,
        "endIdx": 7,
        "concept": "In analytics engineering each CTE is a named transformation layer — a model. Staging models (stg_) clean raw data. Intermediate models (int_) join and enrich. Final models produce the analyst-facing output.",
        "syntax": "WITH stg_orders AS (\n  SELECT id, CAST(amount AS REAL) AS amount,\n    date(order_ts) AS order_date\n  FROM raw_orders WHERE amount IS NOT NULL\n),\nint_orders_enriched AS (\n  SELECT o.*, c.segment\n  FROM stg_orders o JOIN customers c ON o.customer_id=c.id\n)\nSELECT segment, SUM(amount) AS revenue\nFROM int_orders_enriched GROUP BY segment;",
        "keyPoints": [
          "stg_ models: one source table, light cleaning only — types, nulls, renames",
          "int_ models: join and compute, always reference stg_ inputs, never raw tables",
          "fct_ / dim_ models: the final output consumed by BI tools and analysts",
          "Prefix names reflect the layer, not the subject — 'stg_orders' not 'cleaned_orders'"
        ]
      },
      {
        "id": "ae-m2",
        "num": 2,
        "title": "Idempotent rebuilds",
        "tags": [
          "idempotent",
          "CREATE TABLE AS",
          "DROP IF EXISTS",
          "rebuild"
        ],
        "ticketRange": "AE-009 → AE-016",
        "startIdx": 8,
        "endIdx": 15,
        "concept": "An idempotent transform produces the same result no matter how many times it runs. The pattern: DROP TABLE IF EXISTS + CREATE TABLE AS SELECT. Running it twice gives the same table as running it once.",
        "syntax": "DROP TABLE IF EXISTS int_customer_summary;\nCREATE TABLE int_customer_summary AS\nSELECT\n  customer_id,\n  COUNT(*)        AS order_count,\n  SUM(amount)     AS lifetime_value,\n  MAX(order_date) AS last_order_date\nFROM stg_orders GROUP BY customer_id;",
        "keyPoints": [
          "DROP + CREATE is safe only when downstream queries re-run after — never drop a live dependency",
          "Idempotent is different from append — append grows the table; idempotent resets it",
          "In SQLite, CREATE TABLE AS SELECT copies structure and data in one statement",
          "Production pipelines add a rebuilt_at timestamp column so you can verify when it last ran"
        ]
      },
      {
        "id": "ae-m3",
        "num": 3,
        "title": "Data contract validation",
        "tags": [
          "row count",
          "NULL check",
          "referential integrity",
          "assertion"
        ],
        "ticketRange": "AE-017 → AE-022",
        "startIdx": 16,
        "endIdx": 21,
        "concept": "A data contract is a set of assertions about a dataset: expected row counts, no NULLs in key columns, referential integrity between tables. Run these as SQL tests after every model build.",
        "syntax": "-- Assert no NULLs in customer_id (expect 0)\nSELECT COUNT(*) AS null_count FROM stg_orders WHERE customer_id IS NULL;\n\n-- Assert referential integrity (expect 0)\nSELECT COUNT(*) AS orphan_orders\nFROM orders o LEFT JOIN customers c ON o.customer_id=c.id WHERE c.id IS NULL;\n\n-- Assert row count in range\nSELECT COUNT(*) AS rows FROM int_orders; -- expect between 1000 and 2000",
        "keyPoints": [
          "A test query should return 0 rows when passing — non-zero means failure",
          "Test for: NOT NULL on primary keys, value ranges, enum lists, referential integrity",
          "Run tests after build and before downstream models consume the output",
          "Failed tests should halt the pipeline — a bad model is worse than no model"
        ]
      },
      {
        "id": "ae-m4",
        "num": 4,
        "title": "Incremental logic",
        "tags": [
          "incremental",
          "watermark",
          "new rows only",
          "INSERT"
        ],
        "ticketRange": "AE-023 → AE-030",
        "startIdx": 22,
        "endIdx": 29,
        "concept": "Incremental models only process new or changed rows. A watermark (the max processed timestamp or ID) marks where the last run stopped. The next run reads only rows after the watermark.",
        "syntax": "-- Get watermark\nSELECT MAX(processed_at) AS watermark FROM int_events;\n\n-- Insert only new rows\nINSERT INTO int_events\nSELECT id, event_type, user_id, ts AS processed_at\nFROM raw_events\nWHERE ts > (SELECT MAX(processed_at) FROM int_events);",
        "keyPoints": [
          "Watermarks must be persisted — if the target table is dropped, the watermark is lost",
          "Incremental models assume raw data is immutable — late-arriving updates need a different strategy",
          "Use INSERT OR IGNORE when the same raw row could appear in two runs",
          "Start with full rebuild during development — switch to incremental only when rebuild is too slow"
        ]
      },
      {
        "id": "ae-m5",
        "num": 5,
        "title": "Query testing patterns",
        "tags": [
          "test query",
          "uniqueness",
          "accepted values",
          "not_null"
        ],
        "ticketRange": "AE-031 → AE-036",
        "startIdx": 30,
        "endIdx": 35,
        "concept": "Four canonical test types mirror dbt's built-in tests: not_null, unique, accepted_values, and relationships. Writing them as SQL SELECT queries that return 0 rows on pass is the universal pattern.",
        "syntax": "-- Unique test (duplicates = fail)\nSELECT id, COUNT(*) AS cnt FROM dim_customers GROUP BY id HAVING cnt>1;\n\n-- Accepted values\nSELECT status FROM orders WHERE status NOT IN ('open','closed','cancelled');\n\n-- Not null + unique combined\nSELECT COUNT(*) AS issues FROM dim_customers\nWHERE id IS NULL OR id IN (SELECT id FROM dim_customers GROUP BY id HAVING COUNT(*)>1);",
        "keyPoints": [
          "All four test types have the same contract: return 0 rows when the data is valid",
          "Run uniqueness tests on every primary key and every foreign key before downstream joins",
          "Accepted-values tests catch upstream schema drift immediately when a new value appears",
          "Combine multiple tests with UNION ALL for a single-query health check"
        ]
      },
      {
        "id": "ae-m6",
        "num": 6,
        "title": "Multi-step pipeline",
        "tags": [
          "pipeline",
          "staging",
          "intermediate",
          "final",
          "sequenced"
        ],
        "ticketRange": "AE-037 → AE-042",
        "startIdx": 36,
        "endIdx": 41,
        "concept": "A pipeline is an ordered sequence of SQL statements where each step's output is the next step's input. The full pattern: raw → stg (clean) → int (join/enrich) → fct/dim (final shape). Each step is idempotent and tested.",
        "syntax": "-- Step 1: staging\nDROP TABLE IF EXISTS stg_sales;\nCREATE TABLE stg_sales AS\nSELECT id, CAST(amount AS REAL) AS amount, date(ts) AS sale_date FROM raw_sales WHERE amount>0;\n\n-- Step 2: intermediate\nDROP TABLE IF EXISTS int_sales_by_day;\nCREATE TABLE int_sales_by_day AS\nSELECT sale_date, SUM(amount) AS daily_revenue FROM stg_sales GROUP BY sale_date;\n\n-- Step 3: final (with window)\nDROP TABLE IF EXISTS fct_daily_sales;\nCREATE TABLE fct_daily_sales AS\nSELECT *, LAG(daily_revenue) OVER (ORDER BY sale_date) AS prev_day FROM int_sales_by_day;",
        "keyPoints": [
          "Each step should be runnable in isolation — dependencies only flow forward, never back",
          "Name intermediate tables with the step prefix: stg_, int_, fct_, dim_",
          "Document each step with a comment: '-- Step 1: clean and cast raw orders'",
          "The final model should be the only one that downstream consumers ever query"
        ]
      },
      {
        "id": "ae-m7",
        "num": 7,
        "title": "Final assessment",
        "tags": [
          "model pipeline",
          "tests",
          "incremental",
          "idempotent"
        ],
        "ticketRange": "AE-043 → AE-050",
        "startIdx": 42,
        "endIdx": 49,
        "concept": "Eight capstone tickets covering the full analytics engineering cycle: staging, intermediate transforms, data contract tests, incremental inserts, and the final output model.",
        "syntax": "-- Full AE capstone\nDROP TABLE IF EXISTS stg_orders; CREATE TABLE stg_orders AS ...\nDROP TABLE IF EXISTS int_orders; CREATE TABLE int_orders AS ...\n-- Run tests (expect 0)\nSELECT COUNT(*) FROM stg_orders WHERE id IS NULL;\n-- Final model\nDROP TABLE IF EXISTS fct_orders; CREATE TABLE fct_orders AS ...",
        "keyPoints": [
          "The order of execution matters — stg_ before int_ before fct_",
          "After each DROP+CREATE, validate with a row-count assertion before proceeding",
          "Incremental and idempotent are not the same — know when to use each",
          "Real pipelines add logging (INSERT INTO run_log) — the capstone may require a log entry"
        ]
      }
    ]
  },
  {
    "rank": "Data Engineer",
    "npc": "Principal Data Engineer Vikram Nair",
    "tagline": "SQL that moves data reliably at scale. ETL, deduplication, SCD — the infrastructure layer.",
    "totalTickets": 50,
    "modules": [
      {
        "id": "de-m1",
        "num": 1,
        "title": "Staging & load patterns",
        "tags": [
          "staging table",
          "raw → stg",
          "CAST",
          "ETL",
          "bulk load"
        ],
        "ticketRange": "DE-001 → DE-008",
        "startIdx": 0,
        "endIdx": 7,
        "concept": "The staging layer accepts raw data from upstream sources with minimal transformation — just enough to make it queryable. Staging tables shadow the source schema and add a loaded_at timestamp.",
        "syntax": "INSERT INTO stg_orders (id, customer_id, amount, order_date, loaded_at)\nSELECT\n  CAST(raw_id AS INTEGER),\n  CAST(cust_id AS TEXT),\n  ROUND(CAST(amount_str AS REAL),2),\n  date(order_ts),\n  datetime('now')\nFROM raw_orders_landing;",
        "keyPoints": [
          "Staging is land and expand — accept everything, cast types, add metadata",
          "CAST is your first line of defence against type mismatches from upstream",
          "Always add loaded_at so you can reconstruct what was present at any point in time",
          "Staging tables are ephemeral — truncated and reloaded every run; never build permanent reports on them"
        ]
      },
      {
        "id": "de-m2",
        "num": 2,
        "title": "Deduplication strategies",
        "tags": [
          "ROW_NUMBER",
          "dedup",
          "latest record",
          "PARTITION BY"
        ],
        "ticketRange": "DE-009 → DE-016",
        "startIdx": 8,
        "endIdx": 15,
        "concept": "Upstream systems frequently send duplicate records. Deduplication picks one representative row per entity. The standard pattern uses ROW_NUMBER() to rank duplicates and keeps only rank 1.",
        "syntax": "WITH ranked AS (\n  SELECT *,\n    ROW_NUMBER() OVER (\n      PARTITION BY order_id\n      ORDER BY updated_at DESC\n    ) AS rn\n  FROM stg_orders\n)\nSELECT * FROM ranked WHERE rn=1;",
        "keyPoints": [
          "PARTITION BY the natural key (order_id, user_id) — not the surrogate primary key",
          "ORDER BY updated_at DESC keeps the most recent; ASC keeps the earliest",
          "After dedup, verify the row count matches the expected unique key count",
          "Dedup in a CTE — never modify the staging table in place (you would lose history)"
        ]
      },
      {
        "id": "de-m3",
        "num": 3,
        "title": "SCD Type 1 — overwrite",
        "tags": [
          "SCD1",
          "overwrite",
          "ON CONFLICT",
          "current value"
        ],
        "ticketRange": "DE-017 → DE-022",
        "startIdx": 16,
        "endIdx": 21,
        "concept": "Slowly Changing Dimension Type 1 overwrites old values with new ones — no history is kept. Appropriate when only the current value matters (e.g., a customer's current email address).",
        "syntax": "INSERT INTO dim_customers (id, name, email, segment, updated_at)\nSELECT id, name, email, segment, datetime('now')\nFROM stg_customers\nON CONFLICT(id) DO UPDATE SET\n  name=excluded.name, email=excluded.email,\n  segment=excluded.segment, updated_at=excluded.updated_at;",
        "keyPoints": [
          "SCD1 requires ON CONFLICT or a prior DELETE + INSERT — plain INSERT fails on duplicates",
          "'excluded' is the alias for the incoming row in an ON CONFLICT DO UPDATE clause",
          "SCD1 is irreversible — once overwritten, the old value is gone forever",
          "Use SCD1 for attributes where history has no value — phone numbers, current email, etc."
        ]
      },
      {
        "id": "de-m4",
        "num": 4,
        "title": "SCD Type 2 — history rows",
        "tags": [
          "SCD2",
          "effective_from",
          "effective_to",
          "is_current",
          "history"
        ],
        "ticketRange": "DE-023 → DE-030",
        "startIdx": 22,
        "endIdx": 29,
        "concept": "SCD Type 2 preserves full history by inserting a new row for each change while closing the old row. Two date columns mark validity: effective_from and effective_to (NULL if currently active).",
        "syntax": "-- Close old row\nUPDATE dim_customers\nSET effective_to=date('now'), is_current=0\nWHERE id=:customer_id AND is_current=1;\n\n-- Insert new version\nINSERT INTO dim_customers\n  (id, name, segment, effective_from, effective_to, is_current)\nVALUES (:customer_id, :new_name, :new_seg, date('now'), NULL, 1);",
        "keyPoints": [
          "effective_to=NULL means currently active — simpler than a far-future sentinel date",
          "Always close the old row before inserting the new one to avoid two is_current=1 rows",
          "Fact tables store the dimension surrogate key to correctly link to the right historical version",
          "Current state: WHERE is_current=1. History: WHERE :date BETWEEN effective_from AND COALESCE(effective_to,'9999-12-31')"
        ]
      },
      {
        "id": "de-m5",
        "num": 5,
        "title": "Bulk insert & update",
        "tags": [
          "INSERT SELECT",
          "UPDATE subquery",
          "batch",
          "bulk"
        ],
        "ticketRange": "DE-031 → DE-037",
        "startIdx": 30,
        "endIdx": 36,
        "concept": "Bulk operations move many rows in one statement. INSERT INTO ... SELECT inserts an entire query result. UPDATE with a subquery updates many rows by joining to another table. Bulk operations are orders of magnitude faster than row-by-row loops.",
        "syntax": "-- Bulk insert from staging\nINSERT INTO fct_events (user_id, event, ts)\nSELECT user_id, event_type, event_ts\nFROM stg_events\nWHERE event_ts > (SELECT MAX(ts) FROM fct_events);\n\n-- Bulk update from lookup\nUPDATE orders SET region=(\n  SELECT r.region FROM customer_regions r WHERE r.customer_id=orders.customer_id\n)\nWHERE customer_id IN (SELECT customer_id FROM customer_regions);",
        "keyPoints": [
          "INSERT INTO ... SELECT is atomic — all rows insert or none do (implicit transaction)",
          "UPDATE with correlated subquery: ensure the subquery returns at most one row per outer row",
          "Bulk operations lock the table — in production, batch in 10k-row chunks to avoid lock contention",
          "After bulk insert, verify the row delta: rows_after - rows_before = expected_inserted"
        ]
      },
      {
        "id": "de-m6",
        "num": 6,
        "title": "Pipeline health monitoring",
        "tags": [
          "run log",
          "row count audit",
          "data freshness",
          "alert threshold"
        ],
        "ticketRange": "DE-038 → DE-044",
        "startIdx": 37,
        "endIdx": 43,
        "concept": "Pipeline health monitoring records execution metadata — rows processed, duration, status — and compares them to expected thresholds. A run_log table accumulates one row per pipeline execution.",
        "syntax": "-- Log pipeline run\nINSERT INTO pipeline_run_log (pipeline, run_at, rows_processed, status)\nSELECT 'stg_orders', datetime('now'),\n  (SELECT COUNT(*) FROM stg_orders),\n  CASE WHEN (SELECT COUNT(*) FROM stg_orders)>0 THEN 'ok' ELSE 'empty' END;\n\n-- Freshness check: data should be < 2 hours old\nSELECT MAX(loaded_at),\n  CASE WHEN (julianday('now')-julianday(MAX(loaded_at)))*24>2 THEN 'stale' ELSE 'fresh' END AS status\nFROM stg_orders;",
        "keyPoints": [
          "julianday('now') - julianday(ts) gives the difference in days; multiply by 24 for hours",
          "Log both successes and failures — a gap in the log is itself a signal",
          "Alert thresholds: row count < expected_min OR > expected_max, or freshness > max_lag_hours",
          "Keep the run_log table small — purge rows older than 90 days in the log step itself"
        ]
      },
      {
        "id": "de-m7",
        "num": 7,
        "title": "Final assessment",
        "tags": [
          "ETL",
          "SCD2",
          "dedup",
          "health check"
        ],
        "ticketRange": "DE-045 → DE-050",
        "startIdx": 44,
        "endIdx": 49,
        "concept": "Six end-to-end pipeline tickets: staging load, deduplication, SCD Type 2 dimension update, fact table bulk insert, and pipeline health logging. Each ticket is one step in a realistic data pipeline.",
        "syntax": "-- Full DE capstone flow\n-- 1. Load staging\nINSERT INTO stg_customers SELECT ...;\n-- 2. Dedup\nWITH deduped AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY id ORDER BY ts DESC) rn FROM stg_customers)\nSELECT * FROM deduped WHERE rn=1;\n-- 3. SCD2\nUPDATE dim_customers SET effective_to=date('now'), is_current=0 WHERE ...;\nINSERT INTO dim_customers ...;\n-- 4. Log\nINSERT INTO pipeline_run_log ...;",
        "keyPoints": [
          "The four steps must run in order — staging before dedup before SCD before logging",
          "Between each step, run a row-count assertion to catch problems early",
          "SCD2 is the hardest step — verify is_current=1 count matches expected dimension size",
          "The log step must run even if a prior step fails — wrap in BEGIN/COMMIT to test rollback"
        ]
      }
    ]
  },
  {
    "rank": "Staff Analyst",
    "npc": "VP of Data Science Anika Sharma",
    "tagline": "Statistical SQL for the senior IC. Answer questions nobody thought to ask.",
    "totalTickets": 50,
    "modules": [
      {
        "id": "sa-m1",
        "num": 1,
        "title": "Statistical aggregates",
        "tags": [
          "STDDEV",
          "variance",
          "z-score",
          "CV",
          "E[X²]−E[X]²"
        ],
        "ticketRange": "SA-001 → SA-008",
        "startIdx": 0,
        "endIdx": 7,
        "concept": "SQLite has no STDDEV() or VARIANCE(). Derive them using the computational formula: Var(X) = E[X²] − E[X]². This computes population variance in a single pass. Z-score places each row in units of standard deviation from the mean.",
        "syntax": "-- Population stddev (single-pass)\nSELECT ROUND(SQRT(SUM(x*x)*1.0/COUNT(*) - AVG(x)*AVG(x)),2) AS pop_stddev FROM t;\n\n-- Z-score per row\nWITH s AS (\n  SELECT AVG(revenue) AS m,\n    SQRT(SUM(revenue*revenue)*1.0/COUNT(*)-AVG(revenue)*AVG(revenue)) AS sd\n  FROM sales_reps\n)\nSELECT rep_name, revenue, ROUND((revenue-m)/sd,2) AS z\nFROM sales_reps, s ORDER BY z DESC;",
        "keyPoints": [
          "Var(X) = E[X²] − E[X]² avoids a two-pass scan over the data",
          "Always multiply by 1.0 before division to force float arithmetic in SQLite",
          "CV (coefficient of variation) = stddev / mean × 100 — dimensionless measure of relative spread",
          "Z > 2 or Z < −2 is the standard threshold for flagging statistical outliers"
        ]
      },
      {
        "id": "sa-m2",
        "num": 2,
        "title": "Percentile analysis",
        "tags": [
          "NTILE",
          "PERCENT_RANK",
          "CUME_DIST",
          "IQR",
          "median"
        ],
        "ticketRange": "SA-009 → SA-016",
        "startIdx": 8,
        "endIdx": 15,
        "concept": "SQLite has no PERCENTILE_CONT(). Approximate percentiles using NTILE(n) for bucket assignment, PERCENT_RANK() for the 0–1 relative position, and CUME_DIST() for the fraction at-or-below. Median uses ROW_NUMBER.",
        "syntax": "-- Quartile assignment\nSELECT id, value, NTILE(4) OVER (ORDER BY value) AS quartile FROM t;\n\n-- IQR from NTILE CTE\nWITH nt AS (SELECT value, NTILE(4) OVER (ORDER BY value) AS q FROM t),\n     b  AS (SELECT MAX(CASE WHEN q=1 THEN value END) AS q1,\n                   MAX(CASE WHEN q=3 THEN value END) AS q3 FROM nt)\nSELECT q1, q3, q3-q1 AS iqr,\n  q1-1.5*(q3-q1) AS lower_fence, q3+1.5*(q3-q1) AS upper_fence FROM b;",
        "keyPoints": [
          "NTILE aliases can not be referenced in GROUP BY — always wrap in a CTE first",
          "PERCENT_RANK: first row = 0.0, last row = 1.0 — formula: (rank-1)/(n-1)",
          "CUME_DIST: fraction of rows <= this value — always ends at exactly 1.0",
          "Tukey fences: lower = Q1 - 1.5×IQR, upper = Q3 + 1.5×IQR — points outside are statistical outliers"
        ]
      },
      {
        "id": "sa-m3",
        "num": 3,
        "title": "A/B test analysis",
        "tags": [
          "ARPU",
          "ARPPU",
          "conversion rate",
          "lift",
          "pivot"
        ],
        "ticketRange": "SA-017 → SA-024",
        "startIdx": 16,
        "endIdx": 23,
        "concept": "A/B test SQL computes group-level metrics per variant then pivots them into a single comparison row. Conversion lift = treatment rate − control rate. Revenue lift = (treatment ARPU − control ARPU) / control ARPU × 100.",
        "syntax": "WITH g AS (\n  SELECT variant, COUNT(*) AS n,\n    ROUND(100.0*SUM(converted)/COUNT(*),1) AS cr,\n    ROUND(SUM(revenue)/COUNT(*),2) AS arpu,\n    ROUND(SUM(revenue)/NULLIF(SUM(converted),0),2) AS arppu\n  FROM ab_experiment GROUP BY variant\n)\nSELECT\n  MAX(CASE WHEN variant='control'   THEN cr END) AS ctrl_cr,\n  MAX(CASE WHEN variant='treatment' THEN cr END) AS trt_cr,\n  ROUND(MAX(CASE WHEN variant='treatment' THEN cr END)-MAX(CASE WHEN variant='control' THEN cr END),1) AS lift_pp\nFROM g;",
        "keyPoints": [
          "ARPU = total revenue / all users (including non-converters)",
          "ARPPU = total revenue / converters only — use NULLIF(SUM(converted),0) to avoid division by zero",
          "Pivot with MAX(CASE WHEN variant='x' THEN metric END) to put both variants on one row",
          "Conversion lift is in percentage points (pp), not percent — 50% to 70% is +20pp, not +40%"
        ]
      },
      {
        "id": "sa-m4",
        "num": 4,
        "title": "Regression & trend",
        "tags": [
          "Pearson r",
          "slope",
          "intercept",
          "residual",
          "forecast"
        ],
        "ticketRange": "SA-025 → SA-030",
        "startIdx": 24,
        "endIdx": 29,
        "concept": "Linear regression in SQL uses least-squares formulas computed from SUM aggregates. Slope β₁ = (n·Σxy − Σx·Σy) / (n·Σx² − (Σx)²). Intercept β₀ = ȳ − β₁·x̄. All computable in a single subquery.",
        "syntax": "WITH agg AS (\n  SELECT COUNT(*) AS n, SUM(x) AS sx, SUM(y) AS sy,\n         SUM(x*y) AS sxy, SUM(x*x) AS sx2, SUM(y*y) AS sy2\n  FROM t\n),\np AS (\n  SELECT (n*sxy-sx*sy)*1.0/(n*sx2-sx*sx) AS slope,\n         sy*1.0/n-(n*sxy-sx*sy)*1.0/(n*sx2-sx*sx)*sx/n AS intercept,\n         (n*sxy-sx*sy)*1.0/(SQRT(n*sx2-sx*sx)*SQRT(n*sy2-sy*sy)) AS r\n  FROM agg\n)\nSELECT ROUND(slope,2), ROUND(intercept,2), ROUND(r,3) FROM p;",
        "keyPoints": [
          "Collect all six aggregates (n, sx, sy, sxy, sx2, sy2) in one CTE — compute everything from them",
          "Residual = actual − predicted = y − (slope·x + intercept) — large residuals are anomalies",
          "Pearson r close to 1 means strong positive linear relationship; −1 means strong negative",
          "Forecast: plug future x into ŷ = slope·x + intercept — reliable only within the observed range"
        ]
      },
      {
        "id": "sa-m5",
        "num": 5,
        "title": "Outlier detection",
        "tags": [
          "IQR",
          "z-score",
          "Tukey fence",
          "LAG spike",
          "anomaly"
        ],
        "ticketRange": "SA-031 → SA-036",
        "startIdx": 30,
        "endIdx": 35,
        "concept": "Two complementary outlier methods: IQR (Tukey fences) is robust to non-normal distributions; z-score assumes roughly normal data. When both agree on a row, the signal is strong.",
        "syntax": "WITH nt AS (SELECT amount, NTILE(4) OVER (ORDER BY amount) q FROM order_amounts),\n     b  AS (SELECT MAX(CASE WHEN q=1 THEN amount END) q1, MAX(CASE WHEN q=3 THEN amount END) q3 FROM nt),\n     f  AS (SELECT q1-1.5*(q3-q1) lo, q3+1.5*(q3-q1) hi FROM b),\n     s  AS (SELECT AVG(amount) m, SQRT(SUM(amount*amount)*1.0/COUNT(*)-AVG(amount)*AVG(amount)) sd FROM order_amounts)\nSELECT o.order_id, o.amount,\n  ROUND((o.amount-s.m)/s.sd,2) AS z,\n  CASE WHEN o.amount<f.lo OR o.amount>f.hi THEN 'IQR' ELSE 'ok' END AS iqr_flag,\n  CASE WHEN ABS((o.amount-s.m)/s.sd)>2    THEN 'Z'   ELSE 'ok' END AS z_flag\nFROM order_amounts o, f, s ORDER BY o.amount DESC;",
        "keyPoints": [
          "IQR method: outlier = below Q1−1.5·IQR or above Q3+1.5·IQR — the Tukey definition",
          "Z-score threshold: |z| > 2 is common; |z| > 3 is stricter — 0.3% of normal distribution",
          "Both methods can disagree — rows flagged by both are high-confidence anomalies",
          "Spike detection: LAG(sessions) OVER (ORDER BY date) then filter WHERE sessions > prev*1.5"
        ]
      },
      {
        "id": "sa-m6",
        "num": 6,
        "title": "Executive ad-hoc analysis",
        "tags": [
          "Pareto",
          "Lorenz",
          "MoM",
          "LTV",
          "rolling avg"
        ],
        "ticketRange": "SA-037 → SA-044",
        "startIdx": 36,
        "endIdx": 43,
        "concept": "The queries a VP asks on Friday afternoon: Pareto concentration, Lorenz-style cumulative share, month-over-month growth, customer LTV by segment, and rolling averages for trend smoothing.",
        "syntax": "-- Pareto: top 20% revenue share\nWITH ranked AS (\n  SELECT customer_id, total_revenue,\n    ROW_NUMBER() OVER (ORDER BY total_revenue DESC) AS rn,\n    COUNT(*) OVER () AS n,\n    SUM(total_revenue) OVER (ORDER BY total_revenue DESC) AS running_rev,\n    SUM(total_revenue) OVER () AS grand_total\n  FROM customer_orders\n)\nSELECT COUNT(*) AS top_n, SUM(total_revenue) AS top_rev,\n  ROUND(100.0*SUM(total_revenue)/MAX(grand_total),1) AS pct\nFROM ranked WHERE rn <= n/5;",
        "keyPoints": [
          "Pareto: n/5 gives the top quintile (top 20%) by row count",
          "Running cumulative share: SUM(rev) OVER (ORDER BY rev DESC) / SUM(rev) OVER () × 100",
          "Rolling 3-month average: AVG(rev) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)",
          "LTV by segment: AVG(total_revenue) per segment compared to its share of total revenue"
        ]
      },
      {
        "id": "sa-m7",
        "num": 7,
        "title": "Capstone assessment",
        "tags": [
          "multi-table",
          "regression",
          "A/B",
          "outliers",
          "Pareto"
        ],
        "ticketRange": "SA-045 → SA-050",
        "startIdx": 44,
        "endIdx": 49,
        "concept": "Six tickets combining all five datasets. Culminates in SA-050 — a single nine-metric VP dashboard combining statistical analysis, A/B results, trend slope, Pareto share, and confirmed outlier count.",
        "syntax": "-- Grand finale: nine metrics in one row\nWITH rep_stats AS (...),\n     ab_metrics AS (...),\n     trend_stats AS (...),\n     cust_stats  AS (...),\n     outlier_cnt AS (...)\nSELECT r.mean_rev, r.stddev_rev, r.top_rep,\n       a.conv_lift_pp, a.rev_lift_pct,\n       t.monthly_growth, c.top20_share,\n       c.total_customers, o.confirmed_outliers\nFROM rep_stats r, ab_metrics a, trend_stats t, cust_stats c, outlier_cnt o;",
        "keyPoints": [
          "Build each CTE independently and test it before combining",
          "Cross-join five single-row CTEs to produce the final one-row VP dashboard",
          "The outlier CTE requires nested CTEs (WITH inside a subquery) — fully supported in SQLite",
          "SA-050 is the hardest ticket in the platform — it is meant to be so"
        ]
      }
    ]
  }
]
;