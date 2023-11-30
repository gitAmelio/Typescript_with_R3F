// import LessonOne from './components/LessonOne';
import { Leva } from 'leva';
import { Canvas } from '@react-three/fiber';
// import * as THREE from 'three';
import { state } from './store';
import { useSnapshot } from 'valtio';
// import { LessonNinePostProcessingCustom, LessonNinePostProcessingStandard } from './components/LessonNinePostProcessing';
// import LessonEightPointerEvents from './components/LessonEightPointerEvents';
import LessonTenPortfolio from './components/LessonTenPortfolio';


// const handleOnCreated:((state: RootState) => void) = (state) => {
//   // state.gl.setClearColor('#ff0000', 1)
//   state.scene.background = new THREE.Color('mediumpurple')
// }


const App = () => {
  
  const snap = useSnapshot(state)
  console.log(state.normalShadow)

  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <Leva collapsed/>
      <Canvas
        shadows={state.normalShadow}
        flat // toneMapping
        // shadows
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
        {/* <LessonFourEnv_Stage /> */}
        {/* <LessonFiveModels /> */}
        {/* <LessonSixText /> */}
        {/* <LessonSevenPortalScene /> */}
        {/* <LessonEightPointerEvents /> */}
        {/* <LessonNinePostProcessingStandard /> */}
        {/* <LessonNinePostProcessingCustom /> */}
        <LessonTenPortfolio />
      </Canvas>
    </div>
  )
}

export default App; 