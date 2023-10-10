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

export const LevelNames = ["Tutorial", "Color Switch", "Choices", "To Be Continued..."];
export type Colors = (typeof ColorsArray)[number];

interface PlayerStore {
    color: Colors;
    setColor: (color: Colors) => void;

    level: number;
    intermission: boolean;

    finishLevel: () => void;
    nextLevel: () => void;
    resetProgress: () => void;
}

// Play the win sound here
const winAudio = new Audio("/sounds/win.wav");
winAudio.volume = 0.5;

export const usePlayerStore = create<PlayerStore>((set) => ({
    color: "white",
    setColor: (color) => set({ color }),

    level: 0,
    intermission: false,

    finishLevel: () => {
        winAudio.play();
        set({ intermission: true });
    },
    nextLevel: () =>
        set((state) => ({
            level: state.level + 1,
            intermission: false,
            color: "white",
        })),

    resetProgress: () => set({ level: 0, intermission: false, color: "white" }),
}));

usePlayerStore.subscribe((state) => {
    localStorage.setItem("cur_level", state.level.toString());
});

if (localStorage.getItem("cur_level")) {
    usePlayerStore.setState({
        level: Number(localStorage.getItem("cur_level")),
    });
}
