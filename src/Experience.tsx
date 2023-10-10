import { OrbitControls } from "@react-three/drei";
import { Level0, Level1, Level2 } from "./Levels";
import { usePlayerStore } from "./Stores/usePlayerStore";
import { useControls } from "leva";

export function Experience() {
    const level = usePlayerStore((state) => state.level);

    const { orbitControls } = useControls({
        orbitControls: false,
    });

    return (
        <>
            {orbitControls && <OrbitControls makeDefault />}

            {/* TODO: Level selection logic */}
            {level === 0 && <Level0 />}
            {level === 1 && <Level1 />}
            {level === 2 && <Level2 />}
        </>
    );
}
