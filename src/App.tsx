import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing';
import Box from './components/Box';
import Floor from './components/Floor';
import Bulb from './components/Bulb';
import Background from './components/Backgroud';
import ColorButtons from './components/ColorButtons';
import ShapeButtons from './components/ShapeButtons';
import CustomObject from './components/CustomObject';
import { Group } from 'three';
import CustomObjects from './components/CustomObjects';

const App = () => {
  
  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <ColorButtons />  
      <ShapeButtons />
      <Canvas 
        shadows
        style={{background: 'black'}} 
        // orthographic
        camera={{
          position: [7,7,7],
          fov: 45,
          near: 0.1,
          far: 200,
          // zoom: 100,
        }}
        >
        {/* <OrbitControls /> */}
        <ambientLight intensity={0.5} />  
        <directionalLight position={ [1, 2, 3]} color="blue" intensity={2.5}/>
        {/* <fog attach='fog' args={['white', 1, 10]}/> */}
        <Bulb position={[0,3,0]}/>

        <CustomObjects />


        {/* <Suspense>
          <Background />
        </Suspense> */}
        <axesHelper args={[5]}/>
        {/* <CustomGeometryParticles count={2000} shape="sphere"/> */}


        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  )
}

export default App; 