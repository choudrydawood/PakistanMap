import React from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import secondLastImage from "./assets/secondlastscreen.png";
import buttonImage from "./assets/secondlastbutton.png";

const SecondLast = () => {
  const navigate = useNavigate();

  // ✨ Fancy built-in celebration sound (melody + sparkle)
  const playCelebrationSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const playTone = (freq, start, duration, type = "sine", volume = 0.1) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + start);

      gain.gain.setValueAtTime(0, audioCtx.currentTime + start);
      gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + start + 0.02);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + start + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + start);
      osc.stop(audioCtx.currentTime + start + duration);
    };

    // 🎵 Cheerful melody (C major)
    const notes = [
      [523, 0, 0.25],   // C5
      [659, 0.25, 0.25], // E5
      [784, 0.5, 0.3],   // G5
      [880, 0.8, 0.25],  // A5
      [1047, 1.0, 0.35], // C6
    ];

    // Add main melody
    notes.forEach(([f, s, d]) => playTone(f, s, d, "triangle", 0.15));

    // Add sparkly overlay ✨
    for (let i = 0; i < 15; i++) {
      const freq = 1200 + Math.random() * 1800;
      const time = 0.2 + Math.random() * 1;
      playTone(freq, time, 0.1, "sine", 0.05);
    }
  };

  const handleCelebrate = () => {
    // 🎉 Confetti burst
    const duration = 1500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        startVelocity: 40,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#ff0", "#0ff", "#f0f", "#0f0", "#f00", "#00f"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // 🔊 Play upgraded chime
    playCelebrationSound();

    // ⏳ Navigate to final screen
    setTimeout(() => {
      navigate("/last");
    }, 2700);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Fullscreen background */}
      <img
        src={secondLastImage}
        alt="Second Last Screen"
        className="w-full h-full object-cover"
      />

      {/* 🎊 Celebration button - centered & larger */}
      <button
        onClick={handleCelebrate}
        className="absolute left-1/2 bottom-[18%] transform -translate-x-1/2 hover:scale-110 transition-transform duration-300"
      >
        <img
          src={buttonImage}
          alt="Celebrate Button"
          className="w-[28vmin] sm:w-[30vmin] md:w-[32vmin] h-auto"
        />
      </button>
    </div>
  );
};

export default SecondLast;
