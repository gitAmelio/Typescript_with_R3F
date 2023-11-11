import { useControls } from "leva";
import * as THREE from 'three';
import { useSnapshot } from "valtio";
import { state } from "../../../store";


const Floor = () => {
  const snap = useSnapshot(state);

  const { enabled, scale, recieveShadow, color } = useControls('floor', {
    enabled: false,
    scale: { value: 10, min: 0, max: 100 },
    color: 'greenyellow',
    recieveShadow: true, 
  })
  

  return (
    <>
      {
        enabled &&
        <mesh 
          position-y={ state.ground.y - 0.02 } 
          rotation-x={-Math.PI * 0.5}
          scale={ scale }
          // receiveShadow={ ((bakeOrSoft) && !accOrContact) || !accOrContact }
          receiveShadow={ recieveShadow }
          >
          <meshStandardMaterial 
            color={color} 
            side={ THREE.DoubleSide }
            envMapIntensity={state.envMapIntensity}
          />
          <planeGeometry />
        </mesh>
      }
    </>
  ) 
}

export default Floor;