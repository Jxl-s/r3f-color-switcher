import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { usePlayerStore } from "./Stores/usePlayerStore";
import { useControls } from "leva";
import { getLevelComponent } from "./Levels";

export function Experience() {
    const level = usePlayerStore((state) => state.level);
    const LevelComponent = getLevelComponent(level);

    const { orbitControls } = useControls({
        orbitControls: false,
    });

    return (
        <>
            {orbitControls && <OrbitControls />}
            <PerspectiveCamera fov={90} makeDefault />

            {/* TODO: Level selection logic */}
            <LevelComponent />
        </>
    );
}
