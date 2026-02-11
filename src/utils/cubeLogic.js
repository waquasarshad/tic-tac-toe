export const createEmptyCube = () => {
  return Array(4).fill(null).map(() => 
    Array(4).fill(null).map(() => 
      Array(4).fill(null)
    )
  );
};

export const makeCubeMove = (cube, x, y, z, player) => {
  if (cube[x][y][z] !== null) return null;
  const newCube = cube.map(layer => 
    layer.map(row => [...row])
  );
  newCube[x][y][z] = player;
  return newCube;
};

export const checkCubeWinner = (cube) => {
  const size = 4;
  
  // Check all possible 4-in-a-row combinations
  const checkLine = (positions) => {
    const values = positions.map(([x, y, z]) => cube[x][y][z]);
    if (values[0] && values.every(v => v === values[0])) {
      return { winner: values[0], line: positions };
    }
    return null;
  };

  // Rows (within each layer)
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const result = checkLine([[x, y, 0], [x, y, 1], [x, y, 2], [x, y, 3]]);
      if (result) return result;
    }
  }

  // Columns (within each layer)
  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      const result = checkLine([[x, 0, z], [x, 1, z], [x, 2, z], [x, 3, z]]);
      if (result) return result;
    }
  }

  // Vertical lines (through layers)
  for (let y = 0; y < size; y++) {
    for (let z = 0; z < size; z++) {
      const result = checkLine([[0, y, z], [1, y, z], [2, y, z], [3, y, z]]);
      if (result) return result;
    }
  }

  // Diagonals within layers
  for (let x = 0; x < size; x++) {
    const result1 = checkLine([[x, 0, 0], [x, 1, 1], [x, 2, 2], [x, 3, 3]]);
    if (result1) return result1;
    const result2 = checkLine([[x, 0, 3], [x, 1, 2], [x, 2, 1], [x, 3, 0]]);
    if (result2) return result2;
  }

  // Diagonals through layers (vertical planes)
  for (let y = 0; y < size; y++) {
    const result1 = checkLine([[0, y, 0], [1, y, 1], [2, y, 2], [3, y, 3]]);
    if (result1) return result1;
    const result2 = checkLine([[0, y, 3], [1, y, 2], [2, y, 1], [3, y, 0]]);
    if (result2) return result2;
  }

  for (let z = 0; z < size; z++) {
    const result1 = checkLine([[0, 0, z], [1, 1, z], [2, 2, z], [3, 3, z]]);
    if (result1) return result1;
    const result2 = checkLine([[0, 3, z], [1, 2, z], [2, 1, z], [3, 0, z]]);
    if (result2) return result2;
  }

  // 3D diagonals (corner to corner)
  const result1 = checkLine([[0, 0, 0], [1, 1, 1], [2, 2, 2], [3, 3, 3]]);
  if (result1) return result1;
  const result2 = checkLine([[0, 0, 3], [1, 1, 2], [2, 2, 1], [3, 3, 0]]);
  if (result2) return result2;
  const result3 = checkLine([[0, 3, 0], [1, 2, 1], [2, 1, 2], [3, 0, 3]]);
  if (result3) return result3;
  const result4 = checkLine([[0, 3, 3], [1, 2, 2], [2, 1, 1], [3, 0, 0]]);
  if (result4) return result4;

  return null;
};

export const checkCubeDraw = (cube) => {
  return cube.every(layer => 
    layer.every(row => 
      row.every(cell => cell !== null)
    )
  );
};
