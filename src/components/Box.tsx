import React, { useRef, useState } from "react";
import { ThreeEvent, useFrame, useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { easing } from 'maath';
import { Select } from '@react-three/postprocessing'
import { useSnapshot } from "valtio";
import { state } from "../store";

interface BoxProps {
  meshId?: number;
  [key: string]: any;
}

const Box: React.FC<BoxProps> = ({meshId, ...props}) => {
  
  const ref = useRef<Mesh>(null!);
  // const texture = useLoader(THREE.TextureLoader, '/PavingStones.jpg');

  const snap = useSnapshot(state);

  useFrame((state, delta) => {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
            
      if (meshId === snap.active){
        easing.damp( ref.current.scale, 'x', 1.5, 0.25, delta)
        easing.damp( ref.current.scale, 'y', 1.5, 0.25, delta)
        easing.damp( ref.current.scale, 'z', 1.5, 0.25, delta)
      } 
      else {
        easing.damp( ref.current.scale, 'x', 1, 0.25, delta)
        easing.damp( ref.current.scale, 'y', 1, 0.25, delta)
        easing.damp( ref.current.scale, 'z', 1, 0.25, delta)
      }
      
  })

  const handlePointerDown:((event: any) => void) = () => {
    if (meshId !== snap.active ) {
      state.active = meshId!;
    } else {
      state.active = 0;
    }
  }
  const handlePointerEnter:((event: ThreeEvent<PointerEvent>) => void) = () => {
    
  }
  const handlePointerLeave:((event: ThreeEvent<PointerEvent>) => void) = () => {

  }

  return (
    <Select enabled={meshId === snap.active}>
      <mesh 
        ref={ref} 
        {...props} 
        castShadow 
        // receiveShadow
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        >
        {
          snap.buttonShape[meshId!] === 'box' 
            ? <boxGeometry/> 
            : <sphereGeometry args={ [0.7, 32, 32] }/>
        }
        <meshPhysicalMaterial 
        // <meshStandardMaterial 
          // map={texture}
          color={snap.buttunColor[meshId!]}
          // // opacity={0.2}
          // transparent
          // // wireframe
          // // metalness={1}
          // roughness={0}
          // clearcoat={1}
          // transmission={0.5}
          // reflectivity={1}
          // side={THREE.DoubleSide}
          />
      </mesh>
    </Select>
  )
}

export default Box;