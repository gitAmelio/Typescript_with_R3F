import { BlockMesh, floor2Material } from './Utils';
import { BlockStartProps } from './BlockStart';

const BlockSpinner = ({position = [0,0,0]}: BlockStartProps) => (
  <BlockMesh
    position={ position }
    material={floor2Material }
    type="spinner"
  />
)

export default BlockSpinner;