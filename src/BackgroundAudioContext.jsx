import React, { createContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import bgSound from "./assets/recordingoverall.mov";

export const BackgroundAudioContext = createContext();

export const BackgroundAudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio(bgSound));
  const location = useLocation();

  const excludedRoutes = ["/layer1", "/layer2"];

  // INITIALIZE (with user unlock)
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.6;
    audio.playbackRate = 0.85;

    const unlock = () => {
      if (!excludedRoutes.includes(location.pathname)) {
        audio.play().catch(() => {});
      }
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("click", unlock);
    window.addEventListener("touchstart", unlock);

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [location.pathname]);

  // FIXED ROUTE-BASED CONTROL
  useEffect(() => {
    const audio = audioRef.current;
    const isExcluded = excludedRoutes.includes(location.pathname);

    if (isExcluded) {
      audio.pause();     // <-- 🔥 KEY FIX: stop global bg audio in Layer1 & Layer2
      return;
    }

    audio.play().catch(() => {});
  }, [location.pathname]);

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
