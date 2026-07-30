import type { Mission } from "./level001";

export const level070: Mission = {
  id: "intern-ticket-070",
  world: "Sky Airlines",
  levelLabel: "Ticket INT-070 // Priority: High",
  npc: "TEAM LEAD MALHOTRA",
  briefing: [
    "11:20 AM. Client: Sky Airlines. Priority: High.",
    "\"Last one on Sky Airlines for now. Which destinations have more than one disrupted flight — delayed or cancelled? Those routes need a operational review before next week's schedule goes out.\"",
  ],
  objective:
    "Select each destination and its count of delayed or cancelled flights, but only for destinations with more than 1.",
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
    "This combines three things you've used separately before — narrowing rows down, grouping what's left, and then filtering the groups themselves.",
    "The condition on individual flights and the condition on the group count are two different clauses, in a specific order.",
    "Try: SELECT destination, COUNT(*) AS disrupted_count FROM flights WHERE status IN ('delayed', 'cancelled') GROUP BY destination HAVING COUNT(*) > 1;",
  ],
  expectedColumns: ["destination", "disrupted_count"],
  expectedRows: [
    ["Delhi", 2],
    ["Mumbai", 2],
  ],
  requireRowOrder: false,
  xpAward: 125,
};
