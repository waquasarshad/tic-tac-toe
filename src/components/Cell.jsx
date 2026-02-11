import { useState } from 'react';
import '../assets/styles/animations.css';

export const Cell = ({ value, onClick, isWinningCell, isGameOver }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!value && !isGameOver) {
      onClick();
    }
  };

  return (
    <div
      className={`cell ${value ? 'filled' : ''} ${isWinningCell ? 'winning' : ''} ${isGameOver && !isWinningCell ? 'losing' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered && !value ? 'rotateY(10deg) rotateX(10deg)' : '',
      }}
    >
      {value && (
        <div className={`symbol symbol-${value}`}>
          {value === 'X' ? (
            <svg viewBox="0 0 100 100" className="symbol-svg">
              <line
                x1="20"
                y1="20"
                x2="80"
                y2="80"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className="draw-line"
              />
              <line
                x1="80"
                y1="20"
                x2="20"
                y2="80"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className="draw-line"
                style={{ animationDelay: '0.15s' }}
              />
            </svg>
          ) : (
            <svg viewBox="0 0 100 100" className="symbol-svg">
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="draw-circle"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};
