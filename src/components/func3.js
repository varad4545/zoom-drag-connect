import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../Styles/Test2.css';

const SquareConnection2 = () => {
  const [sectionCount, setSectionCount] = useState(0);

  const handleButtonClick = () => {
    setSectionCount(sectionCount + 1);
  };

  const renderSections = () => {
    const sections = [];
    for (let i = 0; i < sectionCount; i++) {
      sections.push(
        <Draggable key={i}>
          <div className='main-sqaure-container'>
            <div className='inner-sqaure-container'>
               <div className='inner-most-sqaure-container'> 
                    <div className='yellow-sqaure-container'>     
                    </div>    
               </div>
            </div>
          </div>
        </Draggable>
      );
    }
    return sections;
  };

  return (
    <div className="main-container">
        <button onClick={handleButtonClick}>create squares</button>
        <svg className="arrow" width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="strokeWidth">
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>
        <line x1="400" y1="400" x2="200" y2="200" style={{ stroke: 'black', strokeWidth: 2, markerEnd: 'url(#arrowhead)' }} />
      </svg>
        {renderSections()}
    </div>
  );
};

export default SquareConnection2;
