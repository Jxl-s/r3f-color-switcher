import {
    CollisionPayload,
    CuboidCollider,
    RigidBody,
} from "@react-three/rapier";
import { ObstacleWall, Player } from "../Components";
import { Box, Float, Text } from "@react-three/drei";
import { Barrier, Bench, Tree_1 } from "../Models";
import { usePlayerStore } from "../Stores/usePlayerStore";

export default function MoreToCome() {
    const resetProgress = usePlayerStore((state) => state.resetProgress);

    const onMenuEnter = (payload: CollisionPayload) => {
        console.log("entered");
        const userData = payload.rigidBody?.userData as Record<string, unknown>;
        if (!userData) return;
        if (userData.type !== "player") return;

        resetProgress();
    };

    return (
        <>
            {/* Walls */}
            <RigidBody type="fixed" position-y={-0.5}>
                <mesh receiveShadow>
                    <boxGeometry args={[100, 1, 30]} />
                    <meshStandardMaterial color="lightgreen" metalness={0.3} />
                </mesh>
            </RigidBody>

            {/* Initial player */}
            <Player />

            <ObstacleWall
                position={[0, 0, -15]}
                size={[100, 30, 1]}
                color="lightblue"
            />

            <RigidBody type="fixed">
                <Bench position={[4, 0, -12]} scale={2} />
                <Bench position={[-4, 0, -12]} scale={2} />
            </RigidBody>

            <Tree_1 position={[-10, 0, -10]} scale={0.5} />
            <Tree_1 position={[10, 0, -10]} scale={0.5} />

            <RigidBody type="fixed" colliders={false}>
                <Barrier position={[15, 0, -8]} scale={2} />
                <Barrier position={[5, 0, -8]} scale={2} />
                <Barrier position={[-5, 0, -8]} scale={2} />
                <Barrier position={[-15, 0, -8]} scale={2} />

                <CuboidCollider args={[20, 4, 0.25]} position={[0, 0, -8]} />
            </RigidBody>

            <Float>
                <Text
                    position={[0, 6, -6]}
                    font="/fonts/Poppins/Poppins-Black.ttf"
                    color={"lightblue"}
                >
                    More levels to come!
                </Text>
            </Float>

            <RigidBody
                type="fixed"
                sensor={true}
                onIntersectionEnter={onMenuEnter}
            >
                <Box args={[40, 0.5, 3]} position={[0, 0, -5]}>
                    <meshStandardMaterial
                        color="#CC8888"
                        emissive={"#AA0000"}
                    />
                    <Text
                        font="/fonts/Poppins/Poppins-Black.ttf"
                        color="white"
                        rotation-x={-Math.PI / 2}
                        position={[0, 0.4, 0]}
                        scale={1.5}
                    >
                        Back to Menu
                    </Text>
                </Box>
            </RigidBody>
        </>
    );
}
