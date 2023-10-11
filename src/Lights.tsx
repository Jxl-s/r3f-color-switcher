import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type DirectionalLight } from "three";

export function Lights() {
    const lightRef = useRef<DirectionalLight>(null);

    useFrame((state) => {
        if (!lightRef.current) return;

        // Adjust light position
        lightRef.current.position.y = state.camera.position.y - 4;
        lightRef.current.position.z = state.camera.position.z - 1;

        // Adjust light target
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
                shadow-camera-near={0.2}
                shadow-camera-far={20}
                shadow-camera-top={20}
                shadow-camera-right={20}
                shadow-camera-bottom={-20}
                shadow-camera-left={-20}
                castShadow
            />
            {lightRef.current && <directionalLightHelper light={lightRef.current} />}
            <ambientLight color={"lightblue"} intensity={0.8}/>
        </>
    );
}
