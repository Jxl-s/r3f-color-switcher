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

interface Props {
    start: [number, number, number];
    color: Colors;
}

const enterSound = new Audio("/sounds/button_enter.mp3");
enterSound.volume = 0.5;

const exitSound = new Audio("/sounds/button_exit.mp3");
exitSound.volume = 0.25;

const playSound = (sound: HTMLAudioElement) => {
    sound.play();

    console.log("play sound");
};

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

    const animateButton = (y: number) => {
        if (!buttonRef.current) return;

        // Animate the button
        const btnTr = buttonRef.current.translation();
        const onStep = () => buttonRef.current?.setTranslation(btnTr, true);
        gsap.to(btnTr, { y, duration: 0.1, ease: "power1.out", onUpdate: onStep }).play();
    };

    const onEnter = (payload: IntersectionEnterPayload) => {
        if (!buttonRef.current) return;
        if (!isPlayerCollision(payload)) return;

        // Check for colors, change colors
        if (playerColor !== color) setPlayerColor(color);

        // Move the button down and play sound
        animateButton(start[1] - 0.1);
        playSound(enterSound);
    };

    const onExit = (payload: IntersectionExitPayload) => {
        if (!buttonRef.current) return;
        if (!isPlayerCollision(payload)) return;

        // Move the button up and play sound
        animateButton(start[1]);
        playSound(exitSound);
    };

    return (
        <>
            {/* Base */}
            <RigidBody type="fixed" position={start}>
                <RoundedBox args={[2, 1, 2]} radius={0.1}>
                    <meshStandardMaterial color="white" />
                </RoundedBox>
            </RigidBody>

            {/* Button */}
            <RigidBody ref={buttonRef} type="kinematicPosition" position={start}>
                <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.1}>
                    <meshStandardMaterial
                        color={color}
                        transparent={true}
                        opacity={playerColor === color ? 0.25 : 1}
                    />
                </RoundedBox>
            </RigidBody>

            {/* Detector */}
            <CuboidCollider
                sensor={true}
                args={[0.5, 1, 0.5]}
                position={start}
                onIntersectionEnter={onEnter}
                onIntersectionExit={onExit}
            />
        </>
    );
}
