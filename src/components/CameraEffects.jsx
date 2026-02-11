import { useEffect, useState } from 'react';

export const CameraEffects = ({ shake, children }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shake) {
      let frame = 0;
      const shakeInterval = setInterval(() => {
        if (frame < 20) {
          setOffset({
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
          });
          frame++;
        } else {
          setOffset({ x: 0, y: 0 });
          clearInterval(shakeInterval);
        }
      }, 50);

      return () => clearInterval(shakeInterval);
    }
  }, [shake]);

  return (
    <div
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: shake ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {children}
    </div>
  );
};
