import { RoundedBox, Sparkles } from "@react-three/drei";
import {
    IntersectionEnterPayload,
    RapierRigidBody,
    RigidBody,
} from "@react-three/rapier";
import gsap from "gsap";
import { useState, useRef, useEffect } from "react";
import { SoundPlayer } from "../Util/SoundPlayer";

interface Props {
    position: [number, number, number];
}

const jumpAudio = new SoundPlayer({
    path: "/sounds/jump_pad.mp3",
    offset: 0.15,
});

export default function JumpPad({ position }: Props) {
    const [canUse, setCanUse] = useState(true);
    const padRef = useRef<RapierRigidBody>(null);

    useEffect(() => {
        if (!padRef.current) return;

        // Animate the pad
        const padTr = padRef.current.translation();
        const onStep = () => padRef.current?.setTranslation(padTr, true);
        gsap.to(padTr, {
            y: canUse ? 0 : 0.25,
            duration: 0.1,
            ease: "power1.out",
            onUpdate: onStep,
        }).play();
    }, [canUse]);

    const onEnter = (payload: IntersectionEnterPayload) => {
        if (!canUse) return;
        if (!padRef.current) return;
        if (!payload.rigidBody) return;

        const userData = payload.rigidBody.userData as Record<string, unknown>;
        if (userData?.type !== "player") return;

        // Apply a force to the player
        const body = payload.rigidBody;
        const force = { x: 0, y: 75, z: 0 };

        const linvel = body.linvel();
        body.setLinvel({ x: linvel.x, y: 0, z: linvel.z }, true);
        body.applyImpulse(force, true);

        jumpAudio.play();
        setCanUse(false);
        setTimeout(() => setCanUse(true), 1000);
    };

    return (
        <group position={position}>
            <RigidBody type="fixed">
                <RoundedBox args={[4, 0.5, 4]} radius={0.1}>
                    <meshStandardMaterial />
                </RoundedBox>
            </RigidBody>
            <RigidBody
                ref={padRef}
                type="kinematicPosition"
                sensor={true}
                onIntersectionEnter={onEnter}
            >
                <RoundedBox args={[3.5, 1, 3.5]} radius={0.1}>
                    <meshStandardMaterial
                        roughness={0}
                        color={"white"}
                        emissive={"lightblue"}
                        emissiveIntensity={canUse ? 1 : 0.25}
                    />
                    {canUse && (
                        <Sparkles count={50} scale={4} size={6} speed={0.4} />
                    )}
                </RoundedBox>
            </RigidBody>
        </group>
    );
}
