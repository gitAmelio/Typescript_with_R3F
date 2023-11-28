import { 
  OrbitControls,
} from "@react-three/drei";
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import './index.css';
import { state } from "../../store";
import Floor from "./components/Floor";
import Staged from "./components/Staged";
import Meshes from "./components/Meshes";
import Lights from "./components/Lights";
import ContactShadowsWrapper from "./components/ContactShadowsWrapper";
import AccumulativeShadowsWrapper from "./components/AccumalativeShadowsWrapper";
import SoftAndBakedShadows from "./components/SoftAndBakeShadows";
import EnvironmentWrapper from "./components/EnvironmentWrapper";

const LessonFourEnvStaging = () => {
  
  const { 
    perfVisible, 
    shadowEnabled,
  } = useControls({
    perfVisible: true,
    shadowEnabled: true,
  })
  
  state.normalShadow = shadowEnabled;
  
  return (
    <>
      {perfVisible && <Perf position="top-left"/>}
      <OrbitControls makeDefault/> 

      <Meshes />
      <Floor/>
      <Lights />
      <EnvironmentWrapper />
      <SoftAndBakedShadows />
      <AccumulativeShadowsWrapper />
      <ContactShadowsWrapper />
      <Staged />
    </>
  )
}

export default LessonFourEnvStaging;
