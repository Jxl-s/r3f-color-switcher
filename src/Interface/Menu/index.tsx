import { useState } from "react";
import { LevelSelection } from "./LevelSelection";
import { Settings } from "./Settings";
import { Credits } from "./Credits";

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
                            <LevelSelection />
                        )}

                        {selectedMenu === "Settings" && <Settings />}
                        {selectedMenu === "Credits" && <Credits />}
                    </div>
                </section>
            </div>
        </div>
    );
}
