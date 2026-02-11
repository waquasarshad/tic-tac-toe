export const createEmptyBoard = () => Array(9).fill(null);

export const getNextPlayer = (currentPlayer) => {
  return currentPlayer === 'X' ? 'O' : 'X';
};

export const makeMove = (board, index, player) => {
  if (board[index] !== null) return null;
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
};
