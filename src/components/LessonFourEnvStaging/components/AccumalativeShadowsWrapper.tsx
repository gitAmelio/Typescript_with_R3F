import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useControls } from "leva";
import { useSnapshot } from "valtio";
import { state } from "../../../store";

const AccumulativeShadowsWrapper = () => {
  const { enabled } = useControls('AccumulativeShadows',{ enabled: false })
  const snap = useSnapshot(state);
  return (
    <>
      {
        enabled &&
        <AccumulativeShadows
          position={ [0, state.ground.y + 0.01, 0] }
          scale={ 10 } // 10 is the default value
          color="#316d39"
          opacity={ 0.8 }
          // frames={ Infinity }
          frames={ 30 }
          temporal
          blend={ 100 }
        >
          <RandomizedLight
            amount={ 8 }
            radius={ 1 } // "jiggle"
            ambient={ 0.5 }
            intensity={ 1 }
            bias={ 0.001 }
            position={ [1, 2, 3] }
            // castShadow
          />
        </AccumulativeShadows>
      }
    </>
  )
}

export default AccumulativeShadowsWrapper;