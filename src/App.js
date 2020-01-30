import React, {useState, useEffect} from 'react';
import Checker from './checker/checker'
import Board from './components/board'

import './App.css';

const checkerGen = (new Checker()).game();

function App() {
  const [board, setBoard] = useState([]);
  const [playerTurn, setPlayerTurn] = useState();
  const [allowed, setAllowed] = useState([]);
  const [phase , setPhase] = useState('');
  const [msg , setMsg] = useState("");
  const [allowedOrigins, setAllowedOrigins] = useState([]);

  function getStatus() {
    const state = checkerGen.next().value;
    loadState(state)
  }

  function isSamePath([[originRowA, originColA],[destinyRowA, destinyColA]], [[originRowB, originColB],[destinyRowB, destinyColB]]) {
    return (originRowA === originRowB && originColA === originColB && destinyRowA === destinyRowB && destinyColA === destinyColB);
  }

  function loadState(state) {
    setBoard(state.board);
    setPlayerTurn(state.player);
    setAllowed(state.allowed);
    setPhase(state.phase);
    setMsg(state.msg);
  }

  function doMove(origin, destiny) {
    if (phase === 'move') {
      checkerGen.next(origin);
      const state = checkerGen.next(destiny).value;
      loadState(state);
    } else if (phase === 'force') {
      for(let i = 0; i < allowed.length; i++) {
        const move = allowed[i];
        if (isSamePath(move,[origin, destiny])) {
          const state = checkerGen.next(i).value;
          loadState(state);
          break;
        }
      }
    }
  }

  useEffect(() => {
    setAllowedOrigins(allowed.map((path) => {
      return path[0]
    }));
  }, [allowed]);

  return (
    <div className="App">
      <Board allowed={allowedOrigins} board={board} playerTurn={playerTurn} doMove={(origin, destiny) => doMove(origin, destiny)} />
      <div>{msg}</div>
      <button onClick={() => getStatus()}>Start Game</button>
    </div>
  );
}

export default App;
