import { RigidBody } from "@react-three/rapier";
import {
    ColorSwitch,
    ColorWall,
    Goal,
    ObstacleWall,
    Player,
    DeathWall,
} from "../Components";
import { Float, Text } from "@react-three/drei";

export default function Level2() {
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
            <ColorSwitch position={[6, 0, -6]} color="greenyellow" />
            <ColorSwitch position={[-6, 0, -6]} color="mediumpurple" />

            <Float>
                <Text
                    position={[0, 2, -8]}
                    scale={0.5}
                    textAlign="center"
                    font="/fonts/Poppins/Poppins-Light.ttf"
                >
                    Use [Space] to jump
                    <meshBasicMaterial color="white" />
                </Text>
            </Float>

            {/* Walls */}
            <ObstacleWall position={[0, 1, -10]} size={[20, 2, 1]} />
            <ColorWall
                position={[-5, 4, -10.5]}
                size={[10, 4, 1]}
                color="mediumpurple"
            />

            <ColorWall
                position={[5, 4, -10.5]}
                size={[10, 4, 1]}
                color="greenyellow"
            />
            <ObstacleWall position={[0, 7, -10]} size={[20, 2, 1]} />

            <ObstacleWall position={[-10, 4, -10]} size={[0.5, 8, 16]} />
            <ObstacleWall position={[0, 4, -14.25]} size={[0.5, 8, 9.5]} />
            <ObstacleWall position={[10, 4, -10]} size={[0.5, 8, 16]} />
            <ObstacleWall position={[0, 4, -17.75]} size={[20, 9, 0.5]} />

            <ObstacleWall position={[0, 8, -13.5]} size={[20.5, 1, 8]} />

            {/* Player */}
            <Player />
            <Goal
                position={[-5, 0, -14]}
                size={[10, 1, 7.5]}
                textScale={1}
                text={"Level 2"}
            />
            <DeathWall position={[5, 0, -14]} size={[10, 1, 7.5]} />
        </>
    );
}
