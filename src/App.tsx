// import LessonOne from './components/LessonOne';
import { Leva } from 'leva';
import { Canvas, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
import LessonFourEnv_Stage from './components/LessonFour';
import { state } from './store';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
// import LessonThreeDebug from './components/LessonThree';
// import LessonTwoHelpers from './components/LessonTwoHelpers';

// const handleOnCreated:((state: RootState) => void) = (state) => {
//   // state.gl.setClearColor('#ff0000', 1)
//   state.scene.background = new THREE.Color('mediumpurple')
// }


const App = () => {
  
  // const enableNormal = () => {
  //   return state.normalShadow;
  // }
  // const snap = useSnapshot(state)
  

  return (
    <div style={{height: '100vh', width: '100vw'}}>
      {state.normalShadow && <div>test</div>}
      <Leva collapsed/>
      <Canvas
        // shadows={state.normalShadow}
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6]
        }}
        // onCreated={handleOnCreated} 
      >
        {/* <LessonOne /> */}
        {/* <LessonTwoHelpers /> */}
        {/* <LessonThreeDebug /> */}
        <LessonFourEnv_Stage />
      </Canvas>
    </div>
  )
}

export default App; 