import React from "react";
import { useNavigate } from "react-router-dom";
import img3 from "./assets/1.png";          // full-screen background image
import exploreButton from "./assets/explore.png"; // your explore button image

const Third = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Fullscreen image */}
      <img
        src={img3}
        alt="Third Screen"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Explore button - moved slightly more right and down */}
      <button
        onClick={() => navigate("/layer1")}
        className="absolute left-[76%] top-[65%] transform -translate-y-1/2 transition-transform hover:scale-110 active:scale-95"
      >
        <img
          src={exploreButton}
          alt="Explore"
          className="w-48 h-auto sm:w-56 md:w-64 object-contain"
        />
      </button>
    </div>
  );
};

export default Third;
