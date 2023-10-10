/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 --types .\public\models\tree_1.gltf 
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        ["tree-beech"]: THREE.Mesh;
    };
    materials: {
        color_main: THREE.MeshStandardMaterial;
    };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/models/tree_1.gltf") as GLTFResult;
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes["tree-beech"].geometry}
                material={materials.color_main}
                castShadow
                receiveShadow
            />
        </group>
    );
}

useGLTF.preload("/models/tree_1.gltf");