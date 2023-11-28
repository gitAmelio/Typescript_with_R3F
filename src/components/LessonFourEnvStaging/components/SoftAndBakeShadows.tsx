import { BakeShadows, SoftShadows } from "@react-three/drei";
import { useControls } from "leva";
import { useState } from "react";

const SoftAndBakedShadows = () => {

  const [bad, set] = useState(false);

  const { 
    softShadowsEnabled,
    bakedShadowsEnabled,
    samples, 
    ...config 
  } = useControls('SoftShadows',{
    softShadowsEnabled: false,
    bakedShadowsEnabled: false,
    size: { value: 35, min: 0, max: 100, step: 0.1 },
    focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
    samples: { value: 16, min: 1, max: 40, step: 1 }
  })

  return (
    <>
      {softShadowsEnabled && <SoftShadows {...config} samples={bad ? Math.min(6, samples) : samples} />}

      {bakedShadowsEnabled && <BakeShadows />}
    </>
  )
}

export default SoftAndBakedShadows;