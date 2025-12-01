import React from "react";
import { useNavigate } from "react-router-dom";
import img3 from "./assets/lolll.png";
import exploreButton from "./assets/explore.png";
import "./App.css";

const Third = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none">
      <img
        src={img3}
        alt="Third Screen"
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
        draggable="false"
      />

      <button
        onClick={() => navigate("/layer1")}
        className="absolute left-[76%] top-[65%] transform -translate-y-1/2 transition-transform hover:scale-110 active:scale-95"
      >
        <img
          src={exploreButton}
          alt="Explore"
          className="h-auto max-w-[28vh] md:max-w-[20vw] object-contain select-none"
          draggable="false"
        />
      </button>
    </div>
  );
};

export default Third;
