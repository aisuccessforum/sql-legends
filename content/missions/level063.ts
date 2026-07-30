import type { Mission } from "./level001";

export const level063: Mission = {
  id: "intern-ticket-063",
  world: "City Hospital",
  levelLabel: "Ticket INT-063 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:50 PM. Client: City Hospital. Priority: High.",
    "\"I need the workload report again, but this time include every doctor — even Dr. Reddy, who should show zero. Leaving him off the report entirely looks like a data error to the client.\"",
    "\"Careful here — COUNT(*) counts rows, and a LEFT JOIN still produces one row per doctor even with no appointment, just full of NULLs. That row gets counted as 1, not 0. Count a column from the appointments side instead — COUNT ignores NULLs in a real column, but not in *.\"",
  ],
  objective:
    "Select every doctor's name along with their appointment count, including doctors with zero appointments.",
  schemaLabel: "appointments, doctors",
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
  expectedColumns: ["name", "appointment_count"],
  expectedRows: [
    ["Dr. Ananya Rao", 4],
    ["Dr. Arjun Reddy", 0],
    ["Dr. Fatima Sheikh", 2],
    ["Dr. Meenal Joshi", 2],
    ["Dr. Rajesh Kulkarni", 1],
    ["Dr. Vikram Sinha", 3],
  ],
  requireRowOrder: false,
  hints: [
    "Start with LEFT JOIN from doctors, same shape as the last ticket, but this time keep everyone instead of filtering to the gaps.",
    "Count a real column from appointments, like a.id, instead of *. Try running it with COUNT(*) first and compare Dr. Reddy's row to see the difference.",
    "Try: SELECT d.name, COUNT(a.id) AS appointment_count FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id GROUP BY d.name;",
  ],
  xpAward: 100,
};
