import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useState, useRef, useEffect } from "react";

const MOVE_SPEED = 50;
const MAX_SPEED = 5;
const MAX_SPRINT_SPEED = 10;

export function Player() {
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const [maxSpeed, setMaxSpeed] = useState(MAX_SPEED);
    const { rapier, world } = useRapier();

    // Subscribe to the keys
    useEffect(() => {
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
                    const impulse = { x: 0, y: 50, z: 0 };
                    rigidBody.current?.applyImpulse(impulse, true);
                }
            }
        );

        return () => {
            unsubscribeSprint();
            unsubscribeJump();
        };
    }, []);

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
    });

    return (
        <RigidBody
            type="dynamic"
            position-y={1}
            colliders="ball"
            friction={1}
            ref={rigidBody}
        >
            <mesh>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial color="orange" flatShading={true} />
            </mesh>
        </RigidBody>
    );
}
