import type { Mission } from "./level001";

export const level064: Mission = {
  id: "intern-ticket-064",
  world: "City Hospital",
  levelLabel: "Ticket INT-064 // Priority: Medium",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "02:40 PM. Client: City Hospital. Priority: Medium.",
    "\"Simplify the status codes for the patient-facing summary — 'Attended' if they showed up, 'Missed' if they were a no-show, 'Other' for anything else. Patient name and doctor name alongside it.\"",
  ],
  objective:
    "For every appointment, select the patient name, doctor name, and a simplified outcome: 'Attended' if completed, 'Missed' if no_show, otherwise 'Other'.",
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
  expectedColumns: ["patient_name", "doctor_name", "outcome"],
  expectedRows: [
    ["Ravi Patel", "Dr. Ananya Rao", "Attended"],
    ["Sunita Devi", "Dr. Vikram Sinha", "Attended"],
    ["Amit Shah", "Dr. Ananya Rao", "Other"],
    ["Kavya Nair", "Dr. Fatima Sheikh", "Attended"],
    ["Rohan Mehta", "Dr. Ananya Rao", "Attended"],
    ["Priya Iyer", "Dr. Rajesh Kulkarni", "Missed"],
    ["Sanjay Gupta", "Dr. Vikram Sinha", "Other"],
    ["Neha Verma", "Dr. Meenal Joshi", "Attended"],
    ["Karan Malhotra", "Dr. Ananya Rao", "Attended"],
    ["Divya Kapoor", "Dr. Fatima Sheikh", "Attended"],
    ["Suresh Rao", "Dr. Meenal Joshi", "Attended"],
    ["Anjali Desai", "Dr. Vikram Sinha", "Other"],
  ],
  requireRowOrder: false,
  hints: [
    "JOIN and CASE don't interact specially — build the join like usual, then add a CASE expression to the column list.",
    "Three outcomes: two specific WHEN checks against a.status, then ELSE for everything else (scheduled, cancelled).",
    "Try: SELECT a.patient_name, d.name AS doctor_name, CASE WHEN a.status = 'completed' THEN 'Attended' WHEN a.status = 'no_show' THEN 'Missed' ELSE 'Other' END AS outcome FROM appointments a JOIN doctors d ON a.doctor_id = d.id;",
  ],
  xpAward: 100,
};
