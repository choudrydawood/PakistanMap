import React, { createContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import bgSound from "./assets/recordingoverall.mov";

export const BackgroundAudioContext = createContext();

export const BackgroundAudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio(bgSound));
  const location = useLocation();

  // Screens where background sound should NOT play
  const excludedRoutes = ["/layer1", "/layer2"];

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.6;

    const playAudio = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", playAudio);
    };

    window.addEventListener("click", playAudio);

    return () => {
      window.removeEventListener("click", playAudio);
    };
  }, []);

  // 🔥 Control playback based on current route
  useEffect(() => {
    const audio = audioRef.current;
    const isExcluded = excludedRoutes.includes(location.pathname);

    if (isExcluded) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [location.pathname]);

  // Used to pause background audio temporarily when other sounds play
  const pauseForForeground = (foregroundAudio) => {
    const bg = audioRef.current;
    bg.pause();

    foregroundAudio.onended = () => {
      bg.play().catch(() => {});
    };
  };

  return (
    <BackgroundAudioContext.Provider value={{ audioRef, pauseForForeground }}>
      {children}
    </BackgroundAudioContext.Provider>
  );
};
