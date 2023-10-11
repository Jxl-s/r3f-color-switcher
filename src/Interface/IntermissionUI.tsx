import { getLevelName } from "../Levels";
import { usePlayerStore } from "../Stores/usePlayerStore";

export function IntermissionUI() {
    const level = usePlayerStore((state) => state.level);
    const nextLevel = usePlayerStore((state) => state.nextLevel);

    return (
        <>
            <div className="w-full h-full bg-black/50 flex justify-center align-middle">
                <div className="m-auto text-center text-white">
                    <h1 className="text-5xl font-bold">Level cleared!</h1>
                    <h1 className="text-2xl opacity-50 mt-2">
                        {level} - {getLevelName(level)}
                    </h1>
                    <button
                        style={{ marginTop: "40px", width: "100%" }}
                        className="bg-green-500 rounded-lg py-2 px-6 text-2xl drop-shadow-lg hover:bg-green-400 duration-100 font-bold"
                        onClick={() => nextLevel()}
                    >
                        Next Level
                    </button>
                </div>
            </div>
        </>
    );
}
