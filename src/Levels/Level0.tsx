import { RigidBody } from "@react-three/rapier";
import { Goal, ObstacleWall, Player } from "../Components";

export default function Level0() {
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

            <Goal
                position={[0, 0, -10]}
                size={[100, 1, 10]}
                text="Start"
                textScale={4}
                noIntermission={true}
            />
            <ObstacleWall position={[0, 0, -15]} size={[100, 30, 1]} />
            <ObstacleWall position={[15, 0, 0]} size={[1, 30, 100]} />
            <ObstacleWall position={[-15, 0, -15]} size={[1, 30, 100]} />
            <ObstacleWall position={[0, 0, 15]} size={[100, 30, 1]} />
        </>
    );
}
