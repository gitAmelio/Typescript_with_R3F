import { EffectComposer, Outline, Selection } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import Box from "./Box";
import CustomObject from "./CustomObject";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

const CustomObjects = (({...props}) => {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(angle) * 8;
    state.camera.position.z = Math.cos(angle) * 8;
    state.camera.lookAt(0,0,0);
  })

  return (
    <>
          <Selection>
            <EffectComposer multisampling={8} autoClear={false}>
              <Outline blur visibleEdgeColor={0xffffff} edgeStrength={10} width={1000} />
            </EffectComposer>
            <group ref={groupRef}>
              <Suspense fallback={null}>
                <Box meshId={1} position={[-2,1,0]}/>
              </Suspense>
              <Suspense fallback={null}>
                <Box meshId={2} position={[2,1,0]}/>
              </Suspense>
            </group>
          </Selection>
          <CustomObject />
    </>
  )
})

export default CustomObjects;