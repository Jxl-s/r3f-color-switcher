import {
    ColorNames,
    LevelNames,
    usePlayerStore,
} from "./Stores/usePlayerStore";
import { useControls } from "leva";

export function Interface() {
    const level = usePlayerStore((state) => state.level);
    const color = usePlayerStore((state) => state.color);
    const intermission = usePlayerStore((state) => state.intermission);
    const nextLevel = usePlayerStore((state) => state.nextLevel);
    const resetProgress = usePlayerStore((state) => state.resetProgress);

    const { orbitControls } = useControls({
        orbitControls: false,
    });
    return (
        <div className={`interface ${orbitControls && "pointer-events-none"}`}>
            {/* Main display */}
            {level === 0 && (
                <>
                    <h1 className="absolute top-40 w-full text-center text-white text-6xl font-bold bg-black/50 py-4">
                        <span className="game-title">Color Switcher</span>
                        <p className="text-lg font-normal text-white/75 mt-1">
                            Use colors to get through the obstacles
                        </p>
                    </h1>
                    <h1 className="absolute bottom-0 w-full text-center text-white/50 text-xl bg-black/50 py-4">
                        This project's source can be found on my{" "}
                        <a
                            href="https://github.com/Jxl-s/r3f-color-switcher"
                            className="text-blue-400 font-bold"
                        >
                            GitHub
                        </a>
                    </h1>
                </>
            )}
            {level > 0 && !intermission && (
                <>
                    <div className="fixed bottom-0 left-0 w-full bg-black/50 p-4 flex justify-between">
                        <div className="text-xl font-semibold text-white w-1/3 text-start">
                            Level {level}: {LevelNames[level]}
                        </div>

                        <button
                            className="text-xl font-semibold text-red-400 hover:text-red-200 duration-100 w-1/3 text-center"
                            onClick={resetProgress}
                        >
                            Reset Progress
                        </button>
                        <div className="text-xl font-semibold text-white w-1/3 text-end">
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
                                {level} - {LevelNames[level]}
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
