import { create } from "zustand";

interface SettingsStore {
    soundEffects: boolean;
    instantLevel: boolean;

    toggleSoundEffects: () => void;
    toggleInstantLevel: () => void;

    setSoundEffects: (soundEffects: boolean) => void;
    setInstantLevel: (instantLevel: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
    soundEffects: true,
    instantLevel: false,

    toggleSoundEffects: () => set((state) => ({ soundEffects: !state.soundEffects })),
    toggleInstantLevel: () => set((state) => ({ instantLevel: !state.instantLevel })),

    setSoundEffects: (soundEffects: boolean) => set({ soundEffects }),
    setInstantLevel: (instantLevel: boolean) => set({ instantLevel }),
}));
