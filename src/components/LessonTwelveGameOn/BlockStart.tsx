import { boxGeometry, floor1Material } from "./Utils";

export interface BlockStartProps {
  position?: [ number, number, number];
}

const BlockStart = ({position = [0,0,0]}: BlockStartProps) => {
  return (
    <group position={position}>
      <mesh 
        geometry={ boxGeometry } 
        material={ floor1Material }
        position={ [ 0, -0.1, 0 ] } 
        scale={ [4, 0.2, 4] } 
        receiveShadow
      />
    </group>
  )
}

export default BlockStart;