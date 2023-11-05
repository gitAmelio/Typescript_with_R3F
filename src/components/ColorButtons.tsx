import { useSnapshot } from "valtio";
import { state } from "../store";

const ColorButtons = () => {

  const snap = useSnapshot(state)

  const handleClick = (color: string) => {
     state.buttunColor[state.active] = color;
  } 

  const generateButtons = snap.colors.map( color => {
    return (
        <div key={color}
        onClick={()=>handleClick(color)}
        style={{
          background: color,
          height: 50,
          width: 50,
          borderRadius: 45,
          margin: 10,

          border: 'solid white 2px',

          
        }}
      >
      </div>
    )
  }) 

  return (
    <div style={{
      position: 'absolute', 
      zIndex: 1
      }}>
        {generateButtons}  
    </div>

  )
}

export default ColorButtons;