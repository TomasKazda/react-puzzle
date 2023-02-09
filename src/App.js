import './App.css';
import Setup from "./components/Setup"
import Gameboard from './components/Gameboard';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  return (
    <div className="App">
      <Setup />
      <DndProvider className="App" backend={HTML5Backend}>
        <Gameboard />
      </DndProvider>
    </div>
  );
}

export default App;
