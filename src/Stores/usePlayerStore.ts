import { create } from "zustand";

export type Colors =
    | "white"
    | "orange"
    | "greenyellow"
    | "mediumpurple"
    | "crimson";

interface PlayerStore {
    color: Colors;
    setColor: (color: Colors) => void;

    level: number;
    intermission: boolean;

    finishLevel: () => void;
    nextLevel: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    color: "white",
    setColor: (color) => set({ color }),

    level: 1,
    intermission: false,

    finishLevel: () => set({ intermission: true }),
    nextLevel: () => set((state) => ({ level: state.level + 1 })),
}));
