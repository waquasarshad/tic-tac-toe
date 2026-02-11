import { useState } from 'react';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { Confetti } from './components/Confetti';
import { CameraEffects } from './components/CameraEffects';
import { useParallax } from './hooks/useParallax';
import { createEmptyBoard, makeMove, getNextPlayer } from './utils/gameLogic';
import { checkWinner, checkDraw } from './utils/winCheck';
import './assets/styles/global.css';

function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cameraShake, setCameraShake] = useState(false);
  
  const parallax = useParallax();

  const handleCellClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = makeMove(board, index, currentPlayer);
    if (!newBoard) return;

    setBoard(newBoard);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      setShowConfetti(true);
      setCameraShake(true);
      setTimeout(() => setCameraShake(false), 1000);
    } else if (checkDraw(newBoard)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(getNextPlayer(currentPlayer));
    }
  };

  const handleRestart = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    setShowConfetti(false);
    setCameraShake(false);
  };

  return (
    <div 
      className="app" 
      style={{
        backgroundPositionX: `${parallax.x}px`,
        backgroundPositionY: `${parallax.y}px`,
      }}
    >
      <CameraEffects shake={cameraShake}>
        <div className="game-container">
          <h1 className="title">3D Tic Tac Toe</h1>
          <Controls
            currentPlayer={currentPlayer}
            winner={winner}
            isDraw={isDraw}
            onRestart={handleRestart}
          />
          <Board
            board={board}
            onCellClick={handleCellClick}
            winningLine={winningLine}
            gameOver={winner !== null || isDraw}
          />
        </div>
      </CameraEffects>
      <Confetti active={showConfetti} />
    </div>
  );
}

export default App;
