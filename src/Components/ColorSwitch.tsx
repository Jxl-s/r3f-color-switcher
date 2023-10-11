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
import gsap from "gsap";
import { SoundPlayer } from "../Util/SoundPlayer";

interface Props {
    position: [number, number, number];
    color: Colors;
}

const enterSound = new SoundPlayer({
    path: "/sounds/button_enter.mp3",
    volume: 0.5,
});

const exitSound = new SoundPlayer({
    path: "/sounds/button_exit.mp3",
    volume: 0.25,
});

export default function ColorSwitch({ position, color }: Props) {
    const buttonRef = useRef<RapierRigidBody>(null);
    const playerColor = usePlayerStore((state) => state.color);
    const setPlayerColor = usePlayerStore((state) => state.setColor);

    const isPlayerCollision = (payload: CollisionPayload) => {
        const userData = payload.rigidBody?.userData as Record<string, unknown>;
        return userData?.type === "player";
    };

    const animateButton = (y: number) => {
        if (!buttonRef.current) return;

        // Animate the button
        const btnTr = buttonRef.current.translation();
        const onStep = () => buttonRef.current?.setTranslation(btnTr, true);
        gsap.to(btnTr, {
            y,
            duration: 0.1,
            ease: "power1.out",
            onUpdate: onStep,
        }).play();
    };

    const onEnter = (payload: IntersectionEnterPayload) => {
        if (!buttonRef.current) return;
        if (!isPlayerCollision(payload)) return;

        // Check for colors, change colors
        if (playerColor !== color) setPlayerColor(color);

        // Move the button down and play sound
        animateButton(position[1] - 0.1);
        enterSound.play();
    };

    const onExit = (payload: IntersectionExitPayload) => {
        if (!buttonRef.current) return;
        if (!isPlayerCollision(payload)) return;

        // Move the button up and play sound
        animateButton(position[1]);
        exitSound.play();
    };

    return (
        <>
            {/* Base */}
            <RigidBody type="fixed" position={position}>
                <RoundedBox args={[2, 1, 2]} radius={0.1}>
                    <meshStandardMaterial
                        color={playerColor === color ? "#666666" : "#FFFFFF"}
                    />
                </RoundedBox>
            </RigidBody>

            {/* Button */}
            <RigidBody
                ref={buttonRef}
                type="kinematicPosition"
                position={position}
            >
                <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.1}>
                    <meshStandardMaterial
                        color={color}
                        transparent={true}
                        opacity={playerColor === color ? 0.25 : 1}
                        emissive={color}
                        emissiveIntensity={0.25}
                    />
                </RoundedBox>
            </RigidBody>

            {/* Detector */}
            <CuboidCollider
                sensor={true}
                args={[0.5, 1, 0.5]}
                position={position}
                onIntersectionEnter={onEnter}
                onIntersectionExit={onExit}
            />
        </>
    );
}
