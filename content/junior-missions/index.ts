import type { Mission } from "../missions/level001";

/**
 * Junior Data Analyst rank missions, in unlock order. Empty for now —
 * populated module by module the same way the Intern track was built.
 * IDs use the "junior-ticket-XXX" prefix so they can never collide with
 * "intern-ticket-XXX" IDs in the same completedMissions array.
 */
export const juniorMissions: Mission[] = [];

/**
 * Module names not yet built, shown as locked "coming soon" cards.
 */
export const juniorUpcomingModules: string[] = [
  "Subqueries Fundamentals",
  "Common Table Expressions",
  "Window Functions I",
  "Window Functions II",
  "Advanced Joins",
  "Junior Analyst Capstone Assessment",
];
