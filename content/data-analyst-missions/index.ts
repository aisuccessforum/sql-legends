import type { Mission } from "../missions/level001";

/**
 * Data Analyst rank missions, in unlock order. Empty for now — populated
 * module by module the same way the Intern and Junior tracks were built.
 * IDs use the "da-ticket-XXX" prefix so they can never collide with
 * "intern-ticket-XXX" or "junior-ticket-XXX" IDs in the same
 * completedMissions array.
 */
export const dataAnalystMissions: Mission[] = [];

/**
 * Module names not yet built, shown as locked "coming soon" cards.
 */
export const dataAnalystUpcomingModules: string[] = [
  "Recursive CTEs",
  "String Functions & Data Cleaning",
  "Date & Time Functions",
  "Advanced Window Functions",
  "Views & Query Organization",
  "Query Performance Basics",
  "Data Analyst Capstone Assessment",
];
