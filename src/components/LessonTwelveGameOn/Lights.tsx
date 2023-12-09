import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DirectionalLight } from "three";

const Lights = () => {
  const lightRef = useRef<DirectionalLight>(null!);

  
  useFrame((state) => { 
    // if (!lightRef.current) return
    const aBitForward = -8;
    const cameraPositionZ = state.camera.position.z;
    lightRef.current.position.z = cameraPositionZ + aBitForward;
    lightRef.current.target.position.z = cameraPositionZ + aBitForward;
    lightRef.current.target.updateMatrixWorld();
  })

  return (
    <>
      <directionalLight 
        ref={ lightRef } 
        castShadow
        position={ [ 4, 4, 1 ] }
        intensity={ 1.5 }
        shadow-mapSize={ [ 1024, 1024 ] }
        shadow-camera-near={ 1 }
        shadow-camera-far={ 10 }
        shadow-camera-top={ 10 }
        shadow-camera-right={ 10 }
        shadow-camera-bottom={ -10 }
        shadow-camera-left={ -10 }
      />
      <ambientLight intensity={ 0.5 } />
    </>
  )
}

export default Lights;