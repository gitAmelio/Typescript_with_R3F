import * as THREE from 'three';
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from 'react';
import Placeholder from './Placeholder';
import Hamburger from './Hambuger';
import Fox from './Fox';

const LessonFiveModels = () => {

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={ [1, 2, 3] } intensity={ 1.5 } shadow-normalBias={ 0.04 } />
      <ambientLight intensity={ 0.5 } />

      <mesh position-y={ - 1 } rotation-x={-Math.PI * 0.5}  scale={ 10 } receiveShadow >
          <planeGeometry />
          <meshStandardMaterial color={'greenyellow'} side={ THREE.DoubleSide } />
      </mesh>

      <Suspense fallback={<Placeholder position={ 0.5 } scale={ [ 2, 3, 2 ] } />} >
        <Hamburger scale={ 0.5 }/>
      </Suspense>

      <Fox />

    </>
  )
}

export default LessonFiveModels;