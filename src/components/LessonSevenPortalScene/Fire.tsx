import React, { useLayoutEffect } from 'react'
import { MaterialNode, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'
import { extend, useLoader } from '@react-three/fiber'

import snoise from 'glsl-noise/simplex/3d.glsl'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
THREE.ShaderChunk.snoise = snoise;

class FireMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      defines: { ITERATIONS: '10', OCTIVES: '3' },
      uniforms: {
        uFireTex: { value: null },
        uColor: { value: null },
        uTime: { value: 0.0 },
        uSeed: { value: 0.0 },
        uInvModelMatrix: { value: null },
        uScale: { value: null },
        uNoiseScale: { value: new THREE.Vector4(1, 2, 1, 0.3) },
        uMagnitude: { value: 2.5 },
        uLacunarity: { value: 3.0 },
        uGain: { value: 0.6 }
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        }`,
      fragmentShader: `

        // #pragma glslify: snoise = require(glsl-noise/simplex/3d.glsl) 
        #include <snoise>

        uniform vec3 uColor;
        uniform float uTime;
        uniform float uSeed;
        uniform mat4 uInvModelMatrix;
        uniform vec3 uScale;
        uniform vec4 uNoiseScale;
        uniform float uMagnitude;
        uniform float uLacunarity;
        uniform float uGain;
        uniform sampler2D uFireTex;
        varying vec3 vWorldPos;              

        float turbulence(vec3 p) {
          float sum = 0.0;
          float freq = 1.0;
          float amp = 1.0;
          for(int i = 0; i < OCTIVES; i++) {
            sum += abs(snoise(p * freq)) * amp;
            freq *= uLacunarity;
            amp *= uGain;
          }
          return sum;
        }

        vec4 samplerFire (vec3 p, vec4 scale) {
          vec2 st = vec2(sqrt(dot(p.xz, p.xz)), p.y);
          if(st.x <= 0.0 || st.x >= 1.0 || st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
          p.y -= (uSeed + uTime) * scale.w;
          p *= scale.xyz;
          st.y += sqrt(st.y) * uMagnitude * turbulence(p);
          if(st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
          return texture2D(uFireTex, st);
        }

        vec3 localize(vec3 p) {
          return (uInvModelMatrix * vec4(p, 1.0)).xyz;
        }

        void main() {
          vec3 rayPos = vWorldPos;
          vec3 rayDir = normalize(rayPos - cameraPosition);
          float rayLen = 0.0288 * length(uScale.xyz);
          vec4 col = vec4(0.0);
          for(int i = 0; i < ITERATIONS; i++) {
            rayPos += rayDir * rayLen;
            vec3 lp = localize(rayPos);
            lp.y += 0.5;
            lp.xz *= 2.0;
            col += samplerFire(lp, uNoiseScale);
          }
          col.a = col.r;
          gl_FragColor = col;
        }`
    })
  }
}

extend({ FireMaterial })

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    fireMaterial: MaterialNode<FireMaterial, typeof FireMaterial>
  }
}

interface FireProps {
  color?: THREE.Vector3 | null;
  [key: string]: any
}

const Fire: React.FC<FireProps> = ({ color, ...props }) => {
  const ref = useRef<THREE.Mesh>(null!)
  const matRef = useRef<FireMaterial>(null!)
  const texture = useLoader(THREE.TextureLoader, './fire.png')
  useFrame((state) => {
    const invModelMatrix = matRef.current.uniforms.uInvModelMatrix.value
    ref.current.updateMatrixWorld()
    invModelMatrix.copy(ref.current.matrixWorld).invert()
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime
    matRef.current.uniforms.uInvModelMatrix.value = invModelMatrix
    matRef.current.uniforms.uScale.value = ref.current.scale
  })
  useLayoutEffect(() => {
    texture.magFilter = texture.minFilter = THREE.LinearFilter
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
    matRef.current.uniforms.uFireTex.value = texture
    matRef.current.uniforms.uColor.value = color || new THREE.Color(0xeeeeee)
    matRef.current.uniforms.uInvModelMatrix.value = new THREE.Matrix4()
    matRef.current.uniforms.uScale.value = new THREE.Vector3(1, 1, 1)
    matRef.current.uniforms.uSeed.value = Math.random() * 19.19
  }, [])
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry />
      <fireMaterial ref={matRef} transparent depthWrite={false} depthTest={false} />
    </mesh>
  )
}

export default Fire;

