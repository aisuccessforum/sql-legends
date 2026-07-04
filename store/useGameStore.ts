import { create } from "zustand";
import { clearSave, loadSave, writeSave } from "@/lib/db";

export type Rank = "Intern" | "Junior Analyst";

interface GameState {
  rank: Rank;
  xp: number;
  completedMissions: string[];
  lastAward: number | null;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  completeMission: (missionId: string, xpAward: number) => void;
  clearLastAward: () => void;
  resetProgress: () => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  rank: "Intern",
  xp: 0,
  completedMissions: [],
  lastAward: null,
  hydrated: false,

  hydrate: async () => {
    const save = await loadSave();
    if (save) {
      set({
        rank: save.rank as Rank,
        xp: save.xp,
        completedMissions: save.completedMissions,
      });
    }
    set({ hydrated: true });
  },

  completeMission: (missionId, xpAward) => {
    if (get().completedMissions.includes(missionId)) return;
    const nextXp = get().xp + xpAward;
    const nextCompleted = [...get().completedMissions, missionId];

    set({
      xp: nextXp,
      completedMissions: nextCompleted,
      lastAward: xpAward,
    });

    // Fire-and-forget: gameplay never waits on the write, but every
    // mission completion is durably saved to IndexedDB.
    void writeSave({
      rank: get().rank,
      xp: nextXp,
      completedMissions: nextCompleted,
    });
  },

  clearLastAward: () => set({ lastAward: null }),

  resetProgress: async () => {
    await clearSave();
    set({ rank: "Intern", xp: 0, completedMissions: [], lastAward: null });
  },
}));