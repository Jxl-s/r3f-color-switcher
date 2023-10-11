import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Physics } from "@react-three/rapier";
import { Lights } from "./Lights";
import Effects from "./Effects";
import { Interface } from "./Interface";
import { Suspense } from "react";
import { Leva } from "leva";
import { Perf } from "r3f-perf";
import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => e.preventDefault();
        window.addEventListener("keydown", onKeyDown);

        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);
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
                    <Leva hidden={window.location.hash !== "#debug"} />
                    <Canvas shadows>
                        {window.location.hash === "#debug" && (
                            <Perf position="top-left" />
                        )}
                        <Physics
                            gravity={[0, -18, 0]}
                            debug={window.location.hash === "#debug"}
                        >
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
