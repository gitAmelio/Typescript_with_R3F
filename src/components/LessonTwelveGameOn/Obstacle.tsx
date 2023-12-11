import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { boxGeometry, obstacleMaterial } from "./Utils";
import { Euler, Quaternion } from "three";

type ObstacleType = 'axe' | 'limbo' | 'spinner';

interface ObstacleProps {
  position: [number, number, number];
  type: ObstacleType;
}

const Obstacle = ({position, type}: ObstacleProps) => {

  const obstacle = useRef<RapierRigidBody>(null!);
  const [ timeOffset ] = useState(() => {
    if (type === 'spinner') {
      const direction = (Math.random() < 0.5) ? -1 : 1;
      const speed = Math.random() + 0.2;
      return speed * direction;
    } else {
      return Math.random() * Math.PI * 2 ;
    }
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

     switch(type){
      case 'limbo':
        const y = Math.sin(time + timeOffset) + 1.5;
        obstacle.current?.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2] });
        break;
      case 'axe':  
        const x = Math.sin(time + timeOffset) * 1.25;
        obstacle.current?.setNextKinematicTranslation({ x: position[0] + x, y: position[1] + 1, z: position[2] });
        break;
      case 'spinner':
        const rotation = new Quaternion();
        rotation.setFromEuler(new Euler(0, time * timeOffset, 0));
        obstacle.current?.setNextKinematicRotation(rotation);
        break;
     }
  })

  const shape = (type: ObstacleType) => {
    let shape: [number, number, number];
    switch(type as ObstacleType){
      case 'axe': 
        shape = [ 1.5, 1.5, 0.3 ];
        break;
      case 'limbo':  
        shape = [ 3.5, 0.3, 0.3 ];
        break;
      case 'spinner':
        shape = [ 3.5, 0.3, 0.3 ];
        break;
      default: 
        shape = [ 3.5, 0.3, 0.3 ];  
    }
    return shape;
  }

  return (
    <>
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
          scale={ shape(type) } 
          castShadow
          receiveShadow
        />
      </RigidBody>
    </>
  )
}

export default Obstacle;