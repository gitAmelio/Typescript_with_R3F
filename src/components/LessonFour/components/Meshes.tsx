import { useSnapshot } from "valtio"
import { state } from "../../../store"
import { useControls } from "leva";
import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

const Meshes = () => {

  const cubeRef = useRef<Mesh>(null);
  const snap = useSnapshot(state);

  const {
    meshesEnabled
  } = useControls('Meshes', {
    meshesEnabled: false
  })

  useFrame((state, delta) => {
    meshesEnabled && (cubeRef.current!.rotation.y += delta * 0.2);
  })

  return (
    <>{
      meshesEnabled &&
      <>
        <mesh castShadow position-y={ 1 } position-x={ -2} >
          <sphereGeometry />
          <meshStandardMaterial color="orange" envMapIntensity={state.envMapIntensity}/>
          {/* <meshStandardMaterial color={ color } /> */}
        </mesh>

        <mesh castShadow ref={cubeRef} position-y={ 1 } position-x={ 2 } >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" envMapIntensity={state.envMapIntensity} />
        </mesh>
      </>
    }</>
  )
}

export default Meshes;