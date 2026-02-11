import { useDragRotate } from '../hooks/useDragRotate';
import { useInertia } from '../hooks/useInertia';
import '../assets/styles/cube.css';

export const Cube3D = ({ cube, onCellClick, winningLine, gameOver }) => {
  const { rotation, setRotation, velocity, setVelocity, handlers } = useDragRotate();
  useInertia(rotation, setRotation, velocity, setVelocity);

  const isWinningCell = (x, y, z) => {
    if (!winningLine) return false;
    return winningLine.some(([wx, wy, wz]) => wx === x && wy === y && wz === z);
  };

  return (
    <div className="cube-game-container">
      <div className="all-layers-container" {...handlers}>
        {cube.map((layer, layerIndex) => (
          <div key={layerIndex} className="single-layer">
            <div className="layer-title">Layer {layerIndex + 1}</div>
            <div 
              className="cube-board-wrapper"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
              }}
            >
              <div className="cube-board">
                {layer.map((row, y) => (
                  <div key={y} className="cube-row">
                    {row.map((cell, z) => (
                      <div
                        key={z}
                        className={`cube-cell ${cell ? 'filled' : ''} ${
                          isWinningCell(layerIndex, y, z) ? 'winning' : ''
                        } ${gameOver && !isWinningCell(layerIndex, y, z) ? 'losing' : ''}`}
                        onClick={() => !cell && !gameOver && onCellClick(layerIndex, y, z)}
                      >
                        {cell && (
                          <div className={`symbol symbol-${cell}`}>
                            {cell === 'X' ? (
                              <svg viewBox="0 0 100 100" className="symbol-svg">
                                <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="draw-line" />
                                <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="draw-line" style={{ animationDelay: '0.15s' }} />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 100 100" className="symbol-svg">
                                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="8" fill="none" className="draw-circle" />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cube-hint">
        🖱️ Drag to rotate all layers • 🎯 Click any cell to play • 🎲 Get 4 in a row to win
      </div>
    </div>
  );
};
