import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { BufferGeometry, DoubleSide } from "three";

const CustomObject = ({...props}) => {
  
  const geometryRef = useRef<BufferGeometry>(null);
  
  useEffect(()=>{
    geometryRef.current?.computeVertexNormals();
  },[])

  const verticesCount = 10 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions
  }, [])
  
  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute 
          attach="attributes-position" 
          count={ verticesCount }
          itemSize={3}
          array={positions}
        />
      </bufferGeometry> 
      <meshStandardMaterial color="red" side={DoubleSide}/>
    </mesh>
  )
}

export default CustomObject;