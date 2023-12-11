import { Float, Text } from "@react-three/drei";
import { BlockMesh, floor1Material } from "./Utils";

export interface BlockStartProps {
  position?: [ number, number, number];
}

const FloatText = () => (
    <Float floatIntensity={ 0.25 } rotationIntensity={ 0.25 }>
    <Text 
      font="./fonts/bebas-neue-v9-latin-regular.woff"
      scale={ 0.5 }
      maxWidth={ 0.25 }
      lineHeight={ 0.75 }
      textAlign="right"
      position={[0.75, 0.65, 0]}
      rotation-y={ -0.25 }
    >
      Marble Race
      <meshBasicMaterial toneMapped={false} />
    </Text>
  </Float>
)

const BlockStart = ({position = [0,0,0]}: BlockStartProps) => {
  return (
    <BlockMesh
      material={floor1Material}
      position={position}
      type="start"
    >
      <FloatText />
    </BlockMesh>
  )
}

export default BlockStart;