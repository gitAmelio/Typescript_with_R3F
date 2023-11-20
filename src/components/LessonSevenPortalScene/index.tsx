import { Center, OrbitControls, Sparkles, useGLTF, useTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Group, Material, Mesh } from "three";
import { GLTF } from 'three-stdlib';
import { useControls } from 'leva';
import Fire from './Fire';
import Portal from './Portal';

type PortalSceneProps = GLTF & {
  nodes: {
     Scene: Group;
     baked: Mesh;
     poleLightA: Mesh; 
     poleLightB: Mesh;
     portalLight: Mesh; 
  };
  materials: {
    [key: string]: Material
  }
}
 
const LessonSevenPortalScene = () => {

  const {nodes} = useGLTF('./model/portal.glb') as PortalSceneProps; 
  const bakedTexture  = useTexture('./model/baked.jpg');
  bakedTexture.flipY = false;

  const { uColorStart, uColorEnd } = useControls({
    uColorStart: '#f5da8a',
    uColorEnd: '#efbe88'
  })

  return (
    <>

      <color args={ ['#201919'] } attach="background" />

      <Perf position={'top-left'}/>

      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={ nodes.baked.geometry } >
          {/* <meshBasicMaterial map={ bakedTexture } map-flipY={ false }/> */}
          <meshBasicMaterial map={ bakedTexture } />
        </mesh>

        <mesh 
          geometry={nodes.poleLightA.geometry} 
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh 
          geometry={nodes.poleLightB.geometry} 
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        {/* <Suspense fallback={null}>
          <Fire scale={6} position-y={3}                 
          />
        </Suspense> */}

        <Portal
          colorStart={uColorStart}
          colorEnd={uColorEnd}
          geometry={ nodes.portalLight.geometry }
          position={ nodes.portalLight.position }
          rotation={ nodes.portalLight.rotation }
        />


        <Sparkles 
          size={ 6 }
          scale={ [ 4, 2, 4 ] }
          position-y={ 1 }
          speed={ 0.2 }
          count={ 40 }
        />

      </Center>
    </>
  )
}

export default LessonSevenPortalScene;