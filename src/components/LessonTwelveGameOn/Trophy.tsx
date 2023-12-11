import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Trophy = () => {

  const hamburger = useGLTF('./hamburger.glb');

  hamburger.scene.children.forEach( mesh => {
    mesh.castShadow = true;
  })

  return (
    <RigidBody 
      type="fixed"
      colliders="hull"
      position={ [ 0, .6, 0 ] }
      restitution={ 0.2 }
      friction={ 0 }
    >
      <primitive object={hamburger.scene} scale={0.2} position-y={ -0.5 }/>
    </RigidBody>
  )
}

export default Trophy;