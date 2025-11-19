import React from "react";
import { useNavigate } from "react-router-dom";
import img2 from "./assets/2.png"; // full-screen background image
import findoutButton from "./assets/findout.png"; // your button image

const Second = () => {
  const navigate = useNavigate();

  return (
    // Removed bg-black as the image will now cover the entire screen
    <div className="relative w-screen h-screen overflow-hidden">
      
      {/* FIX: Reverted to 'object-cover' to eliminate side bars. 
          Added 'object-center' to ensure the image is perfectly centered, 
          minimizing the perceived cropping at the top and bottom.
      */}
      <img
        src={img2}
        alt="Second Screen"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Center-bottom button - Responsive positioning remains */}
      <button
        onClick={() => navigate("/third")}
        // bottom-40 replaced with bottom-[15%] for a responsive position
        className="absolute bottom-[15%] left-1/2 transform -translate-x-[60%] transition-transform hover:scale-110 active:scale-95"
      >
        <img
          src={findoutButton}
          alt="Find Out"
          className="w-44 h-auto sm:w-52 md:w-60 object-contain"
        />
      </button>
    </div>
  );
};

export default Second;