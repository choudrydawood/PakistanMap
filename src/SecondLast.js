import React from "react";
import { useNavigate } from "react-router-dom";
import secondLastImage from "./assets/secondlastscreen.png";
import buttonImage from "./assets/secondlastbutton.png";

const SecondLast = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/last");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={secondLastImage}
        alt="Second Last Screen"
        className="absolute inset-0 w-full h-full object-fill"
      />

      <button
        onClick={handleNext}
        className="absolute left-1/2 bottom-[19%] transform -translate-x-1/2 hover:scale-110 transition-transform duration-300"
      >
        <img
          src={buttonImage}
          alt="Celebrate Button"
          className="w-[34vmin] sm:w-[36vmin] md:w-[38vmin] h-auto"
        />
      </button>
    </div>
  );
};

export default SecondLast;
