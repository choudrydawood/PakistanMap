import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "./assets/3.png";
import startButton from "./assets/start.png";

const First = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        fixed inset-0 w-screen h-screen
        overflow-hidden
        select-none
        touch-action-none
      "
      style={{ overscrollBehavior: "none" }}
      onTouchMove={(e) => e.preventDefault()}
      onScroll={(e) => e.preventDefault()}
    >
      {/* Fullscreen image - drag disabled */}
      <img
        src={mainImage}
        alt="Main"
        draggable="false"
        className="
          absolute inset-0 w-full h-full
          object-fill
          pointer-events-none
          select-none
        "
      />

      {/* Start button */}
      <button
        onClick={() => navigate("/second")}
        className="absolute bottom-[10%] right-[24%] transition-transform hover:scale-110 active:scale-95"
      >
        <img
          src={startButton}
          alt="Start"
          draggable="false"
          className="w-44 h-auto sm:w-52 md:w-60 object-contain select-none"
        />
      </button>
    </div>
  );
};

export default First;
