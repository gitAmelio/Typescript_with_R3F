import { SSR, DepthOfField, EffectComposer } from "@react-three/postprocessing";

const Effects = () => {
  return (
    <>
      <EffectComposer>
        <SSR 
          intensity={ 0.45 }
          thickness={ 10 }
          maxDepthDifference={ 10 }
          maxRoughness={ 1 }
          ior={ 0.45 }
          jitter={ 0.75 }
          USE_NORMALMAP
          USE_ROUGHNESSMAP
        />
        {/* <DepthOfField
          focusDistance={ 0.01 }
          focalLength={ 0.02 }
          bokehScale={ 3 }
        /> */}
      </EffectComposer>
    </>
  )
}

export default Effects;