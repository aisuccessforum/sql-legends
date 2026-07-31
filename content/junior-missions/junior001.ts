import type { Mission } from "../missions/level001";

export const junior001: Mission = {
  id: "junior-ticket-001",
  world: "City Hospital",
  levelLabel: "Ticket JDA-001 // Priority: Medium",
  npc: "SENIOR ANALYST KAVYA RATHI",
  briefing: [
    "09:00 AM. Client: City Hospital. Priority: Medium.",
    "\"Congratulations on the promotion — Team Lead Malhotra passed your file to me personally. I run the Junior Data Analyst pod. Different pace, different expectations. You'll see.\"",
    "\"First thing: a new tool. Everything you've written so far has been one query against one result. A subquery is a query nested inside another — you run one first, and the outer query uses whatever it returns.\"",
    "\"You've already found doctors with zero appointments using a LEFT JOIN. Do it again, but this time with a subquery instead — find every doctor whose id doesn't show up anywhere in the appointments table.\"",
  ],
  objective:
    "Select the name of every doctor whose id does not appear in the appointments table's doctor_id column.",
  schemaLabel: "doctors, appointments",
  seedSql: `
    CREATE TABLE doctors (
      id INTEGER PRIMARY KEY,
      name TEXT,
      department TEXT,
      years_experience INTEGER
    );
    CREATE TABLE appointments (
      id INTEGER PRIMARY KEY,
      patient_name TEXT,
      doctor_id INTEGER,
      appointment_date TEXT,
      status TEXT
    );
    INSERT INTO doctors (id, name, department, years_experience) VALUES
      (1, 'Dr. Ananya Rao', 'Cardiology', 12),
      (2, 'Dr. Vikram Sinha', 'Orthopedics', 8),
      (3, 'Dr. Fatima Sheikh', 'Pediatrics', 15),
      (4, 'Dr. Rajesh Kulkarni', 'Cardiology', 5),
      (5, 'Dr. Meenal Joshi', 'Neurology', 20),
      (6, 'Dr. Arjun Reddy', 'Orthopedics', 3);
    INSERT INTO appointments (id, patient_name, doctor_id, appointment_date, status) VALUES
      (1, 'Ravi Patel', 1, '2026-06-01', 'completed'),
      (2, 'Sunita Devi', 2, '2026-06-02', 'completed'),
      (3, 'Amit Shah', 1, '2026-06-03', 'cancelled'),
      (4, 'Kavya Nair', 3, '2026-06-03', 'completed'),
      (5, 'Rohan Mehta', 1, '2026-06-04', 'completed'),
      (6, 'Priya Iyer', 4, '2026-06-05', 'no_show'),
      (7, 'Sanjay Gupta', 2, '2026-06-05', 'scheduled'),
      (8, 'Neha Verma', 5, '2026-06-06', 'completed'),
      (9, 'Karan Malhotra', 1, '2026-06-07', 'completed'),
      (10, 'Divya Kapoor', 3, '2026-06-08', 'completed'),
      (11, 'Suresh Rao', 5, '2026-06-09', 'completed'),
      (12, 'Anjali Desai', 2, '2026-06-10', 'cancelled');
  `,
  schemaPreview: [
    { table: "doctors", columns: ["id", "name", "department", "years_experience"] },
    {
      table: "appointments",
      columns: ["id", "patient_name", "doctor_id", "appointment_date", "status"],
    },
  ],
  expectedColumns: ["name"],
  expectedRows: [["Dr. Arjun Reddy"]],
  requireRowOrder: false,
  hints: [
    "A subquery inside parentheses can go anywhere a list of values is expected — including right after IN or NOT IN.",
    "The inner query just needs to return one column: every doctor_id that has ever been booked.",
    "Try: SELECT name FROM doctors WHERE id NOT IN (SELECT doctor_id FROM appointments);",
  ],
  xpAward: 150,
};
