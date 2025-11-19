import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import lastScreen from "./assets/lastscreen.png";
import lastButton from "./assets/lastbutton.png";
import celebrationSound from "./assets/soundcelebration.mp3";
import { BackgroundAudioContext } from "./BackgroundAudioContext";

const Last = () => {
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(celebrationSound));

  const { pauseForForeground } = useContext(BackgroundAudioContext);

  useEffect(() => {
    // Pause background audio until celebration sound ends
    pauseForForeground(audioRef.current);

    audioRef.current.currentTime = 0;
    audioRef.current.play();

    // Confetti
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 10 + Math.floor(Math.random() * 10),
        startVelocity: 40,
        spread: 360,
        ticks: 80,
        gravity: 0.7,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#ff0", "#0ff", "#f0f", "#0f0", "#f00", "#00f"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={lastScreen}
        alt="Final Screen"
        className="absolute inset-0 w-full h-full object-cover"
      />

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
