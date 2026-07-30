import type { Mission } from "./level001";

export const level056: Mission = {
  id: "intern-ticket-056",
  world: "City Hospital",
  levelLabel: "Ticket INT-056 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "08:50 AM. Client: City Hospital. Priority: High.",
    "New client, and new territory for you — everything so far has lived in a single table. City Hospital's data is split across two: DOCTORS and APPOINTMENTS, linked by a doctor_id.",
    "\"Their scheduling team wants a readable appointment list — patient name next to the doctor's actual name, not just an ID number nobody can read.\"",
    "\"You can't get that from one table alone. You need to connect the two, matching each appointment to the doctor it belongs to. That's what a JOIN does.\"",
  ],
  objective:
    "Select the patient name and doctor name for every appointment, by matching appointments to doctors.",
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
  expectedColumns: ["patient_name", "doctor_name"],
  expectedRows: [
    ["Ravi Patel", "Dr. Ananya Rao"],
    ["Sunita Devi", "Dr. Vikram Sinha"],
    ["Amit Shah", "Dr. Ananya Rao"],
    ["Kavya Nair", "Dr. Fatima Sheikh"],
    ["Rohan Mehta", "Dr. Ananya Rao"],
    ["Priya Iyer", "Dr. Rajesh Kulkarni"],
    ["Sanjay Gupta", "Dr. Vikram Sinha"],
    ["Neha Verma", "Dr. Meenal Joshi"],
    ["Karan Malhotra", "Dr. Ananya Rao"],
    ["Divya Kapoor", "Dr. Fatima Sheikh"],
    ["Suresh Rao", "Dr. Meenal Joshi"],
    ["Anjali Desai", "Dr. Vikram Sinha"],
  ],
  requireRowOrder: false,
  hints: [
    "Give each table a short alias (like a for appointments, d for doctors) so you can tell their columns apart.",
    "JOIN two tables ON the column that connects them — here, appointments.doctor_id matches doctors.id.",
    "Try: SELECT a.patient_name, d.name AS doctor_name FROM appointments a JOIN doctors d ON a.doctor_id = d.id;",
  ],
  xpAward: 100,
};
