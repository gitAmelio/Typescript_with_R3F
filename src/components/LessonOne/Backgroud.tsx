import { useLoader, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { TextureLoader, WebGLCubeRenderTarget } from "three";

const Background = ({...props}) => {
  const texture = useLoader(TextureLoader, './autoshop.jpg');

  const { gl } = useThree();

  const formatted = new WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture( gl, texture);

  return (
    <Suspense>
      <primitive attach='background' object={formatted.texture}/>
    </Suspense>
  )
}

export default Background;