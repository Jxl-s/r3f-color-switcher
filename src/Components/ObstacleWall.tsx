import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

interface Props {
    position: [number, number, number];
    size: [number, number, number];
}

export function ObstacleWall({ position, size }: Props) {
    return (
        <RigidBody type="fixed">
            <Box position={position} args={size} receiveShadow>
                <meshStandardMaterial color="gray" />
            </Box>
        </RigidBody>
    );
}
