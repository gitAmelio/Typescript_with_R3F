import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, WebGLCubeRenderTarget } from "three";

const Background = ({...props}) => {
  const texture = useLoader(TextureLoader, './autoshop.jpg');

  const { gl } = useThree();

  const formatted = new WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture( gl, texture);

  return (
    <primitive attach='background' object={formatted.texture}/>
  )
}

export default Background;