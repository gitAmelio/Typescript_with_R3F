import { Text } from "@react-three/drei";
import { BlockMesh, floor1Material } from "./Utils";
import Trophy from "./Trophy";

export interface BlockStartProps {
  position?: [ number, number, number];
}

const FinishText = () => (
  <Text 
    font="./fonts/bebas-neue-v9-latin-regular.woff"
    scale={ 1 }
    position={ [0, 1.6, 0] }
  >
    FINISH
    <meshBasicMaterial toneMapped={ false } />  
  </Text>
)

const BlockEnd = ({position = [ 0, 0, 0 ]}: BlockStartProps) => (
  <BlockMesh 
    position={position}
    material={floor1Material}
    type = 'end'
  >
    <FinishText />
    <Trophy />
  </BlockMesh>
)

export default BlockEnd;