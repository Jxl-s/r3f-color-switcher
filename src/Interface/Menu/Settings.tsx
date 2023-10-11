import { useSettingsStore } from "../../Stores/useSettingsStore";

function SettingToggle({
    text,
    enabled,
    onClick,
}: {
    text: string;
    enabled: boolean;
    onClick: () => void;
}) {
    return (
        <div className="grid grid-cols-4 justify-between items-center">
            <div className="text-white/50 col-span-3">
                {text}
            </div>
            <button
                className={`w-full ${
                    enabled
                        ? "bg-green-600 hover:bg-green-500"
                        : "bg-slate-600 hover:bg-slate-500"
                } duration-100 rounded-lg px-4 py-2 drop-shadow-lg text-center col-span-1`}
                onClick={onClick}
            >
                {enabled ? "ON" : "OFF"}
            </button>
        </div>
    );
}

export function Settings() {
    const settings = useSettingsStore();

    return (
        <>
            <div className="text-white font-semibold text-xl">
                Settings (TODO)
            </div>
            <div className="grid xl:grid-cols-2 gap-x-6 gap-y-2 mt-1">
                <SettingToggle
                    text={"Auto \"Next Level\""}
                    enabled={settings.instantLevel}
                    onClick={() => settings.toggleInstantLevel()}
                />
                <SettingToggle
                    text="Sound Effects"
                    enabled={settings.soundEffects}
                    onClick={() => settings.toggleSoundEffects()}
                />
            </div>
        </>
    );
}
