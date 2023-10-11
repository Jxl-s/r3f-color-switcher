import {
    IntersectionEnterPayload,
    CollisionPayload,
    RigidBody,
} from "@react-three/rapier";
import { usePlayerStore } from "../Stores/usePlayerStore";
import { Text } from "@react-three/drei";
import { useSettingsStore } from "../Stores/useSettingsStore";

interface Props {
    position: [number, number, number];
    size: [number, number, number];
    textScale?: number;
    text: string;

    noIntermission?: boolean;
}

export default function Goal({
    position,
    size,
    textScale,
    text,
    noIntermission = false,
}: Props) {
    const finishLevel = usePlayerStore((state) => state.finishLevel);
    const nextLevel = usePlayerStore((state) => state.nextLevel);
    const instantLevel = useSettingsStore((state) => state.instantLevel);

    const isPlayerCollision = (payload: CollisionPayload) => {
        const userData = payload.rigidBody?.userData as Record<string, unknown>;
        return userData?.type === "player";
    };

    const onEnter = (payload: IntersectionEnterPayload) => {
        if (!isPlayerCollision(payload)) return;

        // If there's the noIntermission flag, skip the intermission
        // If the player has instantLevel setting, skip it
        if (noIntermission || instantLevel) {
            nextLevel();
        } else {
            finishLevel();
        }
    };

    return (
        <>
            <RigidBody
                sensor={true}
                type="fixed"
                position={position}
                onIntersectionEnter={onEnter}
            >
                <mesh>
                    <boxGeometry args={size} />
                    <meshStandardMaterial color="#00FF00" />
                </mesh>
                <Text
                    font="/fonts/Poppins/Poppins-Bold.ttf"
                    position={[0, 0.6, 0]}
                    rotation-x={-0.5 * Math.PI}
                    textAlign="center"
                    scale={textScale ?? 1}
                >
                    {text}
                    <meshBasicMaterial color={"#CCCCCC"} />
                </Text>
            </RigidBody>
        </>
    );
}
