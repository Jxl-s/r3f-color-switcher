import { create } from "zustand";

export const ColorsArray = [
    "white",
    "orange",
    "greenyellow",
    "mediumpurple",
    "crimson",
] as const;

export const ColorNames = {
    white: "White",
    orange: "Orange",
    greenyellow: "Green",
    mediumpurple: "Purple",
    crimson: "Red",
};

export const LevelNames = ["Tutorial", "Color Switch"];
export type Colors = (typeof ColorsArray)[number];

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

    level: 0,
    intermission: false,

    finishLevel: () => set({ intermission: true }),
    nextLevel: () => set((state) => ({ level: state.level + 1, intermission: false })),
}));
