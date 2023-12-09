import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights";
import Level from "./Level";
import Player from "./Player";


const LessonTwelveGameOn = () => {
  return (
    <>
      <OrbitControls />
      <Physics debug >
        <Lights />
        <Level />
        <Player/>
      </Physics>
    </>
  )
}

export default LessonTwelveGameOn;