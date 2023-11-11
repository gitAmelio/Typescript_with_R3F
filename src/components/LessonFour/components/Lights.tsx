import { useControls } from "leva";
import { useSnapshot } from "valtio";
import { state } from "../../../store";
import { Vector3 } from "three";
import * as THREE from 'three';
import { Sky, useHelper } from "@react-three/drei";
import { useRef } from "react";

const Lights = () => {

  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  const snap = useSnapshot(state);

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  const {
    skyEnabled,
    directionalLightEnabled,
    ambientLightEnabled,
    backgroundColorEnabled,
    sunPosition,

  } = useControls('Lights and Sky', {
    skyEnabled: false,
    sunPosition: { value: [1,2,3] },
    ambientLightEnabled: false,
    directionalLightEnabled: false,
    backgroundColorEnabled: false,
  })

  state.sunPosition.x = sunPosition[0];
  state.sunPosition.y = sunPosition[1];
  state.sunPosition.z = sunPosition[2];

 return (
  <>
    {
      directionalLightEnabled &&
      <directionalLight 
        ref={directionalLightRef} 
        // position={ [1, 2, 3] } 
        position={  [state.sunPosition.x, state.sunPosition.y, state.sunPosition.z] } 
        intensity={ 1.5   }

        castShadow 
        shadow-mapSize={ [1024, 1024] }
        shadow-camera-top={ 5 }
        shadow-camera-bottom={ -5 }
        shadow-camera-right={ 5 }
        shadow-camera-left={ -5 }

        shadow-camera-near={ 1 }
        shadow-camera-far={ 10 }
      />
    }  

    { ambientLightEnabled && <ambientLight intensity={ 0.5 } /> }

    {/* need to Spherical Coords */}
    { skyEnabled && <Sky sunPosition={ state.sunPosition as Vector3 } /> } 
    
    {backgroundColorEnabled && <color attach='background' args={[ "purple" ]}/>}

  </>
 )
}

export default Lights;
