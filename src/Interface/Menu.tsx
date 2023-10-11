import { Levels } from "../Levels";
import { usePlayerStore } from "../Stores/usePlayerStore";
import { useState } from "react";

function MenuButton({
    text,
    selected,
    onClick,
}: {
    text: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            className={`${
                selected
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-slate-600 hover:bg-slate-500"
            } w-full duration-100 rounded-lg px-4 py-2 drop-shadow-lg text-start col-span-1`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export function Menu() {
    const toggleMenu = usePlayerStore((state) => state.toggleMenu);
    const setLevel = usePlayerStore((state) => state.setLevel);
    const bestLevel = usePlayerStore((state) => state.bestLevel);

    const [selectedMenu, setSelectedMenu] = useState("LevelSelection");

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="m-auto text-white bg-black/75 rounded-lg p-4 w-1/2 h-1/2 flex flex-col gap-2">
                <header>
                    <div>Game Menu</div>
                    <hr className="opacity-50" />
                </header>
                <section className="flex overflow-hidden">
                    {/* List of menu options */}
                    <div className="h-full flex flex-col gap-2 pe-4 hide-scrollbar overflow-scroll w-[200px]">
                        <MenuButton
                            text="Level Selection"
                            selected={selectedMenu === "LevelSelection"}
                            onClick={() => setSelectedMenu("LevelSelection")}
                        />
                        <MenuButton
                            text="Settings"
                            selected={selectedMenu === "Settings"}
                            onClick={() => setSelectedMenu("Settings")}
                        />
                        <MenuButton
                            text="Credits"
                            selected={selectedMenu === "Credits"}
                            onClick={() => setSelectedMenu("Credits")}
                        />
                    </div>
                    {/* Content */}
                    <div className="flex-grow overflow-auto hide-scrollbar">
                        {selectedMenu === "LevelSelection" && (
                            <>
                                <div className="text-white font-semibold text-xl">
                                    Level Selection
                                </div>
                                {/* Show scrollbar if there's more than 5 elements */}
                                <div className="flex flex-col gap-2 mt-1">
                                    {Levels.map((level, index) => {
                                        return (
                                            <button
                                                className={`bg-blue-600 hover:bg-blue-500 duration-100 rounded-lg px-4 py-2 drop-shadow-lg text-start col-span-1 ${
                                                    index > bestLevel &&
                                                    "opacity-50"
                                                }`}
                                                disabled={index > bestLevel}
                                                onClick={() => {
                                                    toggleMenu();
                                                    setLevel(index);
                                                }}
                                            >
                                                {index > bestLevel &&
                                                    "(LOCKED) "}
                                                {index} - {level.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        {selectedMenu === "Settings" && (
                            <>
                                <div className="text-white font-semibold text-xl">
                                    Settings (TODO)
                                </div>
                                <div className="grid xl:grid-cols-2 gap-x-6 gap-y-2 mt-1">
                                    <div className="grid grid-cols-4 justify-between items-center">
                                        <div className="text-white/50 col-span-3">
                                            Instantly go to next level
                                        </div>
                                        <button className="w-full bg-slate-600 hover:bg-slate-500 duration-100 rounded-lg px-4 py-2 drop-shadow-lg text-center col-span-1">
                                            OFF
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-4 justify-between items-center">
                                        <div className="text-white/50 col-span-3">
                                            Sound Effects
                                        </div>
                                        <button className="w-full bg-green-600 hover:bg-green-500 duration-100 rounded-lg px-4 py-2 drop-shadow-lg text-center col-span-1">
                                            ON
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {selectedMenu === "Credits" && (
                            <>
                                <div className="text-white font-semibold text-xl">
                                    Credits
                                </div>
                                <ul className="flex flex-col gap-2 mt-1">
                                    <li className="text-white/50">
                                        This project was made by{" "}
                                        <a
                                            className="text-blue-400 hover:text-blue-300 font-bold duration-100"
                                            target="_blank"
                                            href="github.com/Jxl-s"
                                        >
                                            @Jxl-s
                                        </a>
                                        , and the source code can be found{" "}
                                        <a
                                            className="text-blue-400 hover:text-blue-300 font-bold duration-100"
                                            target="_blank"
                                            href="https://github.com/Jxl-s/r3f-color-switcher"
                                        >
                                            here
                                        </a>
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
