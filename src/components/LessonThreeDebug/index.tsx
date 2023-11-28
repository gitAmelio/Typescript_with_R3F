import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three';
import { useControls, button, Leva } from 'leva';
import { Perf } from 'r3f-perf';

const LessonThreeDebug = ({...props}) => {

  const { perfVisible } = useControls({
    perfVisible: true
  })

  const devSphere = useControls('sphere',{
    position: {
      value: {x: -2, y: 0},
      // min: -4,
      // max: 4,
      step: 0.01,
      joystick: 'invertY',
    },
    color:"#f00",
    visible: true,
    interval: {
      min: 0,
      max: 10,
      value: [ 4, 5 ]
    },
    clickMe: button(()=>{ console.log('Nice')}),
    choice: { options: [ 'a', 'b', 'c' ]}
    
  })
  const {position, color, visible} = devSphere;

  const devBox = useControls('Cube',{
    scale: {
      value: 1.5,
      min: 0,
      max: 5,
      step: 0.01
    }
  }) 
  const {scale} = devBox;

  return (
    <>
    <Leva collapsed/>
    <Canvas>
      {perfVisible && <Perf position="top-left"/>}
      <OrbitControls makeDefault/> 

      <directionalLight position={ [1, 2, 3] } intensity={1.5}/>
      <ambientLight intensity={ 0.5 } />


      <mesh position={ [position.x, position.y, 0] } visible={visible}>
        <sphereGeometry />
        {/* <meshStandardMaterial color="orange" /> */}
        <meshStandardMaterial color={ color } />
      </mesh>

      <mesh position-x={ 2 } scale={ scale }>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh 
        position-y={ -1 }
        rotation-x={-Math.PI * 0.5}
        scale={ 10 }
        >
        <meshStandardMaterial 
          color="greenyellow" 
          side={ THREE.DoubleSide }
        />
        <planeGeometry />
      </mesh>

    </Canvas>
    </>
  )
}

export default LessonThreeDebug;
