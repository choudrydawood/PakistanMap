import React from "react";
import { useNavigate } from "react-router-dom";
import img2 from "./assets/2.png"; // full-screen background image
import findoutButton from "./assets/findout.png"; // your button image

const Second = () => {
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
      {/* Fullscreen background image, completely fixed */}
      <img
        src={img2}
        alt="Second Screen"
        draggable="false"
        className="
          absolute inset-0 w-full h-full
          object-cover object-center
          pointer-events-none
          select-none
        "
      />

      {/* Center-bottom button */}
      <button
  onClick={() => navigate("/third")}
  className="
    absolute bottom-[25%] left-1/2
    transform -translate-x-[60%]
    transition-transform
    hover:scale-110 active:scale-95
  "
>
  <img
    src={findoutButton}
    alt="Find Out"
    draggable="false"
    className="w-44 h-auto sm:w-52 md:w-60 object-contain select-none"
  />
</button>

    </div>
  );
};

export default Second;
