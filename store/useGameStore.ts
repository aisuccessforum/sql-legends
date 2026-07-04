import { create } from "zustand";

export type Rank = "Intern" | "Junior Analyst";

interface GameState {
  rank: Rank;
  xp: number;
  completedMissions: string[];
  lastAward: number | null;
  completeMission: (missionId: string, xpAward: number) => void;
  clearLastAward: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  rank: "Intern",
  xp: 0,
  completedMissions: [],
  lastAward: null,

  completeMission: (missionId, xpAward) => {
    if (get().completedMissions.includes(missionId)) return;
    set((state) => ({
      xp: state.xp + xpAward,
      completedMissions: [...state.completedMissions, missionId],
      lastAward: xpAward,
    }));
  },

  clearLastAward: () => set({ lastAward: null }),
}));
