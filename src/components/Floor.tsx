

const Floor = ({...props}) => {
  return (
    <mesh {...props} position={[0,-2,0]} receiveShadow>
      <boxGeometry args={[20,1,10]}/>
      <meshPhysicalMaterial />
    </mesh>
  )
}

export default Floor;