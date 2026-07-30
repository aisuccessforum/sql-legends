import type { Mission } from "./level001";

export const level079: Mission = {
  id: "intern-ticket-079",
  world: "Sky Airlines",
  levelLabel: "Ticket INT-079 // Final Assessment 4 of 5",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "01:15 PM. Final Internship Assessment. Priority: Critical.",
    "\"Sky Airlines wants route-level numbers, not flight-level — a route being origin and destination together, since the same city pair can have several flights. Average passenger count per route, but only routes we actually fly more than once. A one-off flight doesn't tell you anything about a route.\"",
  ],
  objective:
    "For each route (origin and destination combined), select the average passenger count, but only for routes with more than 1 flight.",
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
    "A route is two columns together, not one — group by both origin and destination at the same time, separated by a comma.",
    "Filtering to routes flown \"more than once\" is a condition on the group itself, not on individual rows.",
    "Try: SELECT origin, destination, AVG(passenger_count) AS avg_passengers FROM flights GROUP BY origin, destination HAVING COUNT(*) > 1;",
  ],
  expectedColumns: ["origin", "destination", "avg_passengers"],
  expectedRows: [["Mumbai", "Delhi", 175]],
  requireRowOrder: false,
  xpAward: 250,
};
