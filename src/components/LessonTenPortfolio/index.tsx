import { ContactShadows, Environment, Float, Html, PresentationControls, Text, Text3D, useGLTF, useMatcapTexture } from "@react-three/drei";
import './index.css';
import { useState } from "react";
import { MeshMatcapMaterial, Vector3 } from "three";
import { useControls } from "leva";

const LessonTenPortfolio = () => {

  const { matcapId, nameRotation, namePosition, nameSize, nameYSpace, nameHeight, nameStyle } = useControls({
    matcapId: {
      options: {
        stoney: '887153_E5C188_433729_C1A484', 
        chromeMarbel: '4F4C45_A7AEAA_7A8575_9D97A2', 
        chromeBeach: '736655_D9D8D5_2F281F_B1AEAB',  
        toffy: '763B28_D0BDB8_ADA39E_1E1D1D',  
        golden: '8B892C_D4E856_475E2D_47360A', 
        milky: 'BAADA8_ECE6E7_9A8378_E3DCD3', 
       barney: 'CA4FE1_6B2398_A337C7_9334BC' 
      }
    },
    nameRotation: { 
      value: -1.5,
      min: -2,
      max: 1
    },
    namePosition: {
      value: [ 1.74, 0.71, -1.16 ]
    },
    nameSize: {
      value: 0.42,
      min: 0,
      max: 1
    },
    nameYSpace: {
      value: 0.31,
      min: 0,
      max: 1
    },
    nameHeight: {
      value: 0.06,
      min: 0,
      max: 1
    },
    nameStyle: {
      options: {
        helvetica: './fonts/helvetiker_regular.typeface.json'
      }  
    }

  })

  const [ material, setMaterial ] = useState<MeshMatcapMaterial>(null!);
  const [matcapTexture] = useMatcapTexture(matcapId, 256)
  const macbook = useGLTF('./macbook.gltf');

  const generate3DText = (text: string) => {
    return text.split(' ').map((subText: string, index: number) => {
      // const subText
      const [x, y, z] = namePosition;
      const position = new Vector3(x, y-(index * (nameSize + nameYSpace)), z);
      return <Text3D 
      key={index}
      // font={'./fonts/helvetiker_regular.typeface.json'}
      font={ nameStyle }
      size={ nameSize }
      height={ nameHeight }
      curveSegments={ 12 }
      bevelEnabled
      bevelThickness={ 0.02 }
      bevelSize={ 0.02 }
      bevelOffset={ 0 }
      bevelSegments={ 5 }
      position={ position }
      rotation-y={ nameRotation }
      material={material}
      letterSpacing={0.08}
      
    
    >
      { subText }
    </Text3D>
    })
  }


  return (
    <>

      <Environment preset="city" />

      <color args={['#241a1a']} attach="background" />

      <meshMatcapMaterial matcap={matcapTexture} ref={setMaterial as React.Ref<MeshMatcapMaterial>} />

      <PresentationControls
        global
        rotation={ [ 0.13, 0.1, 0 ] }
        polar={ [ -0.4, 0.2 ] }
        azimuth={ [ -1, 0.75 ] }
        config={ { mass: 2, tension: 400 } }
        snap={ { mass: 4, tension: 400} }
      >
        <Float rotationIntensity={ 0.4 }>
          {/* light */}
          <rectAreaLight 
            width={ 2.5 }
            height={ 1.65 }
            intensity={ 65 }
            color={ '#ff6900' }
            rotation={ [ -0.1, Math.PI, 0 ] }
            position={ [ -0.1, 0.55, -1.15 ] }
          />
          {/* model */}
          <primitive 
            object={macbook.scene} 
            position-y={ -1.2 }
          > 
            <Html
              transform
              wrapperClass="macbookScreen"
              distanceFactor={ 1.17 }
              position={ [ 0, 1.56, -1.4 ] }
              rotation-x={ -0.256 }
            >
              {/* <iframe src="https://bruno-simon.com/html" /> */}
              <iframe src="https://epic-panini-af5668.netlify.app/" />
            </Html>
          </primitive>
          {/* <Text
            font="./Bangers-Regular.ttf"
            fontSize={ 0.6 }
            position={ [ 2, 0.75, 0.75 ] }
            rotation-y={ -1.25 }
            maxWidth={ 2 }
          >
            Amelio Croza
          </Text> */}
          {generate3DText('Amelio Croza')}
        </Float>
      </PresentationControls>      

      <ContactShadows 
        position-y={ -1.4 } 
        opacity={ 0.4 }
        scale={ 5 }
        blur={ 2.4 }
      />

    </>
  ) 
}

export default LessonTenPortfolio;