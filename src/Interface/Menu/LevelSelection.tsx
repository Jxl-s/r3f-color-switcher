import { Levels } from "../../Levels";
import { usePlayerStore } from "../../Stores/usePlayerStore";

export function LevelSelection() {
    const toggleMenu = usePlayerStore((state) => state.toggleMenu);
    const setLevel = usePlayerStore((state) => state.setLevel);
    const bestLevel = usePlayerStore((state) => state.bestLevel);

    return (
        <>
            <div className="text-white font-semibold text-xl">
                Level Selection
            </div>
            {/* Show scrollbar if there's more than 5 elements */}
            <div className="flex flex-col gap-2 mt-1">
                {Levels.map((level, index) => (
                    <button
                        key={index}
                        className={`bg-blue-600 hover:bg-blue-500 duration-100 rounded-lg px-4 py-2 drop-shadow-lg text-start col-span-1 ${
                            index > bestLevel && "opacity-50"
                        }`}
                        disabled={index > bestLevel}
                        onClick={() => {
                            toggleMenu();
                            setLevel(index);
                        }}
                    >
                        {index > bestLevel && "(LOCKED) "}
                        {index} - {level.name}
                    </button>
                ))}
            </div>
        </>
    );
}
