import { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'
import {ItemTypes, Path} from './Gameboard'

const Image = ({state, callbackSwitch}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.piece,
    item: {type: ItemTypes.piece, value: state},
    collect: (monitor) => { return { isDragging: monitor.isDragging() }}
  }))
  const [{isOver}, drop] = useDrop(() => ({
    accept: [ItemTypes.piece],
    drop: (item, monitor) => {callbackSwitch(item.value, state)}, 
    collect: monitor => ({ isOver: !!monitor.isOver() })
  }))
  const dnd = useRef(null);
  drag(drop(dnd));

  return <img style={
    {"gridColumn": state.actualX, "gridRow": state.actualY}} 
    ref={dnd} src={Path+state.url} alt={state.actualX +":"+state.actualY} />
}

export default Image;
