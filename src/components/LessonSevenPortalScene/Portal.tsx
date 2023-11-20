import React, { useLayoutEffect } from 'react'
import { MaterialNode, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'
import { extend } from '@react-three/fiber'
import portalVertexShader from './shaders/portal/vertex.glsl';
import portalFragmentShader from './shaders/portal/fragment.glsl';

class StarGateMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      defines: { },
      uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color('#ffffff') },
        uColorEnd: { value: new THREE.Color('#000000') },
      },
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader
    })
  }
}

extend({ StarGateMaterial })

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    starGateMaterial: MaterialNode<StarGateMaterial, typeof StarGateMaterial>
  }
}

interface PortalProps {
  colorStart?: string;
  colorEnd?: string;
  [key: string]: any;
}

const Portal: React.FC<PortalProps> = ({ colorStart, colorEnd, ...props }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const matRef = useRef<StarGateMaterial>(null!)

  useFrame((_state, delta)=>{
    matRef.current.uniforms.uTime.value += delta;
    matRef.current.uniforms.uColorStart.value =  new THREE.Color(colorStart) || new THREE.Color('#ffffff') ;
    matRef.current.uniforms.uColorEnd.value = new THREE.Color(colorEnd) || new THREE.Color('#000000');
  })  

  return (
    <mesh ref={meshRef} {...props}>
      {/* <boxGeometry /> */}
      <starGateMaterial ref={matRef} />
    </mesh>
  )
}

export default Portal;

