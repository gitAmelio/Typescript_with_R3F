import { useSnapshot } from "valtio";
import { ContactShadows } from "@react-three/drei";
import { state } from "../../../store";
import { useControls } from "leva";

const ContactShadowsWrapper = () => {

  const snap = useSnapshot(state);

  const { color, opacity, blur, enabled } = useControls('ContactShadows',{
    enabled: true,
    color: '#4b2709',
    opacity: {
      value: 0.4,
      min: 0,
      max: 1
    },
    blur: {
      value: 2.8,
      min: 0,
      max: 10
    }

  }) 

  return (
    <>
      { 
        enabled && 
        <ContactShadows 
          position={ [state.ground.x, state.ground.y - 0.01, state.ground.z] }
          scale={ 10 }
          resolution={ 512 }
          far={ 5 }

          color={color}
          opacity={opacity}
          blur={blur}

          frames={ 1 } // like bake
        /> 
      }
    </>
  )
}

export default ContactShadowsWrapper;