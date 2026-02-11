import { useEffect, useState } from 'react';

export const Confetti = ({ active }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'][
          Math.floor(Math.random() * 5)
        ],
        size: Math.random() * 10 + 5,
        speedX: (Math.random() - 0.5) * 2,
        speedY: Math.random() * 3 + 2,
      }));
      setParticles(newParticles);

      setTimeout(() => setParticles([]), 3000);
    }
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="confetti-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `rotate(${particle.rotation}deg)`,
            animation: `confettiFall 3s ease-out forwards`,
            animationDelay: `${Math.random() * 0.3}s`,
            '--speed-x': particle.speedX,
            '--speed-y': particle.speedY,
          }}
        />
      ))}
    </div>
  );
};
