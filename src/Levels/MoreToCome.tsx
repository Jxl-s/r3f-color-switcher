import { RigidBody } from "@react-three/rapier";
import { ObstacleWall, Player } from "../Components";
import { Float, Text } from "@react-three/drei";

export default function MoreToCome() {
    return (
        <>
            {/* Walls */}
            <RigidBody type="fixed" position-y={-0.5}>
                <mesh receiveShadow>
                    <boxGeometry args={[30, 1, 30]} />
                    <meshStandardMaterial color="white" metalness={0.3} />
                </mesh>
            </RigidBody>

            {/* Initial player */}
            <Player />

            <ObstacleWall position={[0, 0, -15]} size={[100, 30, 1]} />
            <ObstacleWall position={[15, 0, 0]} size={[1, 30, 100]} />
            <ObstacleWall position={[-15, 0, -15]} size={[1, 30, 100]} />
            <ObstacleWall position={[0, 0, 15]} size={[100, 30, 1]} />

            <Float>
                <Text
                    position={[0, 4, -10]}
                    font="/fonts/Poppins/Poppins-Black.ttf"
                    fontSize={2}
                    color={"lightblue"}
                >
                    More levels to come!
                </Text>
            </Float>
        </>
    );
}
