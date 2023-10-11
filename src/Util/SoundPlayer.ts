import { useSettingsStore } from "../Stores/useSettingsStore";

export class SoundPlayer {
    private audio: HTMLAudioElement;
    private offset: number;

    public constructor(props: {
        path: string;
        volume?: number;
        offset?: number;
    }) {
        this.audio = new Audio(props.path);

        // Other params
        this.audio.volume = props.volume ?? 1;
        this.offset = props.offset ?? 0;
    }

    public play(): void {
        // Make sure SFX are enabled
        if (useSettingsStore.getState().soundEffects === false) return;

        this.audio.currentTime = this.offset;
        this.audio.play();
    }
}
