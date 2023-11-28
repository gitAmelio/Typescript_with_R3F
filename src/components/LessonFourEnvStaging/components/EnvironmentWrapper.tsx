import { useControls } from "leva";
import { useSnapshot } from "valtio";
import { state } from "../../../store";
import { Environment, Lightformer } from "@react-three/drei";

const EnvironmentWrapper = () => {

  const snap = useSnapshot(state);

  const { 
    enabled,
    envMapIntensity,
    envMapHeight,
    envMapRadius,
    envMapScale, 
    
    hdrEnabled, envColor, envColorEnabled, envPlaneColor, ground,
    envPlaneEnabled,
    lightformerEnabled 
  } = useControls('environmentMaps',{
    enabled: false,
    envMapIntensity: { value: 3.5, min: 0, max: 12 },
    envMapHeight: { value: 7, min: 0, max: 100},
    envMapRadius: { value: 28, min: 10, max: 1000},
    envMapScale: { value: 100, min: 10, max: 1000},
    
    hdrEnabled: false,
    
    envPlaneColor: [10,0,0],
    envColor: 'blue',
    
    envColorEnabled: true,

    ground: {x:0, y:0, z:0},

    lightformerEnabled: false,
    envPlaneEnabled: false,
  })
  state.envMapIntensity = envMapIntensity;
  state.ground.x = ground.x;
  state.ground.y = ground.y;
  state.ground.z = ground.z;

  return (
    <>
          {
        enabled &&
        <Environment
          // background
          ground={{
            height: envMapHeight,
            radius: envMapRadius,
            scale: envMapScale,
          }}
          // preset="night"
          // resolution={ 32 }
          files={
            hdrEnabled 
            ? './environmentMaps/test.hdr' 
            : [
              './environmentMaps/2/px.jpg',
              './environmentMaps/2/nx.jpg',
              './environmentMaps/2/py.jpg',
              './environmentMaps/2/ny.jpg',
              './environmentMaps/2/pz.jpg',
              './environmentMaps/2/nz.jpg',
            ]
          }
        >
          {envColorEnabled && <color args={ [envColor] } attach='background' /> }
          {lightformerEnabled &&
            <Lightformer 
              position-z={ -5 }
              scale={ 10 }
              color="red"
              intensity={ 2 }
              form="ring"
            />
          }  
          {
            envPlaneEnabled &&
            <mesh position-z={ -5 } scale={ 10 }>
              <planeGeometry />
              <meshBasicMaterial color={envPlaneColor} />
            </mesh> 
          }

        </Environment> 
      }
    </>
  )
}

export default EnvironmentWrapper;