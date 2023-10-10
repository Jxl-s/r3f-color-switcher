import { RigidBody } from "@react-three/rapier";
import {
    ColorSwitch,
    ColorWall,
    Goal,
    ObstacleWall,
    Player,
} from "../Components";
import { Float, Text } from "@react-three/drei";

export default function Level1() {
    return (
        <>
            {/* Walls */}
            <RigidBody type="fixed" position-y={-0.5}>
                <mesh receiveShadow>
                    <boxGeometry args={[20, 1, 100]} />
                    <meshStandardMaterial color="white" metalness={0.3} />
                </mesh>
            </RigidBody>

            {/* Switches */}
            <ColorSwitch position={[0, 0, -6]} color="crimson" />
            <Float floatIntensity={0.5} rotationIntensity={2}>
                <Text
                    position={[0, 3, -6]}
                    scale={0.5}
                    textAlign="center"
                    font="/fonts/Poppins/Poppins-Light.ttf"
                >
                    Touch to change color
                    <meshBasicMaterial color="white" />
                </Text>
            </Float>

            {/* Obstacles */}
            <ColorWall
                color="crimson"
                position={[0, 2, -10]}
                size={[10, 4, 1]}
            />

            {/* Walls */}
            <ObstacleWall position={[7.5, 2, -10]} size={[5, 4, 1]} />
            <ObstacleWall position={[-7.5, 2, -10]} size={[5, 4, 1]} />
            <ObstacleWall position={[0, 6, -10]} size={[20, 4, 1]} />
            <ObstacleWall position={[10, 4, -10]} size={[1, 8, 30]} />
            <ObstacleWall position={[-10, 4, -10]} size={[1, 8, 30]} />
            <ObstacleWall position={[0, 4, -24.5]} size={[20, 8, 1]} />

            {/* Player */}
            <Player />
            <Goal
                position={[0, 0, -21]}
                size={[20, 1, 6]}
                textScale={3}
                text={"Level 2"}
            />
        </>
    );
}
