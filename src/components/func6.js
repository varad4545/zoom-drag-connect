import React, { useState, useEffect } from 'react';

const Func6 = () => {
    const [circle1Position, setCircle1Position] = useState({ x: 100, y: 100 });
    const [circle2Position, setCircle2Position] = useState({ x: 300, y: 300 });
    const [isDragging, setIsDragging] = useState(false);
    const [currentCircle, setCurrentCircle] = useState(null);
  
    useEffect(() => {
      const handleMouseMove = (e) => {
        if (isDragging && currentCircle) {
          if (currentCircle === 1) {
            setCircle1Position({ x: e.clientX, y: e.clientY });
          } else {
            setCircle2Position({ x: e.clientX, y: e.clientY });
          }
        }
      };
  
      const handleMouseUp = () => {
        setIsDragging(false);
        setCurrentCircle(null);
      };
  
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, currentCircle]);
  
    const handleCircleDrag = (e, circleNumber) => {
      setIsDragging(true);
      setCurrentCircle(circleNumber);
    };
  
    const getLineStyle = () => {
      const dx = circle2Position.x - circle1Position.x;
      const dy = circle2Position.y - circle1Position.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
      return {
        position: 'absolute',
        left: circle1Position.x,
        top: circle1Position.y,
        width: length,
        height: '2px',
        backgroundColor: 'black',
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
      };
    };
  
    return (
      <div style={{ position: 'relative', height: '100vh' }}>
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'red',
            position: 'absolute',
            left: circle1Position.x,
            top: circle1Position.y,
            cursor: 'move',
          }}
          onMouseDown={(e) => handleCircleDrag(e, 1)}
        />
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'blue',
            position: 'absolute',
            left: circle2Position.x,
            top: circle2Position.y,
            cursor: 'move',
          }}
          onMouseDown={(e) => handleCircleDrag(e, 2)}
        />
        <div style={getLineStyle()} />
      </div>
    );
};

export default Func6;