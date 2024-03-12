import React from 'react';
import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import "./../Styles/App.css"

function Func1() {

  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [colorData, setColorData] = useState([])

  const handleZoomIn = (zoomIn) => {
    zoomIn();
  };

  const handleZoomOut = (zoomOut) => {
    zoomOut();
  };

  const handleClick = () => {
    setClicked(true);
  }

  const handleClick2 = () => {
    setClicked2(true);
  };

  const handlePlusClick = (color) => {
    console.log("colorDAt: ", colorData);
    setColorData(prevColorData => [...prevColorData, color]);
  }

  return (
    <div className="App">
      <div className="zoom-controls">
        <button onClick={() => handleZoomIn(window.zoomIn)}>Zoom In</button>
        <button onClick={() => handleZoomOut(window.zoomOut)}>Zoom Out</button>
      </div>
      <div className='square-container'>
      <TransformWrapper

        options={{
          limitToBounds: false
        }}
      >
        {({ zoomIn, zoomOut }) => (
          <React.Fragment>
            <TransformComponent>
            
                <div onClick={handleClick}style={{ border: clicked ? '2px solid black' : 'none', padding: '10px' }} className="square1" id="square1">
                  <p onClick={() => handlePlusClick("Blue")} className='button'>+</p>
                  <div className="square2" style={{ border: clicked2 ? '2px solid black' : 'none', padding: '10px' }}id="square2">
                  <p onClick={() => handlePlusClick("Green")} className='button'>+</p>
                    <div className="square3" id="square3">
                    {/* <p className='button'>+</p> */}
                      <div className="square4" id="square4">
                      {/* <p className='button'>+</p> */}
                        <div className="square5" id="square5">
                        {/* <p className='button'>+</p> */}
                          <div className="square6" id="square6">
                          {/* <p className='button'>+</p> */}
                            <div className="square7" id="square7">
                            {/* <p className='button'>+</p> */}
                              <div className="square8" id="square8">
                              {/* <p className='button'>+</p> */}
                              <div className="square9" id="square9">
                              {/* <p className='button'>+</p> */}
                              <div className="square10" id="square10">
                              {/* <p className='button'>+</p> */}
                              <div className="square11" id="square11">
                              </div>
                              </div>
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            
            </TransformComponent>
            {/* Assign zoomIn and zoomOut to window object */}
            {window.zoomIn = zoomIn}
            {window.zoomOut = zoomOut}
          </React.Fragment>
        )}
      </TransformWrapper>
      </div>
    </div>
  );
}

export default Func1;
