import { useFrame } from "@react-three/fiber";
import { 
  AccumulativeShadows,
  SoftShadows,
  BakeShadows, 
  OrbitControls,
  useHelper, 
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer
} from "@react-three/drei";
import * as THREE from 'three';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { useRef, useState } from "react";
import './index.css';
import { state } from "../../store";

const LessonFourEnv_Stage = ({...props}) => {

  const [bad, set] = useState(false)
  const { 
    perfVisible, 
    bakeShadowsEnabled, 
    softShadowsEnabled, 
    accumulativeShadowsEnabled,
    contactShadowEnabled,
    ambientLightEnable,
    directionalLightEnabled,
    skyEnabled,
  } = useControls({
    perfVisible: true,
    bakeShadowsEnabled: false,
    softShadowsEnabled: false,
    accumulativeShadowsEnabled: false,
    contactShadowEnabled: false,
    ambientLightEnable: false,
    directionalLightEnabled: false,
    skyEnabled: false,
  })
  
  state.normalShadow = contactShadowEnabled;
  
  const { envMapIntensity, hdrEnabled, envColor, envColorEnabled, envPlaneColor } = useControls('environmentMaps',{
    envMapIntensity: { value: 3.5, min: 0, max: 12 },
    hdrEnabled: false,
    
    envPlaneColor: [10,0,0],
    envColor: 'blue',

    envColorEnabled: true,
  })

  const { samples, ...config } = useControls('SoftShadows',{
    size: { value: 35, min: 0, max: 100, step: 0.1 },
    focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
    samples: { value: 16, min: 1, max: 40, step: 1 }
  })

  const { color, opacity, blur } = useControls('ContactShadows',{
    color: '#1d8f75',
    opacity: {
      value: 0.4,
      min: 0,
      max: 1
    },
    blur: {
      value: 2.8,
      min: 0,
      max: 10
    }

  }) 

  const { sunPosition } = useControls('Sky',{
    sunPosition: { value: [1,2,3] }
  })
  
  const cubeRef = useRef<THREE.Mesh>(null!);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  useFrame((stat, delta) => {
    // const time = state.clock.elapsedTime;
    // cubeRef.current.position.x = 2 + Math.sin(time);
    cubeRef.current.rotation.y += delta * 0.2;
  })

  const bakeOrSoft = bakeShadowsEnabled || softShadowsEnabled;
  const accOrContact = accumulativeShadowsEnabled || contactShadowEnabled;

  return (
    <>

      <Environment 
        background
        // preset="night"
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
          <Lightformer 
            position-z={ -5 }
            scale={ 10 }
            color="red"
            intensity={ 2 }
            form="ring"
          />
        {/* <mesh position-z={ -5 } scale={ 10 }>
          <planeGeometry />
          <meshBasicMaterial color={envPlaneColor} />
        </mesh> */}

      </Environment>


      {(softShadowsEnabled && !accOrContact) && <SoftShadows {...config} samples={bad ? Math.min(6, samples) : samples} />}

      {(bakeShadowsEnabled && !accOrContact) && <BakeShadows />}

      {
        (accumulativeShadowsEnabled && !contactShadowEnabled) &&
        <AccumulativeShadows
          position={ [0, -0.999, 0] }
          scale={ 10 } // 10 is the default value
          color="#316d39"
          opacity={ 0.8 }
          // frames={ Infinity }
          frames={ 30 }
          temporal
          blend={ 100 }
        >
          <RandomizedLight
            amount={ 8 }
            radius={ 1 } // "jiggle"
            ambient={ 0.5 }
            intensity={ 1 }
            bias={ 0.001 }
            position={ [1, 2, 3] }
            // castShadow
          />
        </AccumulativeShadows>
      }

      { 
        contactShadowEnabled && 
        <ContactShadows 
          position={ [0, -0.99, 0] }
          scale={ 10 }
          resolution={ 512 }
          far={ 5 }

          color={color}
          opacity={opacity}
          blur={blur}

          frames={ 1 } // like bake
        /> 
      }

      <color attach='background' args={[ "purple" ]}/>
      {perfVisible && <Perf position="top-left"/>}
      <OrbitControls makeDefault/> 


      {
        directionalLightEnabled &&
        <directionalLight 
          ref={directionalLightRef} 
          // position={ [1, 2, 3] } 
          position={ sunPosition } 
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
      

      { ambientLightEnable && <ambientLight intensity={ 0.5 } /> }

      {/* need to Spherical Coords */}
      { skyEnabled && <Sky sunPosition={ sunPosition } /> } 
      


      <mesh castShadow position={ [-2, 0, 0] }>
        <sphereGeometry />
        <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity}/>
        {/* <meshStandardMaterial color={ color } /> */}
      </mesh>

      <mesh castShadow ref={cubeRef} position-x={ 2 } >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
      </mesh>

      <mesh 
        position-y={ -1 } 
        rotation-x={-Math.PI * 0.5}
        scale={ 10 }
        receiveShadow={ ((bakeOrSoft) && !accOrContact) || !accOrContact }
        >
        <meshStandardMaterial 
          color="greenyellow" 
          side={ THREE.DoubleSide }
          envMapIntensity={envMapIntensity}
        />
        <planeGeometry />
      </mesh>

    </>
  )
}

export default LessonFourEnv_Stage;
