import { create } from "zustand";

export type Colors = "white" | "orange" | "greenyellow" | "mediumpurple" | "crimson";

interface PlayerStore {
    color: Colors;
    setColor: (color: Colors) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    color: "white",
    setColor: (color) => set({ color }),
}));
