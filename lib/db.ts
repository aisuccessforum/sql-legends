import type Dexie from "dexie";
import type { Table } from "dexie";

export interface PlayerSave {
  id: number; // fixed at 1 — single local save slot for this slice
  rank: string;
  xp: number;
  completedMissions: string[];
  updatedAt: number;
}

type SqlLegendsDB = Dexie & { player: Table<PlayerSave, number> };

const SAVE_ID = 1;
let dbPromise: Promise<SqlLegendsDB> | null = null;

/**
 * Lazily creates the Dexie database. Dexie is dynamically imported and the
 * database is only opened when this is actually called — never at module
 * load time — so it's safe to import this file from a component that gets
 * server-prerendered during `next build`, where no indexedDB exists.
 */
function getDb(): Promise<SqlLegendsDB> {
  if (!dbPromise) {
    dbPromise = import("dexie").then(({ default: DexieCtor }) => {
      class Database extends DexieCtor {
        player!: Table<PlayerSave, number>;
        constructor() {
          super("sql-legends");
          this.version(1).stores({
            player: "id",
          });
        }
      }
      return new Database() as SqlLegendsDB;
    });
  }
  return dbPromise;
}

export async function loadSave(): Promise<PlayerSave | undefined> {
  if (typeof window === "undefined") return undefined;
  const db = await getDb();
  return db.player.get(SAVE_ID);
}

export async function writeSave(
  save: Omit<PlayerSave, "id" | "updatedAt">
): Promise<void> {
  if (typeof window === "undefined") return;
  const db = await getDb();
  await db.player.put({ id: SAVE_ID, updatedAt: Date.now(), ...save });
}

export async function clearSave(): Promise<void> {
  if (typeof window === "undefined") return;
  const db = await getDb();
  await db.player.delete(SAVE_ID);
}