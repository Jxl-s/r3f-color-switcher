import { RigidBody } from "@react-three/rapier";
import { Player } from "../Components/Player";
import * as THREE from "three";

export function Level1() {
    return (
        <>
            <RigidBody type="fixed">
                <mesh rotation-x={-Math.PI * 0.5}>
                    <planeGeometry args={[20, 100]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
            </RigidBody>

            <Player />
        </>
    );
}
