import type { Mission } from "./level001";

export const level080: Mission = {
  id: "intern-ticket-080",
  world: "City Hospital",
  levelLabel: "Ticket INT-080 // Final Assessment 5 of 5",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "03:00 PM. Final Internship Assessment. Priority: Critical.",
    "\"Last ticket of your internship. City Hospital wants a completed-visit report — patient, doctor, department, and whether the doctor is Senior (10 or more years) or Junior. Sorted by department, so it reads cleanly for whoever picks it up next.\"",
    "\"Eight weeks ago you couldn't have told me what a WHERE clause was. Today you're combining joins, conditions, labels, and sorting without being told which piece goes where. That's not a coincidence — that's the actual job.\"",
    "\"Get this one right, and there's nothing left standing between you and a review meeting you're going to want to be in.\"",
  ],
  objective:
    "For completed appointments, select the patient name, doctor name, department, and a doctor experience label ('Senior' if 10+ years, otherwise 'Junior'), sorted by department.",
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
    "Four techniques, one query: connect the tables, filter to the right outcome, label based on a number, then sort.",
    "Build it piece by piece if it helps — get the join and filter working first, then add the label, then the sort, checking your result after each addition.",
    "Try: SELECT a.patient_name, d.name AS doctor_name, d.department, CASE WHEN d.years_experience >= 10 THEN 'Senior' ELSE 'Junior' END AS doctor_level FROM appointments a JOIN doctors d ON a.doctor_id = d.id WHERE a.status = 'completed' ORDER BY d.department ASC;",
  ],
  expectedColumns: ["patient_name", "doctor_name", "department", "doctor_level"],
  expectedRows: [
    ["Ravi Patel", "Dr. Ananya Rao", "Cardiology", "Senior"],
    ["Rohan Mehta", "Dr. Ananya Rao", "Cardiology", "Senior"],
    ["Karan Malhotra", "Dr. Ananya Rao", "Cardiology", "Senior"],
    ["Neha Verma", "Dr. Meenal Joshi", "Neurology", "Senior"],
    ["Suresh Rao", "Dr. Meenal Joshi", "Neurology", "Senior"],
    ["Sunita Devi", "Dr. Vikram Sinha", "Orthopedics", "Junior"],
    ["Kavya Nair", "Dr. Fatima Sheikh", "Pediatrics", "Senior"],
    ["Divya Kapoor", "Dr. Fatima Sheikh", "Pediatrics", "Senior"],
  ],
  requireRowOrder: true,
  xpAward: 250,
};
