import { RigidBody } from "@react-three/rapier";
import { Player } from "../Components/Player";
import { ColorSwitch } from "../Components/ColorSwitch";
import { ColorWall } from "../Components/ColorWall";
import { ObstacleWall } from "../Components/ObstacleWall";

export function Level1() {
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

            {/* Player */}
            <Player />
        </>
    );
}
