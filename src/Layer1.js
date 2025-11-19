import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapImage from "./assets/mm.png";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import logo1g from "./assets/logo1g.png";
import logo2g from "./assets/logo2g.png";
import logo3g from "./assets/logo3g.png";
import n1 from "./assets/n1.png";
import n2 from "./assets/n2.png";
import n3 from "./assets/n3.png";
import n4 from "./assets/n4.png";
import n5 from "./assets/n5.png";
import a1 from "./assets/a1.png";
import a2 from "./assets/a2.png";
import a3 from "./assets/a3.png";
import a4 from "./assets/a4.png";
import a5 from "./assets/a5.png";
import c1 from "./assets/c1.png";
import c2 from "./assets/c2.png";
import c3 from "./assets/c3.png";
import c4 from "./assets/c4.png";
import c5 from "./assets/c5.png";
import c6 from "./assets/c6.png";
import c7 from "./assets/c7.png";
import c8 from "./assets/c8.png";
import c9 from "./assets/c9.png";
import c10 from "./assets/c10.png";
import c11 from "./assets/c11.png";

// ⭐ star images
import star1 from "./assets/star1.png";
import star2 from "./assets/star2.png";
import star3 from "./assets/star3.png";
import star4 from "./assets/star4.png";
import star5 from "./assets/star5.png";
import star6 from "./assets/star6.png";
import star7 from "./assets/star7.png";
import star8 from "./assets/star8.png";
import star9 from "./assets/star9.png";
import star10 from "./assets/star10.png";

// 🔊 Popup sound
import popupSound from "./assets/popup33.mp3";
import starSoundFile from "./assets/starSound.mp3"; // replace with your actual sound file
import balochistanSong from "./assets/balsong.mov";
import punjabSong from "./assets/punsong.mov";
import kpkSong from "./assets/kpksong.mov";

import "./App.css";

// 🎉 Confetti Animation (No changes)
const Confetti = () => {
  const pieces = Array.from({ length: 80 });
  return (
    <div className="confetti-wrapper">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        const size = 6 + Math.random() * 8;
        const duration = 3 + Math.random() * 2;
        const rotate = Math.random() * 360;
        return (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              backgroundColor: color,
              width: size,
              height: size * 0.6,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

function Layer1() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const [visited, setVisited] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isExploring, setIsExploring] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeStar, setActiveStar] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const mapRef = useRef(null);

  // 🔊 Audio ref
  const audioRef = useRef(new Audio(popupSound));
const starAudioRef = useRef(new Audio(starSoundFile));
const balochistanAudio = useRef(new Audio(balochistanSong));
const punjabAudio = useRef(new Audio(punjabSong));
const kpkAudio = useRef(new Audio(kpkSong));

  const starAssignments = {
    2: star1,  
    4: star2,
    7: star3,
    9: star4,
    13: star5,
    16: star6,
    17: star7,
    19: star8,
    21: star9,
    22: star10
  };

  useEffect(() => {
    if (buttons.length > 0 && visited.length === buttons.length) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        navigate("/layer15");
      }, 1000);
    }
  }, [visited]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
const playRegionUnlockSound = (region) => {
  let audio;

  if (region === "balochistan") audio = balochistanAudio.current;
  if (region === "punjab") audio = punjabAudio.current;
  if (region === "kpk") audio = kpkAudio.current;

  if (!audio) return;

  audio.currentTime = 0;
  audio.volume = 1;
  audio.play();

  // stop after confetti duration
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 5000); // confetti = 5 seconds
};

  const [buttons, setButtons] = useState([
    { id: 1, x: 0.45, y: 0.68, logo: logo3, logoGray: logo3g, popup: n1, text: "Karachi", region: "sindh", locked: false },
    { id: 2, x: 0.45, y: 0.77, logo: logo2, logoGray: logo2g, popup: c5, text: "Hyderabad", region: "sindh", locked: false },
    { id: 3, x: 0.49, y: 0.86, logo: logo3, logoGray: logo3g, popup: n5, text: "Sukkur", region: "sindh", locked: false },
    { id: 4, x: 0.44, y: 0.95, logo: logo1, logoGray: logo1g, popup: a3, text: "Larkana", region: "sindh", locked: false },
    { id: 5, x: 0.41, y: 0.87, logo: logo2, logoGray: logo2g, popup: c1, text: "Nawabshah", region: "sindh", locked: false },

    { id: 6, x: 0.33, y: 0.82, logo: logo1, logoGray: logo1g, popup: a4, text: "Quetta", region: "balochistan", locked: true },
    { id: 7, x: 0.24, y: 0.62, logo: logo2, logoGray: logo2g, popup: c4, text: "Gwadar", region: "balochistan", locked: true },
    { id: 8, x: 0.27, y: 0.72, logo: logo3, logoGray: logo3g, popup: n4, text: "Turbat", region: "balochistan", locked: true },
    { id: 9, x: 0.36, y: 0.59, logo: logo2, logoGray: logo2g, popup: c6, text: "Khuzdar", region: "balochistan", locked: true },
    { id: 10, x: 0.22, y: 0.86, logo: logo2, logoGray: logo2g, popup: c3, text: "Zhob", region: "balochistan", locked: true },
    { id: 11, x: 0.36, y: 0.70, logo: logo3, logoGray: logo3g, popup: n3, text: "Sibi", region: "balochistan", locked: true },
    { id: 12, x: 0.43, y: 0.52, logo: logo1, logoGray: logo1g, popup: a4, text: "Bolan", region: "balochistan", locked: true },

    { id: 13, x: 0.53, y: 0.65, logo: logo3, logoGray: logo3g, popup: n2, text: "Lahore", region: "punjab", locked: true },
    { id: 14, x: 0.59, y: 0.55, logo: logo1, logoGray: logo1g, popup: a5, text: "Faisalabad", region: "punjab", locked: true },
    { id: 15, x: 0.55, y: 0.47, logo: logo2, logoGray: logo2g, popup: c2, text: "Rawalpindi", region: "punjab", locked: true },
    { id: 16, x: 0.51, y: 0.55, logo: logo2, logoGray: logo2g, popup: c11, text: "Multan", region: "punjab", locked: true },
    { id: 17, x: 0.60, y: 0.35, logo: logo1, logoGray: logo1g, popup: a1, text: "Sialkot", region: "punjab", locked: true },
    { id: 18, x: 0.65, y: 0.45, logo: logo1, logoGray: logo1g, popup: a2, text: "Gujranwala", region: "punjab", locked: true },

    { id: 19, x: 0.56, y: 0.17, logo: logo2, logoGray: logo2g, popup: c9, text: "Peshawar", region: "kpk", locked: true },
    { id: 20, x: 0.57, y: 0.07, logo: logo2, logoGray: logo2g, popup: c10, text: "Mardan", region: "kpk", locked: true },
    { id: 21, x: 0.63, y: 0.18, logo: logo2, logoGray: logo2g, popup: c8, text: "Abbottabad", region: "kpk", locked: true },
    { id: 22, x: 0.54, y: 0.28, logo: logo2, logoGray: logo2g, popup: c7, text: "Swat", region: "kpk", locked: true },
  ]);

  // 🖱️ Button click (Add sound)
  const handleClick = (id) => {
    const selected = buttons.find((b) => b.id === id);
    if (selected.locked) return;

    // Play sound
    audioRef.current.currentTime = 0;
    audioRef.current.play();

    setActiveButton(id);

    if (!visited.includes(id)) {
      const newVisited = [...visited, id];
      setVisited(newVisited);

      const regionsOrder = ["sindh", "balochistan", "punjab", "kpk"];
      const currentRegion = selected.region;
      const currentButtons = buttons.filter((b) => b.region === currentRegion);

     if (currentButtons.every((b) => newVisited.includes(b.id))) {
  const currentIndex = regionsOrder.indexOf(currentRegion);
  const nextRegion = regionsOrder[currentIndex + 1];

  // 🔓 Unlock next region
  if (nextRegion) {
    setButtons((prev) =>
      prev.map((b) => (b.region === nextRegion ? { ...b, locked: false } : b))
    );
  }

  // 🎉 Show confetti
  setShowConfetti(true);

  // 🔊 Play region unlock music
  playRegionUnlockSound(nextRegion);

  // stop confetti after 5 sec
  setTimeout(() => setShowConfetti(false), 5000);
}

    }
  };

  // 🔒 Close popup
  const handleClose = () => {
  if (starAssignments[activeButton]) {
    setActiveStar(activeButton);

    // Play star/affirmation sound
    starAudioRef.current.currentTime = 0;
    starAudioRef.current.play();

    setTimeout(() => setActiveStar(null), 2000);
  }
  setActiveButton(null);
};


  // 🖐️ Drag logic
  const startDrag = (x, y) => {
    setIsDragging(true);
    setLastPos({ x, y });
    if (mapRef.current) mapRef.current.style.cursor = "grabbing";
  };
  const moveDrag = (x, y) => {
    if (!isDragging) return;
    const dx = x - lastPos.x;
    const dy = y - lastPos.y;
    setLastPos({ x, y });
    setPosition((p) => ({ x: p.x + dx, y: p.y + dy }));
  };
  const endDrag = () => {
    setIsDragging(false);
    if (mapRef.current) mapRef.current.style.cursor = "grab";
  };
  const handleMouseDown = (e) => startDrag(e.clientX, e.clientY);
  const handleMouseMove = (e) => moveDrag(e.clientX, e.clientY);
  const handleMouseUp = () => endDrag();
  const handleTouchStart = (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY);
  const handleTouchMove = (e) => {
    e.preventDefault();
    moveDrag(e.touches[0].clientX, e.touches[0].clientY);
  };
  const handleTouchEnd = () => endDrag();

  // 🚀 Initial zoom
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExploring(true);
      const screenFactor = Math.min(windowSize.width, windowSize.height);
      let baseZoom = screenFactor > 1200 ? 4 : screenFactor > 600 ? 8.0 : 4;
      if (screenFactor <= 600) baseZoom = 6.5;
      setScale(baseZoom);

      const mapW = mapRef.current?.clientWidth || 1000;
      const mapH = mapRef.current?.clientHeight || 600;
      const targetX = 0.48;
      const targetY = screenFactor <= 600 ? 0.8 : 0.85;
      setPosition({
        x: -mapW * (targetX - 0.5) * baseZoom,
        y: -mapH * (targetY - 0.5) * baseZoom,
      });
    }, 800);
    return () => clearTimeout(timer);
  }, [windowSize]);

  const logoSize = windowSize.width < 600 ? "28vmin" : "18vmin";

  return (
    <div
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#643118" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {showConfetti && <Confetti />}
      <div
        ref={mapRef}
        className="transition-transform duration-[1000ms] ease-in-out relative flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          cursor: "grab",
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "center center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="relative" style={{ width: "min(100vw, 177.78vh)", height: "min(56.25vw, 100vh)" }}>
          <img src={mapImage} alt="Pakistan Map" className="select-none object-contain w-full h-full" draggable={false} />
          {isExploring &&
            buttons.map((btn) => (
              <div
                key={btn.id}
                className="absolute"
                style={{
                  top: `${btn.y * 100}%`,
                  left: `${btn.x * 100}%`,
                  transform: `translate(-50%, -50%) scale(${1.5 / scale})`,
                }}
              >
                {activeButton === btn.id ? (
                  <div className="relative transition-all duration-300 inline-block">
                    <img src={btn.popup} alt={`popup-${btn.id}`} className="block max-w-[70vmin] max-h-[70vmin] w-auto h-auto" draggable={false} />
                    <button
                      onClick={handleClose}
                      className="absolute -top-3 -right-3 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => !btn.locked && handleClick(btn.id)}
                    className={`cursor-pointer transition-transform duration-300 ${
                      btn.locked ? "opacity-50 grayscale cursor-not-allowed" : "hover:scale-110"
                    }`}
                  >
                    <img
                      src={visited.includes(btn.id) ? btn.logo : btn.logoGray}
                      alt={`button-${btn.id}`}
                      style={{ 
                        width: visited.includes(btn.id) 
                          ? (windowSize.width < 600 ? "24vmin" : "14vmin")
                          : logoSize,
                        height: visited.includes(btn.id) 
                          ? (windowSize.width < 600 ? "24vmin" : "14vmin")
                          : logoSize,
                      }}
                      className="rounded-full object-contain shadow-xl"
                    />
                  </div>
                )}
                {activeStar === btn.id && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                      top: "-16vmin",
                      transform: `scale(${28 / scale})`,
                      transformOrigin: "center",
                    }}
                  >
                    <img
                      src={starAssignments[btn.id]}
                      alt="star"
                      className="animate-popStar"
                      style={{ width: "300vmin", height: "auto", pointerEvents: "none" }}
                      draggable={false}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Layer1;
