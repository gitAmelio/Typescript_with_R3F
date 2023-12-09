import * as THREE from 'three';
import { useRef, useState } from "react";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { boxGeometry, floor2Material, obstacleMaterial } from './Utils';
import { BlockStartProps } from './BlockStart';

const BlockSpinner = ({position = [0,0,0]}: BlockStartProps) => {

  const obstacle = useRef<RapierRigidBody>(null!);
  const [ velocity ] = useState(() =>{
    const direction = (Math.random() < 0.5) ? -1 : 1;
    const speed = Math.random() + 0.2;
    return speed * direction;
  })  

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * velocity, 0));
    obstacle.current?.setNextKinematicRotation(rotation);
  })

  return (
    <group position={position}>
      <mesh 
        geometry={ boxGeometry } 
        material={ floor2Material }
        position={ [ 0, -0.1, 0 ] } 
        scale={ [4, 0.2, 4] } 
        receiveShadow
      />
      <RigidBody 
        ref={ obstacle } 
        type="kinematicPosition" 
        position={ [ 0, 0.3, 0] } 
        restitution={ 0.2 } 
        friction={ 0 }
      >
        <mesh 
          geometry={ boxGeometry } 
          material={ obstacleMaterial }
          // position={ [ 0, -0.1, 0 ] } 
          scale={ [ 3.5, 0.3, 0.3 ] } 
          castShadow
          // receiveShadow
        />
      </RigidBody>
    </group>
  )
}

export default BlockSpinner;