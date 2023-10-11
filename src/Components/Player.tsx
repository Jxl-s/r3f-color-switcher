import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useState, useRef, useEffect } from "react";
import { usePlayerStore } from "../Stores/usePlayerStore";
import * as THREE from "three";
import { useControls } from "leva";

const MOVE_SPEED = 36;
const MAX_SPEED = 5;
const MAX_SPRINT_SPEED = 10;

const tempVec = new THREE.Vector3();

interface Props {
    inputDisabled?: boolean;
}

export default function Player({ inputDisabled = false }: Props) {
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const [maxSpeed, setMaxSpeed] = useState(MAX_SPEED);
    const { rapier, world } = useRapier();

    const { orbitControls } = useControls({
        orbitControls: false,
    });

    const color = usePlayerStore((state) => state.color);
    const setColor = usePlayerStore((state) => state.setColor);

    const [cameraPosition] = useState(new THREE.Vector3(0, 9, 4));
    const [cameraTarget] = useState(new THREE.Vector3(0, 1, 0));

    // Subscribe to the keys
    useEffect(() => {
        if (inputDisabled) return;

        const unsubscribeSprint = subscribeKeys(
            (state) => state.sprint,
            (sprinting) => {
                setMaxSpeed(sprinting ? MAX_SPRINT_SPEED : MAX_SPEED);
            }
        );

        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (jumping) => {
                if (!rigidBody.current) return;
                if (!jumping) return;

                // Get current position
                const origin = rigidBody.current.translation();
                origin.y -= 1.01;

                // Determine if player is grounded
                const ray = new rapier.Ray(origin, { x: 0, y: -1, z: 0 });
                const rayHit = world.castRay(ray, 10, true);

                // If player is grounded, apply impulse
                if (rayHit && rayHit.toi < 0.2) {
                    const impulse = { x: 0, y: 36, z: 0 };
                    rigidBody.current?.applyImpulse(impulse, true);
                }
            }
        );

        return () => {
            unsubscribeSprint();
            unsubscribeJump();
        };
    }, [subscribeKeys, rapier.Ray, world, inputDisabled]);

    const rigidBody = useRef<RapierRigidBody>(null);

    const resetPlayer = () => {
        if (!rigidBody.current) return;

        rigidBody.current.setTranslation({ x: 0, y: 1, z: 0 }, true);
        rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }, true);

        // Also change the color
        setTimeout(() => setColor("white"), 100);
    };

    useFrame((state, delta) => {
        if (!rigidBody.current) return;

        // Handle movement
        if (!inputDisabled) {
            const { forward, backward, leftward, rightward } = getKeys();

            const impulseStrength = delta * MOVE_SPEED;
            const torqueStrength = delta * MOVE_SPEED;

            // Calculate directions
            const linVel = rigidBody.current.linvel();
            const impulse = { x: 0, y: 0, z: 0 };
            const torque = { x: 0, y: 0, z: 0 };

            if (leftward && linVel.x > -maxSpeed) {
                impulse.x -= impulseStrength;
                torque.z += torqueStrength;
            }

            if (rightward && linVel.x < maxSpeed) {
                impulse.x += impulseStrength;
                torque.z -= torqueStrength;
            }

            if (forward && linVel.z > -maxSpeed) {
                impulse.z -= impulseStrength;
                torque.x -= torqueStrength;
            }

            if (backward && linVel.z < maxSpeed) {
                impulse.z += impulseStrength;
                torque.x += torqueStrength;
            }

            // Apply impulses
            rigidBody.current.applyImpulse(impulse, true);
            rigidBody.current.applyTorqueImpulse(torque, true);
        }

        const bodyPosition = rigidBody.current.translation();

        // Handle camera
        if (!orbitControls) {
            const _cameraPosition = { ...bodyPosition };
            _cameraPosition.y += 8;
            _cameraPosition.z += 4;

            const _cameraTarget = { ...bodyPosition };
            _cameraTarget.y += 4;

            tempVec.set(
                _cameraPosition.x,
                _cameraPosition.y,
                _cameraPosition.z
            );
            cameraPosition.lerp(tempVec, delta * 2);

            tempVec.set(_cameraTarget.x, _cameraTarget.y, _cameraTarget.z);
            cameraTarget.lerp(tempVec, delta * 2);

            state.camera.position.copy(cameraPosition);
            state.camera.lookAt(cameraTarget);
        }

        // Handle fall
        if (bodyPosition.y < -10) {
            resetPlayer();
        }
    });

    return (
        <RigidBody
            type="dynamic"
            position-y={1}
            colliders="ball"
            friction={1}
            ref={rigidBody}
            userData={{ type: "player", reset: resetPlayer }}
        >
            <mesh castShadow>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial color={color} flatShading={true} />
            </mesh>
        </RigidBody>
    );
}
