import { Cell } from './Cell';
import { useDragRotate } from '../hooks/useDragRotate';
import { useInertia } from '../hooks/useInertia';
import '../assets/styles/board.css';

export const Board = ({ board, onCellClick, winningLine, gameOver }) => {
  const { rotation, setRotation, velocity, setVelocity, handlers } = useDragRotate();
  useInertia(rotation, setRotation, velocity, setVelocity);

  const boardStyle = {
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
      gameOver && winningLine ? 'rotateZ(15deg)' : ''
    }`,
  };

  const getLightingStyle = () => {
    const lightIntensity = Math.cos((rotation.y * Math.PI) / 180) * 0.3 + 0.7;
    return {
      filter: `brightness(${lightIntensity})`,
    };
  };

  return (
    <div className="board-container" {...handlers}>
      <div className="board-wrapper" style={boardStyle}>
        <div className="board" style={getLightingStyle()}>
          {board.map((cell, index) => (
            <Cell
              key={index}
              value={cell}
              onClick={() => onCellClick(index)}
              isWinningCell={winningLine && winningLine.includes(index)}
              isGameOver={gameOver}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
