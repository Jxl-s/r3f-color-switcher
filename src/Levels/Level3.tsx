import { RigidBody } from "@react-three/rapier";
import {
    Goal,
    ObstacleWall,
    Player,
    DeathWall,
    JumpPad,
    ColorSwitch,
    ColorWall,
} from "../Components";
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
                position={[0, 5, -25.5]}
                size={[11, 1, 30]}
                color="mediumpurple"
            />

            <ColorSwitch position={[0, 4.95, -16]} color="mediumpurple" />
            <ColorSwitch position={[-2, 4.95, -15]} color="mediumpurple" />
            <ColorSwitch position={[2, 4.95, -14]} color="mediumpurple" />
            <ColorSwitch position={[4, 4.95, -15]} color="mediumpurple" />

            <ColorSwitch position={[-4, 4.95, -26]} color="mediumpurple" />
            <ColorSwitch position={[-2, 4.95, -23]} color="mediumpurple" />
            <ColorSwitch position={[0, 4.95, -24]} color="mediumpurple" />
            <ColorSwitch position={[4, 4.95, -25]} color="mediumpurple" />

            <ColorSwitch position={[-2.5, 4.95, -33]} color="mediumpurple" />
            <ColorSwitch position={[0, 4.95, -34]} color="mediumpurple" />
            <ColorSwitch position={[2, 4.95, -35]} color="mediumpurple" />
            <ColorSwitch position={[4, 4.95, -30]} color="mediumpurple" />

            <DeathWall position={[0, 4, -25.5]} size={[20, 1, 30]} />

            {/* Goal */}
            <Goal position={[0, 3, -43]} size={[20, 1, 5]} text="Level 3" />
            <ObstacleWall position={[0, 4, -40.01]} size={[20, 5, 1]} />
            <ObstacleWall position={[0, 2, -43]} size={[20, 1, 5]} />

            <ObstacleWall position={[-10.5, 8, -40.5]} size={[1, 10, 10]} />
            <ObstacleWall position={[10.5, 8, -40.5]} size={[1, 10, 10]} />
            <ObstacleWall position={[0, 8, -46]} size={[22, 10, 1]} />

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
