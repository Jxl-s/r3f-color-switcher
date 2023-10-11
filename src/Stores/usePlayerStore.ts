import { create } from "zustand";
import { Levels } from "../Levels";
import { SoundPlayer } from "../Util/SoundPlayer";

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

export type Colors = (typeof ColorsArray)[number];

interface PlayerStore {
    color: Colors;
    setColor: (color: Colors) => void;

    level: number;
    bestLevel: number;
    intermission: boolean;

    finishLevel: () => void;
    nextLevel: () => void;
    setLevel: (level: number) => void;

    // UI Management
    menuOpened: boolean;
    toggleMenu: () => void;
}

// Play the win sound here
const winAudio = new SoundPlayer({ path: "/sounds/win.wav", volume: 0.5 });

export const usePlayerStore = create<PlayerStore>((set) => ({
    color: "white",
    setColor: (color) => set({ color }),

    level: 0,
    bestLevel: 0,

    intermission: false,
    finishLevel: () =>
        set((state) => {
            if (!state.intermission) winAudio.play();
            return { intermission: true };
        }),

    nextLevel: () =>
        set((state) => {
            return {
                level: state.level + 1,
                bestLevel: Math.max(state.level + 1, state.bestLevel),
                intermission: false,
                menuOpened: false,
                color: "white",
            };
        }),

    setLevel: (level) =>
        set({
            level,
            menuOpened: false,
            intermission: false,
            color: "white",
        }),

    // UI Management
    menuOpened: false,
    toggleMenu: () => set((state) => ({ menuOpened: !state.menuOpened })),
}));

usePlayerStore.subscribe((state) => {
    // If the level is higher than the highest level, set it to the highest level
    const highestLevel = Number(localStorage.getItem("best_level") ?? "0");
    if (state.level > highestLevel) {
        localStorage.setItem("best_level", state.level.toString());
    }

    localStorage.setItem("cur_level", state.level.toString());
});

// Loading level
if (localStorage.getItem("cur_level")) {
    let level = Number(localStorage.getItem("cur_level"));
    if (level >= Levels.length) level = Levels.length - 1;

    usePlayerStore.setState({
        level,
    });
}

// Loading level
if (localStorage.getItem("best_level")) {
    const bestLevel = Number(localStorage.getItem("best_level"));

    usePlayerStore.setState({
        bestLevel,
    });
}
