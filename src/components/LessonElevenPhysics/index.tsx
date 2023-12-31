import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { CuboidCollider, CylinderCollider, Physics, RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import MeshInstances from "./MeshInstances";

const LessonElevenPhysics = () => {

  const [ hitSound ] = useState(() => new Audio('./hit.mp3'))

  const cubeRef = useRef<any>(null!)
  const propellerRef = useRef<any>(null!)
  
  const hamburger = useGLTF('./hamburger.glb')

  const cubeJump = () => {
    const mass = cubeRef.current.mass();
    cubeRef.current.wakeUp(); 
    cubeRef.current.applyImpulse({ x: 0 , y: 5 * mass, z: 0 });
    cubeRef.current.applyTorqueImpulse({ 
      x: Math.random() - 0.5, 
      y: Math.random() - 0.5, 
      z: Math.random() - 0.5 
    });
  }

  const handleOnCollisionEnter = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  }
  const handleOnCollisionExit = () => {
    // console.log('exit');
  }

  useFrame((state)=>{
    const time = state.clock.getElapsedTime()

    const eulerRotation = new THREE.Euler(0, time*5, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    propellerRef.current?.setNextKinematicRotation(quaternionRotation);
 
    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    propellerRef.current?.setNextKinematicTranslation({ x, y:-0.8, z })

  })

  return (
    <>
      <Perf position="top-left"/>

      <OrbitControls makeDefault />

      <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
      <ambientLight intensity={ 0.5 } />

      <Physics gravity={ [ 0, -9.08, 0 ] }>

        <RigidBody colliders="ball">
          {/* <mesh castShadow position={ [ 0, 4, 0 ] }> */}
          <mesh castShadow position={ [ -1.2, 2, 0 ] }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody 
          ref={ cubeRef } 
          position={ [ 1.5, 2, 0] } 
          gravityScale={ 1 }
          restitution={ 1 }
          friction={ 0.7 }
          colliders={ false }
          onCollisionEnter={ handleOnCollisionEnter }
          // onCollisionExit={ handleOnCollisionExit }
          // onSleep={ () => { console.log('sleep')} }
          // onWake={ () => { console.log('wake')} }
        >
          <mesh castShadow onClick={ cubeJump }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider mass={ 0.5 } args={ [ 0.5, 0.5, 0.5 ] } />
        </RigidBody>

        <RigidBody 
          position={ [ 0, 4, 0 ] } 
          // colliders={ "trimesh" }
          colliders={ false }
          
        >
            <primitive object={hamburger.scene} scale={0.25} position-y={-0.6} />
            <CylinderCollider args={ [0.5, 1.125 ] } />
        </RigidBody>

        {/* <RigidBody>
          <mesh castShadow position={ [ 2, 2, 0 ] } >
            <boxGeometry args={ [ 3, 2, 1 ] }/>
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <mesh castShadow position={ [ 2, 2, 3 ] } >
            <boxGeometry args={ [1, 1, 1] } />
            <meshStandardMaterial color="mediumpurple" /> 
          </mesh>
        </RigidBody> */}

        {/* <RigidBody colliders="hull"> */}
        {/* <RigidBody colliders={false} position={ [ 0, 1, 0] } rotation={ [ Math.PI * 0.5, 0, 0 ] }>
          <CuboidCollider args={ [ 1.5, 1.5, 0.5 ] } />
          <BallCollider args={ [ 1.5 ]} /> */}
          {/* <CuboidCollider 
            args={ [ 0.25, 1, 0.25 ] } 
            position={ [ 0, 0, 1 ] } 
            rotation={ [ -Math.PI * 0.35, 0, 0 ] } 
          /> */}
          {/* <mesh castShadow > 
            <torusGeometry args={ [1, 0.5, 16, 32 ] } />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}
              
        <RigidBody type="fixed" friction={ 0 }>
          <mesh receiveShadow position-y={ -1.25 }>
            <boxGeometry args={ [ 10, 0.5, 10 ] } />
            <meshStandardMaterial color="greenyellow" />
          </mesh>  
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={ [5, 2, 0.5 ] } position={ [0, 1, 5.5] } />
          <CuboidCollider args={ [5, 2, 0.5 ] } position={ [0, 1, -5.5] } />
          <CuboidCollider args={ [0.5, 2, 5 ] } position={ [5.5, 1, 0] } />
          <CuboidCollider args={ [0.5, 2, 5 ] } position={ [-5.5, 1, 0] } />
        </RigidBody>

        <RigidBody
          ref={propellerRef}
          position={ [0, -0.8, 0] }
          friction={ 0 }
          type="kinematicPosition"
        >
          <mesh castShadow scale={ [ 0.4, 0.4, 3 ] } >
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <MeshInstances count={100} />

      </Physics>

    </>
  )
}

export default LessonElevenPhysics;