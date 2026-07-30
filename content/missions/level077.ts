import type { Mission } from "./level001";

export const level077: Mission = {
  id: "intern-ticket-077",
  world: "City Hospital",
  levelLabel: "Ticket INT-077 // Final Assessment 2 of 5",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:00 AM. Final Internship Assessment. Priority: Critical.",
    "\"City Hospital next. Which departments actually saw more than one completed appointment this stretch? Anything with just one is noise for this report — I only want departments carrying real volume.\"",
  ],
  objective:
    "For completed appointments, select each doctor's department and how many completed appointments it had, but only for departments with more than 1.",
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
  hints: [
    "This spans two tables, needs a filter on the appointment's outcome, a grouping by a doctor-side column, and a filter on the group itself.",
    "Every technique here you've already used at City Hospital before — just combined into one ticket now.",
    "Try: SELECT d.department, COUNT(*) AS completed_count FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' GROUP BY d.department HAVING COUNT(*) > 1;",
  ],
  expectedColumns: ["department", "completed_count"],
  expectedRows: [
    ["Cardiology", 3],
    ["Neurology", 2],
    ["Pediatrics", 2],
  ],
  requireRowOrder: false,
  xpAward: 250,
};
