import { RigidBody } from "@react-three/rapier";
import { Player } from "../Components/Player";
import * as THREE from "three";

export function Level1() {
    return (
        <>
            <RigidBody type="fixed">
                <mesh>
                    <boxGeometry args={[20, 1, 100]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
            </RigidBody>
            <Player />
        </>
    );
}
