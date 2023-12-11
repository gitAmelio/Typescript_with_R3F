import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights";
import Level from "./Level";
import Player from "./Player";
import useGame from "./stores/useGame";
// import Effects from "./Effects";


const LessonTwelveGameOn = () => {

  const blocksCount = useGame( (state: any) => state.blocksCount )
  const blocksSeed = useGame( (state: any) => state.blocksSeed )

  return (
    <>

      <color args={[ '#bdedfc' ]} attach='background' />
      <OrbitControls />
      <Physics >
        <Lights />
        <Level count={ blocksCount } seed={blocksSeed} />
        <Player/>
      </Physics>

      {/* <Effects /> */}
    </>
  )
}

export default LessonTwelveGameOn; 