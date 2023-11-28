import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { DoubleSide } from "three";
import { EffectComposer } from "@react-three/postprocessing";
import { BlendFunction }  from 'postprocessing';
import { useControls } from "leva";
import Drunk from "./Drunk";
import { useRef } from "react";
import { ThreeElements } from "@react-three/fiber";

const LessonNinePostProcessingCustom = () => {

  const drunkRef = useRef<ThreeElements>(null);

  const drunkProps = useControls('Drunk Effects', {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  })  

  return (
    <>

      <color args={[ '#ffffff' ]} attach="background"/>

      <EffectComposer 
        multisampling={8} 
      >
        <Drunk  
          ref={drunkRef}
          {...drunkProps}
          blendFunction={ BlendFunction.DARKEN }
        />
      </EffectComposer>

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={ [1, 2, 3] } intensity={ 1.5 } />
      <ambientLight intensity={ 0.5 } />

      <mesh castShadow position-x={ -2 }>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={ 2 } scale={ 1.5 }>
        <boxGeometry />
        {/* <meshStandardMaterial color={ [1.5, 1, 4] } toneMapped={ false } /> */}
        {/* <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={2} toneMapped={ false } /> */}
        {/* <meshBasicMaterial color={ [1.5 * 10, 1 * 10, 4 * 10] } toneMapped={ false } /> */}
        <meshBasicMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={ -1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 } >
        <planeGeometry />
        <meshStandardMaterial  color="greenyellow" side={DoubleSide} envMapIntensity={0.5} roughness={0} metalness={0} />
      </mesh>
    </>
  )
}

export {LessonNinePostProcessingCustom};