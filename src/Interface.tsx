import { GameHud } from "./Interface/GameHud";
import { IntermissionUI } from "./Interface/IntermissionUI";
import { WelcomeUI } from "./Interface/WelcomeUI";
import { Menu } from "./Interface/Menu";

import { usePlayerStore } from "./Stores/usePlayerStore";
import { useControls } from "leva";

export function Interface() {
    const level = usePlayerStore((state) => state.level);
    const intermission = usePlayerStore((state) => state.intermission);

    const menuOpened = usePlayerStore((state) => state.menuOpened);

    // TODO
    const { orbitControls } = useControls({
        orbitControls: false,
    });

    return (
        <div className={`interface ${orbitControls && "pointer-events-none"}`}>
            {/* Main display */}
            {level === 0 && <WelcomeUI />}
            {level > 0 && !intermission && <GameHud />}

            {/* Intermission display */}
            {intermission && <IntermissionUI />}

            {/* Menu display */}
            {menuOpened && <Menu />}
        </div>
    );
}
