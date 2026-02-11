import { useState } from 'react';
import { Board } from './components/Board';
import { Cube3D } from './components/Cube3D';
import { Controls } from './components/Controls';
import { Confetti } from './components/Confetti';
import { CameraEffects } from './components/CameraEffects';
import { useParallax } from './hooks/useParallax';
import { createEmptyBoard, makeMove, getNextPlayer } from './utils/gameLogic';
import { checkWinner, checkDraw } from './utils/winCheck';
import { createEmptyCube, makeCubeMove } from './utils/cubeLogic';
import { checkCubeWinner, checkCubeDraw } from './utils/cubeLogic';
import './assets/styles/global.css';

function App() {
  const [gameMode, setGameMode] = useState('3x3');
  const [board, setBoard] = useState(createEmptyBoard());
  const [cube, setCube] = useState(createEmptyCube());
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

  const handleCubeCellClick = (x, y, z) => {
    if (cube[x][y][z] || winner || isDraw) return;

    const newCube = makeCubeMove(cube, x, y, z, currentPlayer);
    if (!newCube) return;

    setCube(newCube);

    const winResult = checkCubeWinner(newCube);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      setShowConfetti(true);
      setCameraShake(true);
      setTimeout(() => setCameraShake(false), 1000);
    } else if (checkCubeDraw(newCube)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(getNextPlayer(currentPlayer));
    }
  };

  const handleRestart = () => {
    setBoard(createEmptyBoard());
    setCube(createEmptyCube());
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
    setShowConfetti(false);
    setCameraShake(false);
  };

  const handleModeChange = (mode) => {
    setGameMode(mode);
    handleRestart();
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
          
          <div className="mode-selector">
            <button
              className={`mode-button ${gameMode === '3x3' ? 'active' : ''}`}
              onClick={() => handleModeChange('3x3')}
            >
              3×3 Classic
            </button>
            <button
              className={`mode-button ${gameMode === '4x4x4' ? 'active' : ''}`}
              onClick={() => handleModeChange('4x4x4')}
            >
              4×4×4 Cube
            </button>
          </div>

          <Controls
            currentPlayer={currentPlayer}
            winner={winner}
            isDraw={isDraw}
            onRestart={handleRestart}
          />
          
          {gameMode === '3x3' ? (
            <Board
              board={board}
              onCellClick={handleCellClick}
              winningLine={winningLine}
              gameOver={winner !== null || isDraw}
            />
          ) : (
            <CubeFull3D
              cube={cube}
              onCellClick={handleCubeCellClick}
              winningLine={winningLine}
              gameOver={winner !== null || isDraw}
            />
          )}
        </div>
      </CameraEffects>
      <Confetti active={showConfetti} />
    </div>
  );
}

export default App;
