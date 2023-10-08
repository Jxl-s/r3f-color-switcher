import { create } from "zustand";

export type Colors = "orange" | "greenyellow" | "mediumpurple" | "crimson";

interface PlayerStore {
    color: Colors;
    setColor: (color: Colors) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    color: "crimson",
    setColor: (color) => set({ color }),
}));
