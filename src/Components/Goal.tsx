import {
    IntersectionEnterPayload,
    CollisionPayload,
    RigidBody,
} from "@react-three/rapier";
import { usePlayerStore } from "../Stores/usePlayerStore";
import { Text } from "@react-three/drei";

interface Props {
    position: [number, number, number];
    size: [number, number, number];
    textScale?: number;
    text: string;
}

export function Goal({ position, size, textScale, text }: Props) {
    const finishLevel = usePlayerStore((state) => state.finishLevel);

    const isPlayerCollision = (payload: CollisionPayload) => {
        if (!payload.rigidBody?.userData) return false;
        if (
            (payload.rigidBody.userData[
                "type" as never
            ] as unknown as string) !== "player"
        )
            return false;

        return true;
    };

    const onEnter = (payload: IntersectionEnterPayload) => {
        if (!isPlayerCollision(payload)) return;
        finishLevel();
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
                    position={[0.75, 0.6, 0]}
                    rotation-x={-0.5 * Math.PI}
                    scale={textScale ?? 1}
                >
                    {text}
                    <meshBasicMaterial color={"#CCCCCC"} />
                </Text>
            </RigidBody>
        </>
    );
}
