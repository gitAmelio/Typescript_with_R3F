import { Html, OrbitControls, useCursor, useGLTF } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import { GLTF } from 'three-stdlib';
import './index.css'

type GLTFResult = GLTF & {
  nodes: {
    Scene: THREE.Group;
    bottomBun: THREE.Mesh;
    cheese: THREE.Mesh;
    meat: THREE.Mesh;
    topBun: THREE.Mesh;
  };
  materials: {
     [key: string]: THREE.MeshStandardMaterial;
  }
}

const LessonEightPointerEvents = () => {

  const cube = useRef<Mesh>(null!);
  const html = useRef<HTMLDivElement>(null!)
  const [cubeMaterial, setCubeMaterial] = useState<MeshStandardMaterial>(null!)
  const [htmlText, setHtmlText] = useState('test')
  const [enablePointer, setEnablePointer] = useState(false);

  const hamburger = useGLTF("./hamburger.glb") as GLTFResult;
   
  // meshBounds, useBVH
  useCursor(enablePointer);
  
  useEffect(() => {
    setCubeMaterial(cube.current.material as MeshStandardMaterial);
  }, [])

  
  const handleOnPointerEnter = ( _event: ThreeEvent<PointerEvent> ) => {
    cubeMaterial.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
    setHtmlText('PointerEnter');
    setEnablePointer(true);

    // document.body.style.cursor = 'pointer'

    // console.log('---')
    // console.log('distance', event.distance) // Distance between camera and hit point
    // console.log('point', event.point) // Hit point coordinates (in 30)
    // console.log('uv', event.uv) // UV coordinates on the geometry (in 20)
    // console.log('object', event.object) // The object that triggered the event
    // console.log('eventObject', event.eventObject) // The obect that was listening to 

    // console.log('---')
    // console.log('x', event.x) // 2D screen coordinates of the pointer
    // console.log('y', event.y) // 2D screen coordinates of the pointer

    // console.log('---')
    // console.log('shiftKey', event.shiftKey) // If the SHIFT key was pressed
    // console.log('ctrlKey', event.ctrlKey) // If the CTRL key was pressed
    // console.log('metaKey', event.metaKey) // If the COMMAND key was pressed
  }

  const handleOnPointerLeave = ( _event: ThreeEvent<PointerEvent> ) => {
    setHtmlText('Try something with the Cube');
    setEnablePointer(false);
  }

  const handleOnBurgerClick = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    // console.log(event.object.name)
    // console.log(event.eventObject)
    // console.log(event)
  }

  const handleBurgerOnPointerEnter = (event: any) => {
    event.stopPropagation();
    event.object.material.wireframe = true;
    setEnablePointer(true);
  } 
  const handleBurgerOnPointerLeave = (event: any) => {
    event.stopPropagation();
    event.object.material.wireframe = false;
    setEnablePointer(false);
  }

  useFrame((_state, delta) => {
    cube.current.rotation.y += delta * 0.2
  })

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
      <ambientLight intensity={ 1.5 } />

      <mesh position-x={ - 2 }>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={ cube } position-x={ 2 } scale={ 1.5 } 
        onClick={()=>{setHtmlText('Clicked')}}
        onContextMenu={()=>{setHtmlText('ContextMenu')}}
        onDoubleClick={()=>{setHtmlText('DoubleClick')}}
        onPointerUp={()=>{setHtmlText('PointerUp')}}
        onPointerDown={()=>{setHtmlText('PointerDown')}}
        onPointerOver={()=>{setHtmlText('PointerOver')}}
        onPointerEnter={handleOnPointerEnter}
        onPointerLeave={handleOnPointerLeave}
        onPointerMissed={()=>{setHtmlText('That is not the Cube')}}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
        <Html ref={html}
            position={[1,1,0]}
            wrapperClass="label"
            center
            distanceFactor={ 6 }
            // occlude={ [sphereRef, boxRef ] }
          >
            {htmlText}
        </Html>
      </mesh>

      <mesh position-y={ -1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 } >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive 
        object={ hamburger.scene }
        scale={ 0.2 }
        position-y={ 0.5 }
        onClick={handleOnBurgerClick}
        onPointerEnter={handleBurgerOnPointerEnter}
        onPointerLeave={handleBurgerOnPointerLeave}
      />

    </>
  )
}

export default LessonEightPointerEvents;

