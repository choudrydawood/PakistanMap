import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "./assets/3.png";
import startButton from "./assets/start.png";

const First = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Fullscreen image */}
      <img
        src={mainImage}
        alt="Main"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Start button - moved further left and slightly higher */}
      <button
        onClick={() => navigate("/second")}
        className="absolute bottom-28 right-96 transition-transform hover:scale-110 active:scale-95"
      >
        <img
          src={startButton}
          alt="Start"
          className="w-44 h-auto sm:w-52 md:w-60 object-contain"
        />
      </button>
    </div>
  );
};

export default First;
