import {
    CollisionPayload,
    CuboidCollider,
    IntersectionEnterPayload,
    IntersectionExitPayload,
    RapierRigidBody,
    RigidBody,
} from "@react-three/rapier";
import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { Colors, usePlayerStore } from "../Stores/usePlayerStore";

interface Props {
    start: [number, number, number];
    color: Colors;
}

export function ColorSwitch({ start, color }: Props) {
    const buttonRef = useRef<RapierRigidBody>(null);
    const playerColor = usePlayerStore((state) => state.color);
    const setPlayerColor = usePlayerStore((state) => state.setColor);

    const isPlayerCollision = (payload: CollisionPayload) => {
        if (!payload.rigidBody?.userData) return false;
        if ((payload.rigidBody.userData["type" as never] as unknown as string) !== "player")
            return false;

        return true;
    };

    const onEnter = (payload: IntersectionEnterPayload) => {
        if (!buttonRef.current) return;
        if (!isPlayerCollision(payload)) return;

        // Move the button down
        buttonRef.current.setTranslation({ x: start[0], y: start[1] - 0.1, z: start[2] }, true);

        // Check for colors, change colors
        if (playerColor !== color) {
            setPlayerColor(color);
        }
    };

    const onExit = (payload: IntersectionExitPayload) => {
        if (!buttonRef.current) return;
        if (!isPlayerCollision(payload)) return;

        // Move the button up
        buttonRef.current.setTranslation({ x: start[0], y: start[1], z: start[2] }, true);
    };

    return (
        <>
            <RigidBody type="fixed" position={start}>
                <RoundedBox args={[2, 1, 2]} radius={0.1}>
                    <meshStandardMaterial color="white" />
                </RoundedBox>
            </RigidBody>

            <RigidBody ref={buttonRef} type="kinematicPosition" position={start}>
                <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.1}>
                    <meshStandardMaterial
                        color={color}
                        transparent={true}
                        opacity={playerColor === color ? 0.25 : 1}
                    />
                </RoundedBox>
            </RigidBody>

            {/* Button detector */}
            <CuboidCollider
                sensor={true}
                args={[0.75, 1.3, 0.75]}
                position={start}
                onIntersectionEnter={onEnter}
                onIntersectionExit={onExit}
            />
        </>
    );
}
