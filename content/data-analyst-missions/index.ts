import type { Mission } from "../missions/level001";
import { da001 } from "./da001";
import { da002 } from "./da002";
import { da003 } from "./da003";
import { da004 } from "./da004";
import { da005 } from "./da005";
import { da006 } from "./da006";
import { da007 } from "./da007";
import { da008 } from "./da008";

/**
 * Data Analyst rank missions, in unlock order. Populated module by
 * module the same way the Intern and Junior tracks were built. IDs use
 * the "da-ticket-XXX" prefix so they can never collide with
 * "intern-ticket-XXX" or "junior-ticket-XXX" IDs in the same
 * completedMissions array.
 */
export const dataAnalystMissions: Mission[] = [
  da001,
  da002,
  da003,
  da004,
  da005,
  da006,
  da007,
  da008,
];

/**
 * Module names not yet built, shown as locked "coming soon" cards.
 */
export const dataAnalystUpcomingModules: string[] = [
  "String Functions & Data Cleaning",
  "Date & Time Functions",
  "Advanced Window Functions",
  "Views & Query Organization",
  "Query Performance Basics",
  "Data Analyst Capstone Assessment",
];
