import { useEffect } from 'react';

export const useInertia = (rotation, setRotation, velocity, setVelocity) => {
  useEffect(() => {
    let animationFrameId;

    const applyInertia = () => {
      const friction = 0.95;
      const threshold = 0.01;

      setVelocity(prev => {
        const newVelocityX = Math.abs(prev.x) > threshold ? prev.x * friction : 0;
        const newVelocityY = Math.abs(prev.y) > threshold ? prev.y * friction : 0;
        
        if (newVelocityX !== 0 || newVelocityY !== 0) {
          setRotation(rot => ({
            x: rot.x + newVelocityX,
            y: rot.y + newVelocityY
          }));
        }

        return { x: newVelocityX, y: newVelocityY };
      });

      animationFrameId = requestAnimationFrame(applyInertia);
    };

    animationFrameId = requestAnimationFrame(applyInertia);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [rotation, setRotation, velocity, setVelocity]);
};
