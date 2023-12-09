import { useRef, useState } from "react";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { boxGeometry, floor2Material, obstacleMaterial } from './Utils';
import { BlockStartProps } from './BlockStart';

const BlockLimbo = ({position = [0,0,0]}: BlockStartProps) => {

  const obstacle = useRef<RapierRigidBody>(null!);
  const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2 );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.5;
    obstacle.current?.setNextKinematicTranslation({ x: position[0], y: position[1]+ y, z: position[2] });
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
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}

export default BlockLimbo;