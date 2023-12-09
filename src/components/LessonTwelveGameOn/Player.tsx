import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";

const Player = () => {

  const playerRef = useRef<RapierRigidBody>(null); 
  const [ subscribeKeys, getKeys ] = useKeyboardControls(); 
  const { rapier, world } = useRapier();

  const [ smoothedCameraPosition ] = useState(() => new Vector3(0, 10, 10));
  const [ smoothedCameraTarget ] = useState(() => new Vector3());

  const handleJump = () => {
    const origin = playerRef.current?.translation();
    origin!.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin!, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit!.toi < 0.15){
      playerRef.current?.applyImpulse({x: 0, y: 0.5, z: 0}, true)
    }
  }

  useEffect(() => {
    const unSubscribe = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) handleJump();
      }
    )

    return () => { unSubscribe(); }
  }, [])

  useFrame((state, delta ) => {

    if(!playerRef.current) return;

    const player = playerRef.current;
    
    const { forward, backward, left, right } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if ( forward ){
      impulse.z -= impulseStrength; 
      torque.x -= torqueStrength;
    }  
    if ( backward ){
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }  
    if ( left ){
      impulse.x -= impulseStrength; 
      torque.z += torqueStrength;
    } 
    if ( right ){
      impulse.x += impulseStrength; 
      torque.z -= torqueStrength;
    } 

    player.applyImpulse(impulse, true);
    player.applyTorqueImpulse(torque, true);

    /**
     * Camera
     */
    const bodyCoords = player.translation();
    const bodyPosition = new Vector3(bodyCoords.x, bodyCoords.y, bodyCoords.z);

    const cameraPosition = new Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25 // look slightly above the marble

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  })

  return (
    <>
      <RigidBody 
        ref={ playerRef } 
        colliders="ball" 
        restitution={ 0.2} 
        friction={ 1 } 
        linearDamping={ 0.5 }
        angularDamping={ 0.5 }
        position={[ 0, 1, 0 ]} 
      >
        <mesh castShadow>
          <icosahedronGeometry args={ [ 0.3, 1 ] } />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  )
};

export default Player;