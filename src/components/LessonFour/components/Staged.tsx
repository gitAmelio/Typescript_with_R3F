import { Stage } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Mesh } from "three";
import { useControls } from "leva";
import { useSnapshot } from "valtio";
import { state } from "../../../store";



const Staged = (  ) => {

  const cubeRef = useRef<Mesh>(null!);
  const snap = useSnapshot(state);
 

  type SType = 'contact' | 'accumulative';
  type EnvironmentType = "sunset" | "apartment" | "city" |
  "dawn" | "forest" | "lobby" | 
  "night" | "park" | "studio" |
  "warehouse";
  type presetType = "rembrandt"| "portrait"| "upfront"| "soft"; 

  const { 
    enabled,
    shadowType, 
    opacity, 
    blur , 
    environment, 
    preset, 
    intensity 
  } = useControls('Stage',{
    enabled: false,
    shadowType: {
      value: 'contact',
      options: [
        'contact',
        'accumulative'
      ]
    },
    blur: {value: 3, min: 0, max: 10},
    environment: { 
      value: 'sunset',
      options: [
        "sunset" , "apartment" , "city" ,
        "dawn" , "forest" , "lobby" , 
        "night" , "park" , "studio" , 
        "warehouse" 
      ]
    },
    preset:{
      value: 'portrait',
      options: [
        "rembrandt", "portrait", "upfront", "soft" 
      ]
    },
    intensity: {value: 1.5, min:-4, max: 20 },
    opacity: { value: 0.8, min: 0, max: 1 }
  })

  

  useFrame((state, delta) => {
    enabled && (cubeRef.current.rotation.y += delta * 0.2);
    
  })
  
  

  return (
    <>
    {
      enabled &&
      <Stage
        shadows={{ type: shadowType as SType, opacity, blur}}
        environment={environment as EnvironmentType}
        preset={preset as presetType}
        intensity={ intensity }
      >
        <mesh castShadow position-y={ 1 } position-x={ -2} >
          <sphereGeometry />
          <meshStandardMaterial color="orange" envMapIntensity={state.envMapIntensity}/>
          {/* <meshStandardMaterial color={ color } /> */}
        </mesh>

        <mesh castShadow ref={cubeRef} position-y={ 1 } position-x={ 2 } >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" envMapIntensity={state.envMapIntensity} />
        </mesh>
      </Stage>
    }
    </>

    
  )
}

export default Staged;