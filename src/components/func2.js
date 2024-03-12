import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import '../Styles/Test.css';

const SquareConnection = () => {
  const [outerSquares, setOuterSquares] = useState([]);
  const [innerSquares, setInnerSquares] = useState([]);
  const [redSquares, setRedSquares] = useState([]);
  const outerSquareRefs = useRef([]);
  const [connectionType, setConnectionType] = useState('');
  const [arrowCoordinates, setArrowCoordinates] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });

  const handleAddOuterSquare = () => {
    const newId = outerSquares.length + 1;
    setOuterSquares(prevOuterSquares => [...prevOuterSquares, { id: newId }]);
  };

  const handleAddInnerSquareOnClick = (outerSquareId) => {
    const newInnerSquare = { id: innerSquares.length + 1, outerSquareId };
    setInnerSquares(prevInnerSquares => [...prevInnerSquares, newInnerSquare]);
  };

  const handleAddRedSquareOnClick = (innerSquareId) => {
    const newRedSquare = { id: innerSquareId }; // ID for red squares should be unique
    setRedSquares(prevRedSquares => [...prevRedSquares, newRedSquare]);

  };
  const handleDropdownChange = (event) => {
    setConnectionType(event.target.value);
  };
  const calculateArrowCoordinates = () => {
    if (redSquares.length >= 2) {
      const startSquare = redSquares[0];
      const endSquare = redSquares[1];
      const startSquareElement = document.getElementById(`red-square-${startSquare.id}`);
      const endSquareElement = document.getElementById(`red-square-${endSquare.id}`);
      if (startSquareElement && endSquareElement) {
        const containerRect = document.querySelector('.square-connection-container').getBoundingClientRect();
        const startRect = startSquareElement.getBoundingClientRect();
        const endRect = endSquareElement.getBoundingClientRect();
        const startX = startRect.left - containerRect.left + startRect.width / 2 + window.scrollX;
        const startY = startRect.top - containerRect.top + startRect.height / 2 + window.scrollY;
        const endX = endRect.left - containerRect.left + endRect.width / 2 + window.scrollX;
        const endY = endRect.top - containerRect.top + endRect.height / 2 + window.scrollY;
        setArrowCoordinates({ startX, startY, endX, endY });
      }
    }
  };
  
  
    const handleCreateArrow = () => {
      if (connectionType === 'red') {
        calculateArrowCoordinates();
      } else if (connectionType === 'green'|| connectionType === 'yellow') {
        const startSquare = redSquares.find(square => square.color === 'green' || square.color === 'yellow');
        const endSquare = redSquares.find(square => square.color === connectionType);
        if (startSquare && endSquare) {
          const startSquareElement = document.getElementById(`red-square-${startSquare.id}`);
          const endSquareElement = document.getElementById(`red-square-${endSquare.id}`);
          if (startSquareElement && endSquareElement) {
            const containerRect = document.querySelector('.square-connection-container').getBoundingClientRect();
            const startRect = startSquareElement.getBoundingClientRect();
            const endRect = endSquareElement.getBoundingClientRect();
            const startX = startRect.left - containerRect.left + startRect.width / 2 + window.scrollX;
            const startY = startRect.top - containerRect.top + startRect.height / 2 + window.scrollY;
            const endX = endRect.left - containerRect.left + endRect.width / 2 + window.scrollX;
            const endY = endRect.top - containerRect.top + endRect.height / 2 + window.scrollY;
            setArrowCoordinates({ startX, startY, endX, endY });
          }
        }
      
      } else if (connectionType === 'mixed') {
        console.log('Creating arrow from red square to yellow square...');
      }
    };
  

  return (
    <div className="square-connection-container">
      <div className="dropdown-container">
        <select value={connectionType} onChange={handleDropdownChange}>
          <option value="">Select Connection Type</option>
          <option value="red">Red X to Y</option>
          <option value="yellow">Yellow X to Y</option>
          <option value="mixed"> Green X to Yellow Y</option>
        </select>
        <button onClick={handleCreateArrow}>Create Arrow</button>
      </div>
      <div className="outer-squares">
        {outerSquares.map(outerSquare => {
          const ref = React.createRef();
          outerSquareRefs.current[outerSquare.id] = { id: outerSquare.id, ref };
          return (
            <div key={outerSquare.id} ref={ref} className="outer-square">
              <div className="yellow-square">
                <Draggable>
                  <div onClick={() => handleAddInnerSquareOnClick(outerSquare.id)}>+</div>
                </Draggable>
              </div>
              {innerSquares.map(innerSquare => {
                if (innerSquare.outerSquareId === outerSquare.id) {
                  return (
                    <div key={innerSquare.id} className="green-inner-square">
                      <div className="green-plus" onClick={() => handleAddRedSquareOnClick(innerSquare.id)}>+</div>
                      {redSquares.map(redSquare => {
                        if (redSquare.id === innerSquare.id) {
                          return <div key={redSquare.id} id={`red-square-${redSquare.id}`} className="red-square"></div>;
                        }
                        return null;
                      })}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          );
        })}
      </div>
      <svg className="arrow-svg">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#000" />
          </marker>
        </defs>
        <line x1={arrowCoordinates.startX} y1={arrowCoordinates.startY} x2={arrowCoordinates.endX} y2={arrowCoordinates.endY} style={{ stroke: "black", strokeWidth: 2, markerEnd: "url(#arrow)" }} />
      </svg>
      <button onClick={handleAddOuterSquare}>Add Outer Square</button>
    </div>
  );
};

export default SquareConnection;