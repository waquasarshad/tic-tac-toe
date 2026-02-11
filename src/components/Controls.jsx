export const Controls = ({ currentPlayer, winner, isDraw, onRestart }) => {
  const getStatus = () => {
    if (winner) return `${winner} Wins!`;
    if (isDraw) return "It's a Draw!";
    return `Current Player: ${currentPlayer}`;
  };

  return (
    <div className="controls">
      <div className="status-panel">
        <h2 className="status">{getStatus()}</h2>
      </div>
      <button className="restart-button" onClick={onRestart}>
        Restart Game
      </button>
    </div>
  );
};
