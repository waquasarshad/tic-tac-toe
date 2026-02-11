import { useState, useRef, useCallback } from 'react';

export const useDragRotate = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    lastPosition.current = { x: e.clientX, y: e.clientY };
    lastTime.current = Date.now();
    setVelocity({ x: 0, y: 0 });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - lastPosition.current.x;
    const deltaY = e.clientY - lastPosition.current.y;
    const deltaTime = Date.now() - lastTime.current;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    if (deltaTime > 0) {
      setVelocity({
        x: -deltaY / deltaTime * 10,
        y: deltaX / deltaTime * 10
      });
    }

    lastPosition.current = { x: e.clientX, y: e.clientY };
    lastTime.current = Date.now();
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    isDragging.current = true;
    lastPosition.current = { x: touch.clientX, y: touch.clientY };
    lastTime.current = Date.now();
    setVelocity({ x: 0, y: 0 });
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastPosition.current.x;
    const deltaY = touch.clientY - lastPosition.current.y;
    const deltaTime = Date.now() - lastTime.current;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    if (deltaTime > 0) {
      setVelocity({
        x: -deltaY / deltaTime * 10,
        y: deltaX / deltaTime * 10
      });
    }

    lastPosition.current = { x: touch.clientX, y: touch.clientY };
    lastTime.current = Date.now();
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return {
    rotation,
    setRotation,
    velocity,
    setVelocity,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
};
