import { create } from "zustand";
import { clearSave, writeSave } from "@/lib/db";

interface GameState {
  ready: boolean;
  rank: string;
  xp: number;
  completedMissions: string[];
  lastAward: number | null;
  seedFromProfile: (profile: {
    rank: string;
    xp: number;
    completedMissions: string[];
  }) => void;
  completeMission: (missionId: string, xpAward: number) => void;
  clearLastAward: () => void;
  resetProgress: () => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  ready: false,
  rank: "Intern",
  xp: 0,
  completedMissions: [],
  lastAward: null,

  seedFromProfile: (profile) =>
    set({
      rank: profile.rank,
      xp: profile.xp,
      completedMissions: profile.completedMissions,
      ready: true,
    }),

  completeMission: (missionId, xpAward) => {
    if (get().completedMissions.includes(missionId)) return;
    const nextXp = get().xp + xpAward;
    const nextCompleted = [...get().completedMissions, missionId];

    set({
      xp: nextXp,
      completedMissions: nextCompleted,
      lastAward: xpAward,
    });

    // Instant local cache — the debounced server sync (see ProgressSync)
    // is what actually reaches the database.
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
    // The next debounced sync tick will push this reset up to the server too.
  },
}));