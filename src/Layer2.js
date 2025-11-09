import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapImage from "./assets/finalmap.png";

// Province logos
import sindh from "./assets/sindh.png";
import sindhG from "./assets/sindhG.png";
import punjab from "./assets/punjab.png";
import punjabG from "./assets/punjabG.png";
import bal from "./assets/bal.png";
import balG from "./assets/balG.png";
import kpk from "./assets/kpk.png";
import kpkG from "./assets/kpkG.png";

// City popups
import sindh1 from "./assets/sindh1.png";
import sindh2 from "./assets/sindh2.png";
import sindh3 from "./assets/sindh3.png";
import sindh4 from "./assets/sindh4.png";
import bal1 from "./assets/bl1.png";
import bal2 from "./assets/bl2.png";
import bal3 from "./assets/bl3.png";
import bal4 from "./assets/bl4.png";
import pun1 from "./assets/pun1.png";
import pun2 from "./assets/pun2.png";
import pun3 from "./assets/pun3.png";
import pun4 from "./assets/pun4.png";
import pk1 from "./assets/pk1.png";
import pk2 from "./assets/pk2.png";
import pk3 from "./assets/pk3.png";
import pk4 from "./assets/pk4.png";

// DYK assets
import didu from "./assets/didu.png";
import sindhdyk from "./assets/sindhdyk.png";
import baldyk from "./assets/baldyk.png";
import pundyk from "./assets/pundyk.png";
import kpkdyk from "./assets/kpkdyk.png";

import "./App.css";

// 🎉 Confetti Animation
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

function Layer2() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const [visited, setVisited] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isExploring, setIsExploring] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [voices, setVoices] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [phase, setPhase] = useState("regions");
  const [currentRegion, setCurrentRegion] = useState("sindh");
  const [dykImage, setDykImage] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const mapRef = useRef(null);

  // 🧭 City Buttons
  const [buttons, setButtons] = useState([
    // Sindh
    { id: 1, x: 0.45, y: 0.7, logo: sindh, logoGray: sindhG, popup: sindh1, text: "Karachi", region: "sindh", locked: false },
    { id: 2, x: 0.47, y: 0.8, logo: sindh, logoGray: sindhG, popup: sindh2, text: "Hyderabad", region: "sindh", locked: false },
    { id: 3, x: 0.49, y: 0.86, logo: sindh, logoGray: sindhG, popup: sindh3, text: "Sukkur", region: "sindh", locked: false },
    { id: 4, x: 0.52, y: 0.95, logo: sindh, logoGray: sindhG, popup: sindh4, text: "Larkana", region: "sindh", locked: false },

    // Balochistan
    { id: 6, x: 0.28, y: 0.75, logo: bal, logoGray: balG, popup: bal1, text: "Quetta", region: "balochistan", locked: true },
    { id: 7, x: 0.26, y: 0.62, logo: bal, logoGray: balG, popup: bal2, text: "Gwadar", region: "balochistan", locked: true },
    { id: 8, x: 0.34, y: 0.7, logo: bal, logoGray: balG, popup: bal3, text: "Turbat", region: "balochistan", locked: true },
    { id: 9, x: 0.36, y: 0.61, logo: bal, logoGray: balG, popup: bal4, text: "Khuzdar", region: "balochistan", locked: true },

    // Punjab
    { id: 13, x: 0.53, y: 0.65, logo: punjab, logoGray: punjabG, popup: pun1, text: "Lahore", region: "punjab", locked: true },
    { id: 14, x: 0.59, y: 0.55, logo: punjab, logoGray: punjabG, popup: pun2, text: "Faisalabad", region: "punjab", locked: true },
    { id: 15, x: 0.55, y: 0.47, logo: punjab, logoGray: punjabG, popup: pun3, text: "Rawalpindi", region: "punjab", locked: true },
    { id: 16, x: 0.52, y: 0.57, logo: punjab, logoGray: punjabG, popup: pun4, text: "Multan", region: "punjab", locked: true },

    // KPK
    { id: 19, x: 0.58, y: 0.17, logo: kpk, logoGray: kpkG, popup: pk1, text: "Peshawar", region: "kpk", locked: true },
    { id: 20, x: 0.62, y: 0.11, logo: kpk, logoGray: kpkG, popup: pk2, text: "Mardan", region: "kpk", locked: true },
    { id: 21, x: 0.63, y: 0.18, logo: kpk, logoGray: kpkG, popup: pk3, text: "Abbottabad", region: "kpk", locked: true },
    { id: 22, x: 0.58, y: 0.25, logo: kpk, logoGray: kpkG, popup: pk4, text: "Swat", region: "kpk", locked: true },
  ]);

  // 🔈 Voice Playback
  const speak = (message) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      const femaleVoice =
        voices.find((v) =>
          /female|zira|Google UK English Female|Google US English/.test(v.name)
        ) || voices.find((v) => v.lang.startsWith("en"));
      if (femaleVoice) utterance.voice = femaleVoice;
      utterance.rate = 0.95;
      utterance.pitch = 1.3;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // 🎯 Button Click
  const handleClick = (id) => {
    const selected = buttons.find((b) => b.id === id);
    if (selected.locked) {
      speak("You need to unlock this region first!");
      return;
    }
    speak(selected.text);
    setActiveButton(id);

    if (!visited.includes(id)) {
      const newVisited = [...visited, id];
      setVisited(newVisited);

      const regionBtns = buttons.filter((b) => b.region === selected.region);
      if (regionBtns.every((b) => newVisited.includes(b.id))) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
        setTimeout(() => {
          setPhase("didu");
          setCurrentRegion(selected.region);
        }, 2500);
      }
    }
  };

  const handleClose = () => {
    window.speechSynthesis.cancel();
    setActiveButton(null);
  };

  // 🖐️ Map Drag
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
  const handleTouchMove = (e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY);
  const handleTouchEnd = () => endDrag();

  // 🚀 Instant Zoom Start (Like Layer1)
  const handleStartExploring = () => {
    setIsExploring(true);
    const screenFactor = Math.min(windowSize.width, windowSize.height);
    let baseZoom = screenFactor > 1200 ? 4.5 : screenFactor > 600 ? 9.0 : 4.5;
    if (screenFactor <= 600) baseZoom = 7.0;
    setScale(baseZoom);

    const mapW = mapRef.current?.clientWidth || 1000;
    const mapH = mapRef.current?.clientHeight || 600;
    const targetX = 0.5;
    const targetY = screenFactor <= 600 ? 0.55 : 0.8;
    setPosition({ x: -mapW * (targetX - 0.5) * baseZoom, y: -mapH * (targetY - 0.5) * baseZoom });

    speak("Ready for another exploration?");
  };

  // 🕒 Auto Start
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => handleStartExploring(), 800);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  const logoSize = windowSize.width < 600 ? "28vmin" : "18vmin";

  return (
    <div
      className="fixed inset-0 bg-gray-100 overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="fixed inset-0 bg-[#643118]" />
      {showConfetti && <Confetti />}

      {/* 🗺️ Map */}
      <div
        ref={mapRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="transition-transform duration-[1000ms] ease-in-out relative"
        style={{
          cursor: "grab",
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "center center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="relative" style={{ width: "min(100vw,177.78vh)", height: "min(56.25vw,100vh)" }}>
          <img src={mapImage} alt="Pakistan Map" className="select-none object-contain w-full h-full" draggable={false} />

          {/* Province Buttons */}
          {isExploring &&
            buttons.map((btn) => {
              const isActive = activeButton === btn.id;
              const isVisited = visited.includes(btn.id);
              const isGlowing = !isActive && !isVisited;
              const glowScale = 1.3;
              const finalSize = isGlowing ? `calc(${logoSize} * ${glowScale})` : logoSize;

              return (
                <div
                  key={btn.id}
                  className="absolute"
                  style={{
                    top: `${btn.y * 100}%`,
                    left: `${btn.x * 100}%`,
                    transform: `translate(-50%,-50%) scale(${1.5 / scale})`,
                  }}
                >
                  {isActive ? (
                    <div className="relative transition-all duration-300 inline-block">
                      <img src={btn.popup} alt="popup" className="block max-w-[140vmin] max-h-[140vmin]" draggable={false} />
                      <button
                        onClick={handleClose}
                        className="absolute -top-3 -right-3 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-700"
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
                        src={isVisited ? btn.logo : btn.logoGray}
                        alt={btn.text}
                        style={{ width: finalSize, height: finalSize }}
                        className="rounded-full object-contain shadow-xl"
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Didu Popup */}
      {phase === "didu" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <img
            src={didu}
            alt="Did You Know Button"
            onClick={() => {
              const dykMap = { sindh: sindhdyk, balochistan: baldyk, punjab: pundyk, kpk: kpkdyk };
              setDykImage(dykMap[currentRegion]);
              setPhase("dyk");
            }}
            className="w-[32vmin] translate-y-[4vmin] translate-x-[2vmin] cursor-pointer hover:scale-110 transition-transform"
            draggable={false}
          />
        </div>
      )}

      {/* DYK Card */}
      {phase === "dyk" && dykImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="relative">
            <img src={dykImage} alt="Did You Know" className="max-w-[80vmin] max-h-[80vmin]" draggable={false} />
            <button
              onClick={() => {
                const order = ["sindh", "balochistan", "punjab", "kpk"];
                const next = order[order.indexOf(currentRegion) + 1];
                if (next) {
                  setButtons((prev) => prev.map((b) => (b.region === next ? { ...b, locked: false } : b)));
                  setPhase("regions");
                  setDykImage(null);
                  speak(`${next} unlocked!`);
                } else {
                  speak("You have explored all regions!");
                  setShowConfetti(true);
                  setTimeout(() => {
                    setShowConfetti(false);
                    navigate("/SecondLast");
                  }, 4000);
                }
              }}
              className="absolute -top-3 -right-3 bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-lg hover:bg-red-700 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layer2;
