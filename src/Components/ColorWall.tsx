import { Box } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Colors, usePlayerStore } from "../Stores/usePlayerStore";
import { useEffect, useRef } from "react";

interface Props {
    color: Colors;
    position: [number, number, number];
    size: [number, number, number];
}

export function ColorWall({ color, position, size }: Props) {
    const playerColor = usePlayerStore((state) => state.color);
    const rigidBody = useRef<RapierRigidBody>(null);

    useEffect(() => {
        if (!rigidBody.current) return;

        const collisions = playerColor !== color;
        rigidBody.current.setEnabled(collisions);
    }, [playerColor, color]);

    return (
        <RigidBody type="kinematicPosition" ref={rigidBody} position={position}>
            <Box args={size} receiveShadow>
                <meshStandardMaterial
                    color={color}
                    transparent={true}
                    opacity={playerColor === color ? 0.5 : 1}
                />
            </Box>
        </RigidBody>
    );
}
