import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "./assets/3.png";
import startButton from "./assets/start.png";

const First = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      
      {/* FINAL FIX: Using 'object-fill'. 
          This stretches the image to cover 100% of the screen width and 100% 
          of the screen height, eliminating all black bars and empty space, 
          but resulting in image distortion.
      */}
      <img
        src={mainImage}
        alt="Main Map"
        className="absolute inset-0 w-full h-full object-fill"
      />

      {/* Start button - Keeping the responsive percentage position */}
      <button
        onClick={() => navigate("/second")}
        // Position: bottom-[10%] right-[22%]
        className="absolute bottom-[10%] right-[24%] transition-transform hover:scale-110 active:scale-95"
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