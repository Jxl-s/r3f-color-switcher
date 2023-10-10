import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Welcome, Level1, Level2, MoreToCome } from "./Levels";
import { usePlayerStore } from "./Stores/usePlayerStore";
import { useControls } from "leva";

export function Experience() {
    const level = usePlayerStore((state) => state.level);

    const { orbitControls } = useControls({
        orbitControls: false,
    });

    return (
        <>
            {orbitControls && <OrbitControls />}
            <PerspectiveCamera fov={90} makeDefault/>

            {/* TODO: Level selection logic */}
            {level === 0 && <Welcome />}
            {level === 1 && <Level1 />}
            {level === 2 && <Level2 />}
            {level === 3 && <MoreToCome />}
        </>
    );
}
