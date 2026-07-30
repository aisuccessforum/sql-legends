import type { Mission } from "./level001";

export const level069: Mission = {
  id: "intern-ticket-069",
  world: "Sky Airlines",
  levelLabel: "Ticket INT-069 // Priority: Low",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "10:40 AM. Client: Sky Airlines. Priority: Low.",
    "\"The raw status codes look unprofessional on the passenger-facing board — 'on_time', 'delayed', that sort of thing. Turn each one into proper display text: 'On Time', 'Delayed', 'Cancelled'.\"",
  ],
  objective:
    "For every flight, select the flight number and a display-friendly version of its status: 'On Time', 'Delayed', or 'Cancelled'.",
  schemaLabel: "flights",
  seedSql: `
    CREATE TABLE flights (
      id INTEGER PRIMARY KEY,
      flight_number TEXT,
      origin TEXT,
      destination TEXT,
      status TEXT,
      passenger_count INTEGER,
      delay_minutes INTEGER
    );
    INSERT INTO flights (id, flight_number, origin, destination, status, passenger_count, delay_minutes) VALUES
      (1, 'SA101', 'Mumbai', 'Delhi', 'on_time', 180, NULL),
      (2, 'SA102', 'Mumbai', 'Bangalore', 'delayed', 165, 45),
      (3, 'SA103', 'Delhi', 'Chennai', 'on_time', 190, NULL),
      (4, 'SA104', 'Bangalore', 'Mumbai', 'cancelled', 0, NULL),
      (5, 'SA105', 'Chennai', 'Delhi', 'delayed', 175, 20),
      (6, 'SA106', 'Mumbai', 'Kolkata', 'on_time', 200, NULL),
      (7, 'SA107', 'Kolkata', 'Mumbai', 'delayed', 150, 90),
      (8, 'SA108', 'Delhi', 'Bangalore', 'on_time', 185, NULL),
      (9, 'SA109', 'Bangalore', 'Chennai', 'cancelled', 0, NULL),
      (10, 'SA110', 'Chennai', 'Mumbai', 'on_time', 195, NULL),
      (11, 'SA111', 'Mumbai', 'Delhi', 'delayed', 170, 15),
      (12, 'SA112', 'Delhi', 'Kolkata', 'on_time', 160, NULL);
  `,
  schemaPreview: [
    {
      table: "flights",
      columns: [
        "id",
        "flight_number",
        "origin",
        "destination",
        "status",
        "passenger_count",
        "delay_minutes",
      ],
    },
  ],
  hints: [
    "You're relabeling a value based on what it currently is — not filtering anything out, every flight still shows up.",
    "Three possible outcomes for three possible status values, in the column list of your SELECT.",
    "Try: SELECT flight_number, CASE WHEN status = 'on_time' THEN 'On Time' WHEN status = 'delayed' THEN 'Delayed' ELSE 'Cancelled' END AS status_label FROM flights;",
  ],
  expectedColumns: ["flight_number", "status_label"],
  expectedRows: [
    ["SA101", "On Time"],
    ["SA102", "Delayed"],
    ["SA103", "On Time"],
    ["SA104", "Cancelled"],
    ["SA105", "Delayed"],
    ["SA106", "On Time"],
    ["SA107", "Delayed"],
    ["SA108", "On Time"],
    ["SA109", "Cancelled"],
    ["SA110", "On Time"],
    ["SA111", "Delayed"],
    ["SA112", "On Time"],
  ],
  requireRowOrder: false,
  xpAward: 125,
};
