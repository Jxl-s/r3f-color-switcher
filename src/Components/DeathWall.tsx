import { Box } from "@react-three/drei";
import { CollisionPayload, RigidBody } from "@react-three/rapier";

interface Props {
    position: [number, number, number];
    size: [number, number, number];
}

export default function DeathWall({ position, size }: Props) {
    const isPlayerCollision = (payload: CollisionPayload) => {
        const userData = payload.rigidBody?.userData as Record<string, unknown>;
        return userData?.type === "player";
    };

    const onEnter = (payload: CollisionPayload) => {
        if (!isPlayerCollision(payload)) return;

        const userData = payload.rigidBody?.userData as Record<string, unknown>;
        const resetFunction = userData?.reset as () => void;

        resetFunction();
    };

    return (
        <RigidBody
            type="fixed"
            sensor={true}
            position={position}
            onIntersectionEnter={onEnter}
        >
            <Box args={size} receiveShadow>
                <meshStandardMaterial
                    color="white"
                    emissive={"#FF0000"}
                    emissiveIntensity={2}
                />
            </Box>
        </RigidBody>
    );
}
