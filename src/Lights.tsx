import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type DirectionalLight } from "three";

export function Lights() {
    const lightRef = useRef<DirectionalLight>(null);

    useFrame((state) => {
        if (!lightRef.current) return;

        lightRef.current.position.z = state.camera.position.z - 1;
        lightRef.current.target.position.z = state.camera.position.z - 2;
        lightRef.current.target.updateMatrixWorld();
    });

    return (
        <>
            <directionalLight
                position={[2, 4, 3]}
                ref={lightRef}
                intensity={1.5}
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={10}
                shadow-camera-right={10}
                shadow-camera-bottom={-10}
                shadow-camera-left={-10}
                castShadow
            />
            <ambientLight color={"lightblue"} intensity={0.8}/>
        </>
    );
}
