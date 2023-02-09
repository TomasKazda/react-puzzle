import { useEffect, useState } from "react";
import './Gameboard.css'
import Image from './Image'
export const Path = "https://raw.githubusercontent.com/TomasKazda/react-puzzle/main/public"
export const ItemTypes = {piece: "piece"}

const Gameboard = () => {
  const [gamestate, setGameState] = useState({rows:0,columns:0,puzzle:[]})
  useEffect(() => {
    fetch(Path + "/puzzlelayout1.json")
    .then(response => response.json())
    .then(data => {
      for (const piece of data.puzzle) {
        piece.actualX = piece.originX
        piece.actualY = piece.originY
      }
      for (const piece of data.puzzle) {
        let randpiece = data.puzzle[Math.floor(Math.random() * data.puzzle.length)];
        [piece.actualX, randpiece.actualX] = [randpiece.actualX, piece.actualX];
        [piece.actualY, randpiece.actualY] = [randpiece.actualY, piece.actualY];
      } 
      setGameState(data)
    })
  }, [])

  const switchIt = (pieceFrom, pieceTo) => {
    const pf = gamestate.puzzle.find(e => e.originX === pieceFrom.originX && e.originY === pieceFrom.originY);
    const pt = gamestate.puzzle.find(e => e.originX === pieceTo.originX && e.originY === pieceTo.originY);
    const [ax, ay] = [pf.actualX, pf.actualY];
    pf.actualX = pt.actualX;
    pf.actualY = pt.actualY;
    pt.actualX = ax;
    pt.actualY = ay;
    setGameState(gamestate)
  }

  const imgs = gamestate.puzzle.map((p, k) => 
    <Image key={k} state={p} callbackSwitch={switchIt} />)

  return <section className="gameboard" 
      style={{
          "gridTemplateColumns": "repeat("+gamestate.columns+", 1fr)",
          "gridTemplateRows": "repeat("+gamestate.rows+", 1fr)"}}>
      {imgs}
    </section>;
}

export default Gameboard;
