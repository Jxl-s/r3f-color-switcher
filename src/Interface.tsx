import {
    ColorNames,
    LevelNames,
    usePlayerStore,
} from "./Stores/usePlayerStore";

export function Interface() {
    const level = usePlayerStore((state) => state.level);
    const color = usePlayerStore((state) => state.color);
    const intermission = usePlayerStore((state) => state.intermission);
    const nextLevel = usePlayerStore((state) => state.nextLevel);

    return (
        <div className="interface">
            {/* Main display */}
            {level === 0 && (
                <>
                    <h1 className="absolute top-40 w-full text-center text-white text-6xl font-bold bg-black/50 py-4">
                        <span className="game-title">Color Switcher</span>
                        <p className="text-lg font-normal text-white/75 mt-1">
                            Use colors to get through the obstacles
                        </p>
                    </h1>
                </>
            )}
            {level > 0 && !intermission && (
                <>
                    <div className="fixed bottom-0 left-0 w-full bg-black/50 p-4 flex justify-between">
                        <div className="text-xl font-semibold text-white">
                            Level {level}: {LevelNames[level]}
                        </div>

                        <div className="text-xl font-semibold text-white">
                            {/* TODO: Add time here */}
                            (time here)
                        </div>
                        <div className="text-xl font-semibold text-white">
                            Color:{" "}
                            <span style={{ color }}>{ColorNames[color]}</span>
                        </div>
                    </div>
                </>
            )}

            {/* Intermission display */}
            {intermission && (
                <>
                    <div className="w-full h-full bg-black/50 flex justify-center align-middle">
                        <div className="m-auto text-center text-white">
                            <h1 className="text-5xl font-bold">
                                Level cleared!
                            </h1>
                            <h1 className="text-2xl opacity-50">
                                1 - Tutorial
                            </h1>
                            {/* <h1
                                className="text-3xl font-bold"
                                style={{ marginTop: "50px" }}
                            >
                                Clear Time
                            </h1>
                            <h1 className="text-2xl opacity-50">
                                (add time here)
                            </h1> */}
                            <button
                                style={{ marginTop: "20px", width: "100%" }}
                                className="bg-green-500 rounded-lg py-2 px-6 text-2xl drop-shadow-lg hover:bg-green-400 duration-100 font-bold"
                                onClick={() => nextLevel()}
                            >
                                Next Level
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
