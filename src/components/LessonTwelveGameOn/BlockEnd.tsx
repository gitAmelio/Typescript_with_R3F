import { useGLTF } from "@react-three/drei";
import { boxGeometry, floor1Material } from "./Utils";
import { RigidBody } from "@react-three/rapier";

export interface BlockStartProps {
  position?: [ number, number, number];
}

const BlockEnd = ({position = [0,0,0]}: BlockStartProps) => {

  const hamburger = useGLTF('./hamburger.glb');

  hamburger.scene.children.forEach( mesh => {
    mesh.castShadow = true;
  })

  return (
    <group position={position}>
      <mesh 
        geometry={ boxGeometry } 
        material={ floor1Material }
        position={ [ 0, 0, 0 ] } 
        scale={ [4, 0.2, 4] } 
        receiveShadow
      />
      <RigidBody 
        type="fixed"
        colliders="hull"
        position={ [ 0, .6, 0 ] }
        restitution={ 0.2 }
        friction={ 0 }
      >
        <primitive object={hamburger.scene} scale={0.2} position-y={ -0.5 }/>
      </RigidBody>
    </group>
  )
}

export default BlockEnd;