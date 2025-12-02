import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapImage from "./assets/mm.png";

// Province logos
import bal from "./assets/sindh.png";
import balG from "./assets/sindhG.png";
import glg from "./assets/punjab.png";
import glgG from "./assets/punjabG.png";
import punjab from "./assets/bal.png";
import punjabG from "./assets/balG.png";
import sindh from "./assets/kpk.png";
import sindhG from "./assets/kpkG.png";
import kpk from "./assets/glg.png";
import kpkG from "./assets/glgG.png";

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
import pk5 from "./assets/pk5.png";

// DYK cards
import sindhdyk from "./assets/newsin.png";
import baldyk from "./assets/newbal.png";
import pundyk from "./assets/newpun.png";
import kpkdyk from "./assets/newkpk.png";
import glgdyk from "./assets/newglg.png";
import randyk from "./assets/newran.png";

// Sounds
import popupSound from "./assets/popup33.mp3";
import starSoundFile from "./assets/starSound.mp3";

// ⭐ Continuous background music
import balSong from "./assets/balsong.mp3";

import star1 from "./assets/l2star1.png";
import star2 from "./assets/l2star2.png";
import star3 from "./assets/l2star3.png";
import star4 from "./assets/l2star4.png";
import star5 from "./assets/l2star5.png";
import star6 from "./assets/l2star6.png";
import star7 from "./assets/star6.png"
import "./App.css";


// ---------- GLOBAL AUDIO INSTANCE ----------
let layer2Audio = null;
function getLayer2Audio(song) {
  if (!layer2Audio) {
    layer2Audio = new Audio(song);
    layer2Audio.loop = true;
    layer2Audio.volume = 0.26;
  }
  return layer2Audio;
}


// ---------- CONFETTI ----------
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
              animationDuration: `${duration}s`
            }}
          />
        );
      })}
    </div>
  );
};


// -------------------- MAIN COMPONENT --------------------
function Layer2() {
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
  const [activeDyk, setActiveDyk] = useState(null);
  const [blurBackground, setBlurBackground] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const mapRef = useRef(null);

  const popupCardAudioRef = useRef(new Audio(popupSound));
  const starAudioRef = useRef(new Audio(starSoundFile));
  const dykAudioRef = useRef(new Audio(starSoundFile));

  const layer2MusicRef = useRef(getLayer2Audio(balSong));

  useEffect(() => {
    const audio = layer2MusicRef.current;
    const unlock = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    audio.play().catch(() => {});
    window.addEventListener("click", unlock);
    window.addEventListener("touchstart", unlock);
    return () => audio.pause();
  }, []);

  // ---------- BUTTON DATA ----------
  const buttons = [
    // Sindh
    { id: 1, x: 0.45, y: 0.7, logo: sindh, logoGray: sindhG, popup: sindh1, region: "sindh" },
    { id: 2, x: 0.40, y: 0.8, logo: sindh, logoGray: sindhG, popup: sindh2, region: "sindh" },
    { id: 3, x: 0.49, y: 0.86, logo: sindh, logoGray: sindhG, popup: sindh3, region: "sindh" },
    { id: 4, x: 0.42, y: 0.95, logo: sindh, logoGray: sindhG, popup: sindh4, region: "sindh" },

    // Balochistan
    { id: 6, x: 0.28, y: 0.80, logo: bal, logoGray: balG, popup: bal1, region: "balochistan" },
    { id: 7, x: 0.26, y: 0.62, logo: bal, logoGray: balG, popup: bal2, region: "balochistan" },
    { id: 8, x: 0.34, y: 0.70, logo: bal, logoGray: balG, popup: bal3, region: "balochistan" },
    { id: 9, x: 0.36, y: 0.58, logo: bal, logoGray: balG, popup: bal4, region: "balochistan" },

    // Punjab
    { id: 13, x: 0.53, y: 0.68, logo: punjab, logoGray: punjabG, popup: pun1, region: "punjab" },
    { id: 14, x: 0.61, y: 0.48, logo: punjab, logoGray: punjabG, popup: pun2, region: "punjab" },
    { id: 15, x: 0.55, y: 0.40, logo: punjab, logoGray: punjabG, popup: pun3, region: "punjab" },
    { id: 16, x: 0.51, y: 0.53, logo: punjab, logoGray: punjabG, popup: pun4, region: "punjab" },

    // KPK + GLG
    { id: 19, x: 0.55, y: 0.17, logo: kpk, logoGray: kpkG, popup: pk5, region: "kpk" },
    { id: 20, x: 0.65, y: 0.07, logo: glg, logoGray: glgG, popup: pk2, region: "glg" },
    { id: 21, x: 0.61, y: 0.18, logo: kpk, logoGray: kpkG, popup: pk3, region: "kpk" },
    { id: 22, x: 0.54, y: 0.28, logo: kpk, logoGray: kpkG, popup: pk4, region: "kpk" },
    { id: 23, x: 0.72, y: 0.16, logo: glg, logoGray: glgG, popup: pk1, region: "glg" }
  ];

  const starAssignments = {
    2: star7,
    16: star2,
    19: star5,
    3: star4,
    21: star3,
    13: star6,
    23: star1
  };

  const dykAssignments = {
    1: sindhdyk,
    6: baldyk,
    14: pundyk,
    20: kpkdyk,
    22: glgdyk,
    9: randyk
  };

  // ---------- ICON CLICK ----------
  const handleClick = (id) => {
    const selected = buttons.find((b) => b.id === id);
    if (!selected) return;

    popupCardAudioRef.current.play();
    setActiveButton(id);

    if (!visited.includes(id)) {
      const newVisited = [...visited, id];
      setVisited(newVisited);

      const regionButtons = buttons.filter((b) => b.region === selected.region);

      if (regionButtons.every((b) => newVisited.includes(b.id))) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    }
  };

  const handleClose = () => {
    const id = activeButton;

    if (starAssignments[id]) {
      starAudioRef.current.play();
      setActiveStar(id);
      setTimeout(() => setActiveStar(null), 5000);
    }

    if (dykAssignments[id]) {
      dykAudioRef.current.play();
      setActiveDyk(id);
      setBlurBackground(true);

      setTimeout(() => {
        setActiveDyk(null);
        setBlurBackground(false);
      }, 7000);
    }

    setActiveButton(null);
  };

  // ---------- DRAG FUNCTION ----------
  const startDrag = (x, y) => {
    setIsDragging(true);
    setLastPos({ x, y });
    if (mapRef.current) mapRef.current.style.cursor = "grabbing";
  };

  const moveDrag = (x, y) => {
    if (!isDragging) return;
    setPosition((p) => ({ x: p.x + (x - lastPos.x), y: p.y + (y - lastPos.y) }));
    setLastPos({ x, y });
  };

  const endDrag = () => {
    setIsDragging(false);
    if (mapRef.current) mapRef.current.style.cursor = "grab";
  };

  // ---------- AUTO ZOOM ----------
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExploring(true);
      const s = Math.min(windowSize.width, windowSize.height);

      let base = s > 1200 ? 4 : s > 600 ? 6.5 : 4;
      if (s <= 600) base = 6.5;

      setScale(base);

      const W = mapRef.current?.clientWidth || 1000;
      const H = mapRef.current?.clientHeight || 600;

      setPosition({
        x: -W * (0.48 - 0.53) * base,
        y: -H * (0.85 - 0.5) * base
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [windowSize]);

  // RESIZE LISTENER
  useEffect(() => {
    const onResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // COMPLETED ALL → GOTO NEXT
  useEffect(() => {
    if (visited.length === buttons.length) {
      setShowConfetti(true);
      setTimeout(() => navigate("/SecondLast"), 2000);
    }
  }, [visited, navigate]);

  const logoSize = windowSize.width < 600 ? "28vmin" : "18vmin";

  // ----------------------------------------------------------
  // RETURN
  // ----------------------------------------------------------

  return (
    <div
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#643118" }}
      onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
      onMouseUp={endDrag}
      onTouchMove={(e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={endDrag}
    >
      {showConfetti && <Confetti />}


      {/* SKIP BUTTON */}
      <button
        onClick={() => navigate("/SecondLast")}
        className="
          fixed top-6 right-6 
          z-[20000]
          rounded-full 
          bg-white/95 
          text-[#643118]
          text-sm md:text-base 
          font-semibold 
          px-5 py-3 
          shadow-xl 
          flex items-center gap-2
          hover:bg-white hover:scale-110 active:scale-95
          transition-transform transition-colors
        "
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">L3</span>
        <span className="text-lg">➜</span>
      </button>



      {/* BLUR LAYER - Only background & map gets blurred */}
      <div
        className={`
          absolute inset-0 transition-all duration-500
          ${blurBackground ? "blur-md brightness-[0.5]" : ""}
        `}
        style={{ zIndex: 1 }}
      >


        {/* MAP + ICONS */}
        <div
          ref={mapRef}
          className="transition-transform duration-[1000ms] ease-in-out relative flex items-center justify-center"
          onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
          onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
          style={{
            cursor: "grab",
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
            width: "100vw",
            height: "100vh"
          }}
        >
          <div
            className="relative"
            style={{
              width: "min(100vw,177.78vh)",
              height: "min(56.25vw,100vh)"
            }}
          >
            <img
              src={mapImage}
              alt="Pakistan Map"
              className="select-none object-contain w-full h-full"
              draggable={false}
            />

            {isExploring &&
              buttons.map((btn) => {
                const isActive = activeButton === btn.id;
                const isVisited = visited.includes(btn.id);

                const size = isVisited
                  ? windowSize.width < 600
                    ? "24vmin"
                    : "14vmin"
                  : logoSize;

                return (
                  <div
                    key={btn.id}
                    className="absolute"
                    style={{
                      top: `${btn.y * 100}%`,
                      left: `${btn.x * 100}%`,
                      transform: `translate(-50%,-50%) scale(${1.5 / scale})`
                    }}
                  >
                    {/* POPUP CARD */}
                    {isActive ? (
                      <div className="relative inline-block">
                        <img
                          src={btn.popup}
                          alt="popup"
                          className="block max-w-[70vmin] max-h-[70vmin]"
                          draggable={false}
                        />
                        <button
                          onClick={handleClose}
                          className="absolute -top-3 -right-3 bg-red-600 text-white w-7 h-7 rounded-full hover:bg-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleClick(btn.id)}
                        className={`cursor-pointer transition-transform duration-300 hover:scale-110 ${
                          !isVisited ? "hop-animation" : ""
                        }`}
                      >
                        <img
                          src={isVisited ? btn.logo : btn.logoGray}
                          style={{ width: size, height: size }}
                          className="rounded-full object-contain shadow-xl"
                          draggable={false}
                        />
                      </div>
                    )}

                    {/* STAR POPUP */}
                    {activeStar === btn.id && starAssignments[btn.id] && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{ top: "-16vmin", transform: `scale(${28 / scale})` }}
                      >
                        <img
                          src={starAssignments[btn.id]}
                          className="animate-popStar"
                          style={{ width: "300vmin", pointerEvents: "none" }}
                          draggable={false}
                        />
                      </div>
                    )}

                    {/* DYK POPUP - Big and Crisp */}
                    {activeDyk === btn.id && dykAssignments[btn.id] && (
                      <></>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>


      {/* REAL DYK POPUP - OUTSIDE BLUR LAYER */}
      {activeDyk && (
        <div className="fixed inset-0 flex items-center justify-center z-[99999] pointer-events-none">
          <img
            src={dykAssignments[activeDyk]}
            className="animate-popStar"
            style={{
              width: "70vmin",
              pointerEvents: "none"
            }}
            draggable={false}
          />
        </div>
      )}

    </div>
  );
}

export default Layer2;
