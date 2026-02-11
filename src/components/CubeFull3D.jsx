import { useDragRotate } from '../hooks/useDragRotate';
import { useInertia } from '../hooks/useInertia';
import '../assets/styles/cubeFull.css';

export const CubeFull3D = ({ cube, onCellClick, winningLine, gameOver }) => {
  const { rotation, setRotation, velocity, setVelocity, handlers } = useDragRotate();
  useInertia(rotation, setRotation, velocity, setVelocity);

  const isWinningCell = (x, y, z) => {
    if (!winningLine) return false;
    return winningLine.some(([wx, wy, wz]) => wx === x && wy === y && wz === z);
  };

  return (
    <div className="cube-full-container">
      <div className="cube-full-scene" {...handlers}>
        <div 
          className="cube-full-wrapper"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          {cube.map((layer, layerIndex) => (
            <div 
              key={layerIndex}
              className="cube-layer"
              style={{
                transform: `translateZ(${(layerIndex - 1.5) * 100}px)`
              }}
            >
              {layer.map((row, rowIndex) => (
                <div key={rowIndex} className="cube-full-row">
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className={`cube-full-cell ${cell ? 'filled' : ''} ${
                        isWinningCell(layerIndex, rowIndex, colIndex) ? 'winning' : ''
                      } ${gameOver && !isWinningCell(layerIndex, rowIndex, colIndex) ? 'losing' : ''}`}
                      onClick={() => !cell && !gameOver && onCellClick(layerIndex, rowIndex, colIndex)}
                    >
                      {cell && (
                        <div className={`symbol symbol-${cell}`}>
                          {cell === 'X' ? (
                            <svg viewBox="0 0 100 100" className="symbol-svg">
                              <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="draw-line" />
                              <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="draw-line" style={{ animationDelay: '0.15s' }} />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 100 100" className="symbol-svg">
                              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="10" fill="none" className="draw-circle" />
                            </svg>
                          )}
                        </div>
                      )}
                      <div className="cell-layer-indicator">L{layerIndex + 1}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="cube-instructions">
        <div className="instruction-item">🖱️ Drag to rotate the cube</div>
        <div className="instruction-item">🎯 Click any cell to play</div>
        <div className="instruction-item">🎲 Get 4 in a row to win</div>
      </div>
    </div>
  );
};
