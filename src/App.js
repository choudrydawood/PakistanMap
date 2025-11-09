import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import First from "./first";
import Second from "./second";
import Third from "./third";
import Layer1 from "./Layer1";
import Layer15 from "./Layer15";
import Layer2 from "./Layer2";
import SecondLast from "./SecondLast";
import Last from "./Last";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/second" element={<Second />} />
        <Route path="/third" element={<Third />} />
        <Route path="/layer1" element={<Layer1 />} />
        <Route path="/layer15" element={<Layer15 />} />
        <Route path="/layer2" element={<Layer2 />} />
        <Route path="/secondlast" element={<SecondLast />} />
        <Route path="/last" element={<Last />} />
      </Routes>
    </Router>
  );
}

export default App;
