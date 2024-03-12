// ArrowConnector.js
import React, { useState, useEffect, useRef } from 'react';
import '.././Styles/Test3.css';

const ArrowConnector = () => {
  const [marginInput, setMarginInput] = useState(0);
  const [position, setPosition] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setMarginInput(value);
  };

  useEffect(() => {
    const circle1 = circle1Ref.current;
    const circle2 = circle2Ref.current;

    if (circle1 && circle2) {
      const rect1 = circle1.getBoundingClientRect();
      const rect2 = circle2.getBoundingClientRect();

      const x1 = rect1.left + rect1.width / 2;
      const y1 = rect1.top + rect1.height / 2;
      const x2 = rect2.left + rect2.width / 2;
      const y2 = rect2.top + rect2.height / 2;

      setPosition({ x1, y1, x2, y2 });
    }
  }, [marginInput]);

  useEffect(() => {
    console.log("PSOTION: ", position);
  }, [position]);



  return (
    <div className="connector">
      <div className="circle" ref={circle1Ref}>
        Div 1
      </div>

      <div
        className="circle"
        ref={circle2Ref}
        style={{ marginLeft: `${marginInput}%` }}
      >
        Div 2
      </div>
      <input
        type="number"
        value={marginInput}
        onChange={handleInputChange}
        placeholder="Enter margin % for Div 2"
      />
{/* 
<svg width="10%" height="2%" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="40" y2="0" stroke="blue" strokeWidth="2" />
      </svg> */}

  
    </div>
  );
}

export default ArrowConnector;
