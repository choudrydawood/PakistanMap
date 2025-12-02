import React from "react";
import { useNavigate } from "react-router-dom";
import img2 from "./assets/2.png";
import findoutButton from "./assets/findout.png";

const Second = () => {
  const navigate = useNavigate();

  return (
    <div className="relative inset-0 w-screen h-screen overflow-auto">
      <img
        src={img2}
        alt="Second Screen"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <button
        onClick={() => navigate("/third")}
        className="
          absolute bottom-[25%] left-1/2
          transform -translate-x-[60%]
          transition-transform hover:scale-110 active:scale-95
        "
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
