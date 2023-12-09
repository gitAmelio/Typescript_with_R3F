import BlockSpinner from './BlockSpinner';
import BlockStart from './BlockStart';
import BlockLimbo from './BlockLimbo';
import BlockAxe from './BlockAxe';
import BlockEnd from './BlockEnd';
import { useMemo } from 'react';
import Bounds from './Bounds';

const Default = [
  BlockSpinner,
  BlockAxe,
  BlockLimbo
]

type Block = typeof BlockStart | typeof BlockEnd | typeof BlockLimbo | typeof BlockAxe

interface LevelProps {
  count?: number;
  types?: Block[];
}

const Level = ({count = 5, types = Default}: LevelProps ) => {

  const blocks = useMemo(() => { 
    const blocks = []

    for (let i = 0; i < count; i++){
      const index = Math.floor(Math.random() * types.length);
      const type = types[index]
      blocks.push(type);
    }

    return blocks;
  }, [count, types])
  return (
    <>
      <BlockStart position={[ 0, 0, 0 ]} />
      { blocks.map((Blck: Block, index) => <Blck  key={index} position={ [0, 0, -(index+1) * 4 ] }/>) }
      <BlockEnd position={ [0, 0, (types.length+3) * -4 ] } />

      <Bounds length={count + 2} />      
    </>
  )
}

export default Level; 