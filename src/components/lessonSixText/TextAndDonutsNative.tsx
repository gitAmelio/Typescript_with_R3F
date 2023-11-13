import { Center, Text3D, useMatcapTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Group, Mesh, MeshMatcapMaterial, SRGBColorSpace, TorusGeometry } from "three";

const torusGeometry = new TorusGeometry(1, 0.6, 16, 32);
const material = new MeshMatcapMaterial()

interface TextAndDonutsNativeProps {
  matcapId: string;
}

const TextAndDonutsNative: React.FC<TextAndDonutsNativeProps> = ({matcapId}) => {


  // const ref = useRef<Group>(null!);
  const ref = useRef<Mesh[]>([]);


  const [matcapTexture] = useMatcapTexture(matcapId, 256)

  useEffect(() => {
    matcapTexture.colorSpace = SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  },[matcapId])

  useFrame((state, delta) => {
    // for(const donut of ref.current.children){
    for(const donut of ref.current){
      donut.rotation.y += delta + 0.01
    }
  })


  const generateDonuts = () => {

    return (
      // <group ref={ref}>
      <>
        {
          [...Array(100)].map((_, index)=>{
            return (
              <mesh 
                ref={(donut)=>{ref.current[index] = donut!}}
                key={index} 
                geometry={torusGeometry}
                material={material}
                position={[
                  (Math.random() - 0.5) * 10,
                  (Math.random() - 0.5) * 10,
                  (Math.random() - 0.5) * 10
                ]}
                scale={ 0.2 + Math.random() * 0.2 }
                rotation={[
                  Math.random() * Math.PI,
                  Math.random() * Math.PI,
                  0
                ]}
              >
              </mesh>
            )
          })
        }
      </>
      // </group>
    )
  }
  
  return (
    <>
      <Center>
        <Text3D 
          font={'./fonts/helvetiker_regular.typeface.json'}
          size={ 0.75 }
          height={ 0.2 }
          curveSegments={ 12 }
          bevelEnabled
          bevelThickness={ 0.02 }
          bevelSize={ 0.02 }
          bevelOffset={ 0 }
          bevelSegments={ 5 }
          material={material}
        
        >
          HELLO R3F
        </Text3D>
      </Center>

      { generateDonuts() }
    </>
  )
}

export default TextAndDonutsNative; 