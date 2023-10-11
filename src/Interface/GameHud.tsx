import { getLevelName } from "../Levels";
import { ColorNames, usePlayerStore } from "../Stores/usePlayerStore";

export function GameHud() {
    const level = usePlayerStore((state) => state.level);
    const color = usePlayerStore((state) => state.color);

    const openMenu = usePlayerStore((state) => state.openMenu);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black/50 p-4 flex justify-between">
            <div className="text-xl font-semibold text-white w-1/3 text-start">
                Level {level}: {getLevelName(level)}
            </div>

            <button
                className="text-xl font-semibold text-blue-400 hover:text-blue-200 duration-100 w-1/3 text-center"
                onClick={openMenu}
            >
                Open Menu
            </button>
            <div className="text-xl font-semibold text-white w-1/3 text-end">
                Color: <span style={{ color }}>{ColorNames[color]}</span>
            </div>
        </div>
    );
}
