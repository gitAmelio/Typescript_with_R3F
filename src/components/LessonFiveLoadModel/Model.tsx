import { Clone, useGLTF } from "@react-three/drei";

const fileName = './hamburger-draco.glb';

const Model = () => {

  const model = useGLTF(fileName);

  return (
    <>
      <Clone object={ model.scene } scale={ 0.35 } position-x={ -4 } />
      <Clone object={ model.scene } scale={ 0.35 } position-x={  0 } />
      <Clone object={ model.scene } scale={ 0.35 } position-x={  4 } />
    </>
  )
}

useGLTF.preload(fileName)

export default Model;