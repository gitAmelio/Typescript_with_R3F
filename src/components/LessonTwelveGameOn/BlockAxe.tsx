import { BlockMesh, floor2Material } from './Utils';
import { BlockStartProps } from './BlockStart';
import Obstacle from "./Obstacle";


const BlockAxe = ({position = [0,0,0]}: BlockStartProps) => (
    <BlockMesh
      position={ position }
      material={ floor2Material }
      type="axe"
    />
)

export default BlockAxe;