import React, { useState } from "react";
import Draggable from "react-draggable";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../Styles/Test2.css";

const SquareConnection2 = () => {
  const [sectionCount, setSectionCount] = useState(0);
  const [index, setIndex] = useState(null);

  const handleButtonClick = () => {
    setSectionCount(sectionCount + 1);
  };

  const handleCuurentSelected = (i) => {
    console.log("INS");
    setIndex(i);
  };

  const renderSections = () => {
    const sections = [];
    for (let i = 0; i < sectionCount; i++) {
      sections.push(
        <TransformWrapper
          options={{
            limitToBounds: false,
          }}
        >
          <TransformComponent>
            <Draggable key={i}>
              <div className="main-sqaure-container">
                <button onClick={() => handleCuurentSelected(i)}>+</button>
                <div className="inner-sqaure-container">
                  <div className="inner-most-sqaure-container">
                    <div className="yellow-sqaure-container"></div>
                  </div>
                </div>
              </div>
            </Draggable>
          </TransformComponent>
        </TransformWrapper>
      );
    }
    return sections;
  };

  return (
    <div className="main-container">
      <button onClick={handleButtonClick}>create squares</button>
      <p>{index}</p>
      <p></p>
      {renderSections()}
    </div>
  );
};

export default SquareConnection2;
