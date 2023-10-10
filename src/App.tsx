import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Physics } from "@react-three/rapier";
import { Lights } from "./Lights";
import Effects from "./Effects";
import { Interface } from "./Interface";
import { Suspense } from "react";

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
                <Suspense fallback={null}>
                    <Canvas shadows>
                        <OrbitControls makeDefault />
                        {/* <OrthographicCamera makeDefault position={[10, 0, 10]} /> */}
                        <Physics gravity={[0, -18, 0]}>
                            <Lights />
                            <Effects />
                            <Experience />
                        </Physics>
                    </Canvas>
                    <Interface />
                </Suspense>
            </KeyboardControls>
        </>
    );
}
