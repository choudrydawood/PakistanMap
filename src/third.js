import React from "react";
import { useNavigate } from "react-router-dom";
import img3 from "./assets/lolll.png";          // full-screen background image
import exploreButton from "./assets/explore.png"; // your explore button image

const Third = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      
      {/* FINAL SOLUTION: Using 'object-fill' to stretch the image to cover 
          all four sides, eliminating black bars and cropping. 
      */}
      <img
        src={img3}
        alt="Third Screen"
        className="absolute inset-0 w-full h-full object-fill"
      />

      {/* Explore button - Button size has been increased */}
      <button
        onClick={() => navigate("/layer1")}
        className="absolute left-[76%] top-[65%] transform -translate-y-1/2 transition-transform hover:scale-110 active:scale-95"
      >
        <img
          src={exploreButton}
          alt="Explore"
          // FIX: Increased button size from [15vh]/[10vw] to [20vh]/[15vw]
          className="h-auto max-w-[28vh] md:max-w-[20vw] object-contain"
        />
      </button>
    </div>
  );
};

export default Third;