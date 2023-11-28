

const Floor = ({...props}) => {
  const {color} = props;
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[20,1,10]}/>
      <meshPhysicalMaterial  color={color} />
    </mesh>
  )
}

export default Floor;