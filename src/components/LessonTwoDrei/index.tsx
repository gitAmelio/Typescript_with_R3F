import { Canvas } from "@react-three/fiber";
import { Float, Html, MeshReflectorMaterial, OrbitControls, PivotControls, Text, TransformControls } from "@react-three/drei";
import * as THREE from 'three';
import { useRef } from "react";
import './index.css'; 

const LessonTwoDrei = ({...props}) => {

  const boxRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef(null);
  
  return (
    <Canvas>
      {/* the `makeDefault` so helpers can deactivate the controls */}
      <OrbitControls makeDefault/> 

      <directionalLight position={ [1, 2, 3] } intensity={1.5}/>
      <ambientLight intensity={0.5} />

      <PivotControls 
        anchor={ [0,1,0] }
        depthTest={false}
        lineWidth={3}
        axisColors={ ['#9381ff', '#ff4d6d', '#7ae582'] }
        scale={ 2 }
        // fixed // need to change scale
      >
        <mesh  ref={sphereRef} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html 
            position={[1,1,0]}
            wrapperClass="label"
            center
            distanceFactor={ 6 }
            occlude={ [sphereRef, boxRef ] }
          >
            That's a sphere
          </Html>
        </mesh>
      </PivotControls>

      <mesh ref={boxRef} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls // needs to be directly beneath the object
        object={boxRef}
        mode='translate' 
      />

      <mesh 
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        >
        {/* <meshStandardMaterial 
          color="greenyellow" 
          side={THREE.DoubleSide}
        /> */}
        <planeGeometry />
        <MeshReflectorMaterial 
          mirror={ 0.75 }
          resolution={ 512 }
          side={THREE.DoubleSide}

          blur={ [1000, 1000] }
          mixBlur={1}

          color="greenyellow" 
        />
      </mesh>

      <Float
        speed={ 5 }
        floatIntensity={ 2 }
      >
        {/* checkout troika-three-text */}
        <Text
          font="./Bangers-Regular.ttf" 
          fontSize={0.8}
          color="salmon"
          position-y={ 2 }

          maxWidth={ 2 }
          textAlign="center"
        >
          I Love R3F
          {/* <meshNormalMaterial side={THREE.DoubleSide}/>   */}
        </Text>
      </Float>
      

    </Canvas>
  )
}

export default LessonTwoDrei;
