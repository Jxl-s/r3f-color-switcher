import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

interface Props {
    position: [number, number, number];
    size: [number, number, number];
    color?: string;
}

export default function ObstacleWall({ position, size, color = "gray" }: Props) {
    return (
        <RigidBody type="fixed">
            <Box position={position} args={size} receiveShadow>
                <meshStandardMaterial color={color} />
            </Box>
        </RigidBody>
    );
}
