import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useState, useRef } from "react";
import * as THREE from "three";

const MOVE_SPEED = 30;
const MAX_SPEED = 10;

export function Player() {
    const [subscribeKeys, getKeys] = useKeyboardControls();

    const rigidBody = useRef<RapierRigidBody>(null);
    useFrame((state, delta) => {
        if (!rigidBody.current) return;

        // Destructure the keys
        const { forward, backward, leftward, rightward } = getKeys();

        const impulseStrength = delta * MOVE_SPEED;
        const torqueStrength = delta * MOVE_SPEED;

        // Calculate directions
        const linVel = rigidBody.current.linvel();
        const impulse = { x: 0, y: 0, z: 0 };
        const torque = { x: 0, y: 0, z: 0 };

        if (leftward && linVel.x > -MAX_SPEED) {
            impulse.x -= impulseStrength;
            torque.z += torqueStrength;
        }

        if (rightward && linVel.x < MAX_SPEED) {
            impulse.x += impulseStrength;
            torque.z -= torqueStrength;
        }

        if (forward && linVel.z > -MAX_SPEED) {
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;
        }

        if (backward && linVel.z < MAX_SPEED) {
            impulse.z += impulseStrength;
            torque.x += torqueStrength;
        }

        // Apply impulses
        rigidBody.current.applyImpulse(impulse, true);
        rigidBody.current.applyTorqueImpulse(torque, true);
    });

    return (
        <RigidBody
            type="dynamic"
            position-y={2}
            colliders="ball"
            ref={rigidBody}
        >
            <mesh>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial color="orange" flatShading={true} />
            </mesh>
        </RigidBody>
    );
}
