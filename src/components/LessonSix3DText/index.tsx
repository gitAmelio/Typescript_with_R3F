import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import TextAndDonutsR3F from "./TextAndDonutsR3F";
import TextAndDonutsNative from "./TextAndDonutsNative";

const LessonSix3DText = () => {

  const { matcapID } = useControls({
    matcapID: {
      options: {
        chromeMarbel: '4F4C45_A7AEAA_7A8575_9D97A2', 
        chromeBeach: '736655_D9D8D5_2F281F_B1AEAB',  
        toffy: '763B28_D0BDB8_ADA39E_1E1D1D',  
        stoney: '887153_E5C188_433729_C1A484', 
        golden: '8B892C_D4E856_475E2D_47360A', 
        milky: 'BAADA8_ECE6E7_9A8378_E3DCD3', 
       barney: 'CA4FE1_6B2398_A337C7_9334BC' 
      }
    }
  })
 
  return (
    <>
      <Perf position="top-left"/>

      <OrbitControls makeDefault />
      
      <TextAndDonutsR3F matcapId={matcapID}/>
      {/* <TextAndDonutsNative matcapId={matcapID} /> */}

    </>
  )
}

export default LessonSix3DText; 