


import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SquareConnection from "./components/func2";
import SquareConnection2 from "./components/func3";
import SquareConnection3 from "./components/func4zoom";
import Func5 from './components/func5';
import Func6 from "./components/func6";
import Fun7 from "./components/fun7";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SquareConnection2/>} />
          <Route path="/new" element={<SquareConnection />} />
          <Route path="/new2" element={<SquareConnection3 />} />
          <Route path="/new3" element={<Func5/>} />
          <Route path="/new4" element={<Func6/>} />
          <Route path="/new5" element={<Fun7/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

