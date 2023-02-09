import { useEffect } from "react";

const Gameboard = () => {

  useEffect(() => {
    console.log(process.env.PUBLIC_URL)
    fetch("https://github.com/TomasKazda/react-puzzle/public/puzzlelayout1.json")
    .then(response => response.json())
    .then(data => console.log(JSON.stringify(data)))
  }, []);

  return <section className="gameboard"></section>;
}

export default Gameboard;
