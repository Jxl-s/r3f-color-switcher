/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 --types .\public\models\barrier.gltf 
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        barrierMedium: THREE.Mesh;
    };
    materials: {
        ["Metal.010"]: THREE.MeshStandardMaterial;
    };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/models/barrier.gltf") as GLTFResult;
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.barrierMedium.geometry}
                material={materials["Metal.010"]}
                rotation={[Math.PI / 2, 0, 0]}
                castShadow
                receiveShadow
            />
        </group>
    );
}

useGLTF.preload("/models/barrier.gltf");
