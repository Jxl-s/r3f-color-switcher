import { RigidBody } from "@react-three/rapier";
import { Goal, ObstacleWall, Player, DeathWall, JumpPad, ColorSwitch, ColorWall } from "../Components";
import { Float, Text } from "@react-three/drei";

export default function Level3() {
    return (
        <>
            {/* Walls */}
            <RigidBody type="fixed" position-y={-0.5}>
                <mesh receiveShadow>
                    <boxGeometry args={[20, 1, 20]} />
                    <meshStandardMaterial color="white" metalness={0.3} />
                </mesh>
            </RigidBody>

            <ObstacleWall position={[0, 4, -8]} size={[20, 8, 5]} />

            {/* Lava platforms */}
            <ColorWall
                position={[-4, 1, -16]}
                size={[5, 1, 5]}
                color="mediumpurple"
            />
            <ColorWall
                position={[4, 1, -28]}
                size={[5, 1, 5]}
                color="mediumpurple"
            />
            <ColorWall
                position={[-2, 1, -40]}
                size={[5, 1, 5]}
                color="mediumpurple"
            />

            <ColorSwitch position={[-5, 1.25, -17]} color="mediumpurple" />
            <ColorSwitch position={[5, 1.25, -29]} color="mediumpurple" />
            <ColorSwitch position={[-2, 1.25, -40]} color="mediumpurple" />

            <ObstacleWall position={[0, 1, -50]} size={[20, 1, 5]} />
            <DeathWall position={[0, 0.5, -30.5]} size={[19, 1, 40]} />

            {/* Goal */}
            <Goal position={[0, 0, -55]} size={[20, 1, 5]} text="Level 3" />
            <ObstacleWall position={[0, -1, -55]} size={[20, 1, 5]} />
            <ObstacleWall position={[-10.5, 3.5, -52.5]} size={[1, 10, 10]} />
            <ObstacleWall position={[10.5, 3.5, -52.5]} size={[1, 10, 10]} />
            <ObstacleWall position={[0, 3.5, -58]} size={[22, 10, 1]} />

            <Float>
                <Text
                    position={[0, 4, -4]}
                    scale={0.5}
                    textAlign="center"
                    font="/fonts/Poppins/Poppins-Light.ttf"
                >
                    Walk on the Jump Pad
                    <meshBasicMaterial color="white" />
                </Text>
                <Text
                    position={[0, 3, -4]}
                    scale={0.5}
                    textAlign="center"
                    font="/fonts/Poppins/Poppins-Light.ttf"
                >
                    Tip: Use [Shift] to Sprint
                    <meshBasicMaterial color="white" />
                </Text>
            </Float>

            {/* Walls */}
            <JumpPad position={[0, 0, -3]} />

            {/* Player */}
            <Player />
        </>
    );
}
