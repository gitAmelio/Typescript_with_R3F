/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Scene: THREE.Group;
    bottomBun: THREE.Mesh;
    cheese: THREE.Mesh;
    meat: THREE.Mesh;
    topBun: THREE.Mesh;
  };
  materials: {
     [key: string]: THREE.MeshStandardMaterial;
  }
}

const Hamburger = ({...props}) => {
  const { nodes, materials } = useGLTF("/hamburger-draco.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottomBun.geometry}
        material={materials.BunMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.meat.geometry}
        material={materials.SteakMaterial}
        position={[0, 2.817, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cheese.geometry}
        material={materials.CheeseMaterial}
        position={[0, 3.04, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.topBun.geometry}
        material={materials.BunMaterial}
        position={[0, 1.771, 0]}
      />
    </group>
  );
}

export default Hamburger;

useGLTF.preload("/hamburger-draco.glb");
