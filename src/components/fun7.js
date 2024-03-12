import React, { useState, useEffect, useRef } from 'react';
import '../Styles/Test2.css';

const Fun7 = () => {
  const [mainSquarePosition1, setMainSquarePosition1] = useState({ x: 0, y: 0 });
  const [mainSquarePosition2, setMainSquarePosition2] = useState({ x: 200, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentSquare, setCurrentSquare] = useState(null);
  const [zoom, setZoom] = useState(1);
  const yellowSquareContainerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        if (currentSquare === 1) {
          setMainSquarePosition1({ x: e.clientX - 50 * zoom, y: e.clientY - 50 * zoom });
        } else {
          setMainSquarePosition2({ x: e.clientX - 50 * zoom, y: e.clientY - 50 * zoom });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setCurrentSquare(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, currentSquare, zoom]);

  const handleMainSquareDrag = (e, squareNumber) => {
    setIsDragging(true);
    setCurrentSquare(squareNumber);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    if (squareNumber === 1) {
      setMainSquarePosition1({ x: rect.left - offsetX / zoom, y: rect.top - offsetY / zoom });
    } else {
      setMainSquarePosition2({ x: rect.left - offsetX / zoom, y: rect.top - offsetY / zoom });
    }
  };

  useEffect(() => {
    const updateYellowSquarePosition = () => {
      const yellowSquareContainer = yellowSquareContainerRef.current;
      if (yellowSquareContainer) {
        const yellowSquareRect = yellowSquareContainer.getBoundingClientRect();
        setYellowSquarePosition({
          x: yellowSquareRect.left + yellowSquareRect.width / 2,
          y: yellowSquareRect.top + yellowSquareRect.height / 2,
        });
      }
    };

    const throttledUpdateYellowSquarePosition = throttle(updateYellowSquarePosition, 16);
    window.addEventListener('resize', throttledUpdateYellowSquarePosition);
    window.addEventListener('mousemove', throttledUpdateYellowSquarePosition);

    return () => {
      window.removeEventListener('resize', throttledUpdateYellowSquarePosition);
      window.removeEventListener('mousemove', throttledUpdateYellowSquarePosition);
    };
  }, []);

  const [yellowSquarePosition, setYellowSquarePosition] = useState({ x: 0, y: 0 });

  const getLineStyle = () => {
    const dx = yellowSquarePosition.x - (mainSquarePosition1.x + 50);
    const dy = yellowSquarePosition.y - (mainSquarePosition1.y + 50);
    const length = Math.sqrt(dx * dx + dy * dy) / zoom;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    return {
      position: 'absolute',
      left: mainSquarePosition1.x + 50,
      top: mainSquarePosition1.y + 50,
      width: length,
      height: '2px',
      backgroundColor: 'black',
      transform: `rotate(${angle}deg) scale(${zoom})`,
      transformOrigin: '0 0',
    };
  };

  const handleZoomIn = () => {
    setZoom(zoom + 0.2);
  };

  const handleZoomOut = () => {
    if (zoom > 0.2) {
      setZoom(zoom - 0.2);
    }
  };

  return (
    <div className="main-container">
      <div
        className="main-sqaure-container"
        style={{
          position: 'absolute',
          left: mainSquarePosition1.x,
          top: mainSquarePosition1.y,
          cursor: 'move',
          transform: `scale(${zoom})`,
        }}
        onMouseDown={(e) => handleMainSquareDrag(e, 1)}
      >
        <div className="inner-sqaure-container">
          <div className="inner-most-sqaure-container"></div>
        </div>
      </div>
      <div
        className="main-sqaure-container"
        style={{
          position: 'absolute',
          left: mainSquarePosition2.x,
          top: mainSquarePosition2.y,
          cursor: 'move',
          transform: `scale(${zoom})`,
        }}
        onMouseDown={(e) => handleMainSquareDrag(e, 2)}
      >
        <div className="inner-sqaure-container">
          <div className="inner-most-sqaure-container" style={{ position: 'relative' }}>
            <div
              className="yellow-sqaure-container"
              style={{ position: 'absolute', right: 0, bottom: 0 }}
              ref={yellowSquareContainerRef}
            ></div>
          </div>
        </div>
      </div>
      <div style={getLineStyle()} />
      <button onClick={handleZoomIn}>Zoom In</button>
      <button onClick={handleZoomOut}>Zoom Out</button>
    </div>
  );
};

// Throttle function to limit the rate of function calls
function throttle(func, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall < limit) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

export default Fun7;