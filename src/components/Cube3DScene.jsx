import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';

const CubeCell = ({ position, value, onClick, isWinning, isLosing }) => {
  const [hovered, setHovered] = useState(false);
  
  const getColor = () => {
    if (isWinning) return '#667eea';
    if (value === 'X') return '#ff6b6b';
    if (value === 'O') return '#4ecdc4';
    return hovered ? '#555555' : '#333333';
  };

  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered && !value ? 1.1 : 1}
    >
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial
        color={getColor()}
        transparent
        opacity={value ? 0.9 : (hovered ? 0.4 : 0.3)}
        emissive={isWinning ? '#667eea' : '#000000'}
        emissiveIntensity={isWinning ? 0.5 : 0}
      />
      {value && (
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={value === 'X' ? '#ff6b6b' : '#4ecdc4'}
            emissive={value === 'X' ? '#ff6b6b' : '#4ecdc4'}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </mesh>
  );
};

const CubeBoard3D = ({ cube, onCellClick, winningLine, gameOver }) => {
  const size = 1;
  const gap = 0.2;
  const spacing = size + gap;

  const isWinningCell = (x, y, z) => {
    if (!winningLine) return false;
    return winningLine.some(([wx, wy, wz]) => wx === x && wy === y && wz === z);
  };

  const cubes = [];
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      for (let z = 0; z < 4; z++) {
        cubes.push(
          <CubeCell
            key={`${x}-${y}-${z}`}
            position={[
              (x - 1.5) * spacing,
              (y - 1.5) * spacing,
              (z - 1.5) * spacing
            ]}
            value={cube[x][y][z]}
            onClick={() => !cube[x][y][z] && !gameOver && onCellClick(x, y, z)}
            isWinning={isWinningCell(x, y, z)}
            isLosing={gameOver && !isWinningCell(x, y, z)}
          />
        );
      }
    }
  }

  return <group>{cubes}</group>;
};

export const Cube3DScene = ({ cube, onCellClick, winningLine, gameOver }) => {
  return (
    <div style={{ width: '100%', height: '600px', maxWidth: '800px', margin: '0 auto' }}>
      <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <CubeBoard3D
          cube={cube}
          onCellClick={onCellClick}
          winningLine={winningLine}
          gameOver={gameOver}
        />
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <div style={{
        marginTop: '1rem',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.9rem'
      }}>
        <div>🖱️ Drag to rotate • 🎯 Click any cube to play</div>
        <div style={{ marginTop: '0.5rem' }}>
          <span style={{ color: '#ff6b6b' }}>● X</span> • <span style={{ color: '#4ecdc4' }}>● O</span>
        </div>
      </div>
    </div>
  );
};
