import React from "react";
import { useNavigate } from "react-router-dom";
import lastScreen from "./assets/lastscreen.png";
import lastButton from "./assets/lastbutton.png";

const Last = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Fullscreen Background */}
      <img
        src={lastScreen}
        alt="Final Screen"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Go Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute bottom-28 left-1/2 transform -translate-x-1/2 transition-transform hover:scale-110 active:scale-95"
      >
        <img
          src={lastButton}
          alt="Go Home"
          className="w-52 h-auto sm:w-60 md:w-72 object-contain"
        />
      </button>
    </div>
  );
};

export default Last;
