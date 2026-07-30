import type { Mission } from "./level001";

export const level066: Mission = {
  id: "intern-ticket-066",
  world: "Sky Airlines",
  levelLabel: "Ticket INT-066 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "08:40 AM. Client: Sky Airlines. Priority: High.",
    "New client, and a change in how these tickets work from here. I'm not going to tell you which technique to use anymore — just the business problem. You've learned everything you need. Figure out the rest yourself.",
    "\"Ops wants one number for the morning call: how many flights today were disrupted in some way — delayed or cancelled, doesn't matter which.\"",
  ],
  objective:
    "Count how many flights have a status of 'delayed' or 'cancelled', labeling the result as disrupted_flights.",
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
    "Two statuses count as \"disrupted\" here — you need rows matching either one.",
    "Think about what you're actually being asked for: a single summary number, not a list of flights.",
    "Try: SELECT COUNT(*) AS disrupted_flights FROM flights WHERE status IN ('delayed', 'cancelled');",
  ],
  expectedColumns: ["disrupted_flights"],
  expectedRows: [[6]],
  requireRowOrder: false,
  xpAward: 125,
};
