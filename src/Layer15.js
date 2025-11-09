import React from "react";
import { useNavigate } from "react-router-dom";
import layer15Image from "./assets/layer15.png";
import button15 from "./assets/15.png";

function Layer15() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/layer2");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={layer15Image}
        alt="Layer 15 Background"
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Adjusted Button Position */}
      <button
        onClick={handleNext}
        className="absolute flex items-center justify-center"
        style={{
          bottom: "30%",
          right: "47%",
          transform: "translate(50%, 50%)",
          cursor: "pointer",
        }}
      >
        <img
          src={button15}
          alt="Next Button"
          className="w-[35vmin] h-auto hover:scale-110 transition-transform duration-300"
          draggable={false}
        />
      </button>
    </div>
  );
}

export default Layer15;
