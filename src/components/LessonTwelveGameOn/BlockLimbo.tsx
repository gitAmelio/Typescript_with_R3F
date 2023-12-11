import { BlockMesh, floor2Material } from './Utils';
import { BlockStartProps } from './BlockStart';

const BlockLimbo = ({position = [0,0,0]}: BlockStartProps) => (
  <BlockMesh 
    position={ position }
    material={ floor2Material }
    type="limbo"
  />
)

export default BlockLimbo;