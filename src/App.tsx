import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Physics } from "@react-three/rapier";

export default function App() {
    return (
        <>
            <KeyboardControls
                map={[
                    // WASD
                    { keys: ["KeyW", "ArrowUp"], name: "forward" },
                    { keys: ["KeyS", "ArrowDown"], name: "backward" },
                    { keys: ["KeyA", "ArrowLeft"], name: "leftward" },
                    { keys: ["KeyD", "ArrowRight"], name: "rightward" },

                    // Other
                    { keys: ["Space"], name: "jump" },
                    { keys: ["ShiftLeft", "ShiftRight"], name: "sprint" },
                ]}
            >
                <Canvas>
                    <OrbitControls />
                    <Physics debug>
                        <Experience />
                    </Physics>
                </Canvas>
            </KeyboardControls>
        </>
    );
}
