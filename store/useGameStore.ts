import { create } from "zustand";
import { clearSave, writeSave } from "@/lib/db";

interface GameState {
  ready: boolean;
  rank: string;
  xp: number;
  completedMissions: string[];
  lastAward: number | null;
  certificateNumber: string | null;
  certifiedAt: number | null;
  seedFromProfile: (profile: {
    rank: string;
    xp: number;
    completedMissions: string[];
    certificateNumber?: string | null;
    certifiedAt?: number | null;
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
  certificateNumber: null,
  certifiedAt: null,

  seedFromProfile: (profile) =>
    set({
      rank: profile.rank,
      xp: profile.xp,
      completedMissions: profile.completedMissions,
      certificateNumber: profile.certificateNumber ?? null,
      certifiedAt: profile.certifiedAt ?? null,
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
