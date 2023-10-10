/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 --types .\public\models\bench.gltf 
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        bench: THREE.Mesh;
        Plane001: THREE.Mesh;
        Plane005: THREE.Mesh;
        Vert001: THREE.Mesh;
    };
    materials: {
        ["metal.004"]: THREE.MeshStandardMaterial;
        ["wood.004"]: THREE.MeshStandardMaterial;
        ["wood.003"]: THREE.MeshStandardMaterial;
        ["metal.003"]: THREE.MeshStandardMaterial;
    };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/models/bench.gltf") as GLTFResult;
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.bench.geometry}
                material={materials["metal.004"]}
                castShadow
                receiveShadow
            >
                <mesh
                    geometry={nodes.Plane001.geometry}
                    material={materials["wood.004"]}
                />
                <mesh
                    geometry={nodes.Plane005.geometry}
                    material={materials["wood.003"]}
                />
                <mesh
                    geometry={nodes.Vert001.geometry}
                    material={materials["metal.003"]}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload("/models/bench.gltf");
