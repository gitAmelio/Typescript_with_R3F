import { useSnapshot } from "valtio"
import { Shape, state } from "../store"

const ShapeButtons = () => {
  const snap = useSnapshot(state);

  const handleClick = (shape: Shape) => {
    state.buttonShape[state.active] = shape;
    console.log(snap.buttonShape)
    console.log(snap.shapes)
    console.log(state.active)
  }

  const generateButtons = snap.shapes.map(shape=>{
    return (
      <div key={shape}
        onClick={()=>handleClick(shape)}
        style={{
          fontSize: 12,
          fontWeight: "bold",
          background: 'grey',
          height: 50,
          width: 50,
          borderRadius: 45,
          margin: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'solid white 2px',
          
        }}
        >
        {shape.toUpperCase()}
      </div>
    )
  })

  return (
    <div style={{
      position: 'absolute', 
      top: 0,
      right: 0,
      zIndex: 1
      }}>
        {generateButtons}  
    </div>
  )

}

export default ShapeButtons;