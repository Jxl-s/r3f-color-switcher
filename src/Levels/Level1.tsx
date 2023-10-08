import { RigidBody } from "@react-three/rapier";
import { Player } from "../Components/Player";
import * as THREE from "three";
import { ColorSwitch } from "../Components/ColorSwitch";

export function Level1() {
    return (
        <>
            {/* Walls */}
            <RigidBody type="fixed">
                <mesh>
                    <boxGeometry args={[20, 1, 100]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
            </RigidBody>

            {/* Switches */}
            <ColorSwitch start={[2, 0.25, 0]} color='orange'/>
            {/* Player */}
            <Player />
        </>
    );
}
