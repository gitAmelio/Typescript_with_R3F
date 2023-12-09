import { Center, OrbitControls, Text3D, useMatcapTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";
import React from 'react';
import { Group, MeshMatcapMaterial,  TorusGeometry} from "three";

interface TextAndDonutsR3FProps {
  matcapId: string;
}

const TextAndDonutsR3F: React.FC<TextAndDonutsR3FProps> = ({matcapId}) => {

  const ref = useRef<Group>(null!)

  const [ torusGeometry, setTorusGeometry ] = useState<TorusGeometry>(null!);
  const [ material, setMaterial ] = useState<MeshMatcapMaterial>(null!);

  const [matcapTexture] = useMatcapTexture(matcapId, 256)

  useFrame((state, delta) => {
    for(const donut of ref.current.children){
      donut.rotation.y += delta + 0.01
    }
  })

  const generateDonuts = () => {

    return (
      <group ref={ref}>
        {
          [...Array(100)].map((_, index)=>{
            return (
              <mesh 
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
      </group>
    )
  }
  
  return (
    <>
      <Perf position="top-left"/>

      <OrbitControls makeDefault />
      
      <torusGeometry args={ [1, 0.6, 16, 32] } ref={setTorusGeometry as React.Ref<TorusGeometry>} />
      <meshMatcapMaterial matcap={matcapTexture} ref={setMaterial as React.Ref<MeshMatcapMaterial>} />

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

export default TextAndDonutsR3F; 