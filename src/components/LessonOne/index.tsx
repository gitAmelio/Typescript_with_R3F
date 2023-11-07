import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import Floor from './Floor';
import Bulb from './Bulb';
// import Background from './Backgroud';
import ColorButtons from './ColorButtons';
import ShapeButtons from './ShapeButtons';
import CustomObjects from './CustomObjects';

const LessonOne = () => {
  
  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <ColorButtons />  
      <ShapeButtons />
      <Canvas 
        // dpr={[1,2]} // clamp pixel ratio
        // flat // Linear ToneMapping
        gl={{
          // antialias: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          // outputColorSpace: THREE.LinearSRGBColorSpace,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
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
        {/* <fog attach='fog' args={['white', 1, 10]}/> */}

        <OrbitControls />
        <ambientLight intensity={0.5} />  
        <axesHelper args={[5]}/>
        <directionalLight position={ [1, 2, 3]} intensity={0.5}/>

        <Bulb position={[0,3,0]}/>
        <CustomObjects position={[0, 1, 0]}/>
        <Floor color="green" position={[0, -0.5, 0]} />

        {/* <CustomGeometryParticles count={2000} shape="sphere"/> */}
        {/* <Background /> */}
      </Canvas>
    </div>
  )
}

export default LessonOne; 