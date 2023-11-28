import { forwardRef } from "react";
import DrunkEffect, { DrunkEffectProps } from "./DrunkEffect";
import { ThreeElements } from "@react-three/fiber";
import { BlendFunction } from "postprocessing";


const Drunk = forwardRef< ThreeElements, DrunkEffectProps>(({
  frequency, 
  amplitude, 
  blendFunction = BlendFunction.DARKEN
  }, ref) => {

  const effect = new DrunkEffect({
    frequency,
    amplitude,
    blendFunction
  });

  return (
    <primitive object={ effect } ref={ref} />
  )
})

export default Drunk;