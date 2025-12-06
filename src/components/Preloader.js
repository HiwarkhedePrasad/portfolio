"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Preloader = () => {
  const [isSiteLoaded, setIsSiteLoaded] = useState(false);
  const siteLoadedRef = useRef(false);
  const containerRef = useRef(null);
  const whiteBallRef = useRef(null);
  const blackBallRef = useRef(null);

  // 1. Detect Website Load
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleLoad = () => {
      setIsSiteLoaded(true);
      siteLoadedRef.current = true;
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // 2. The Animation Sequence
  useGSAP(() => {
    const tl = gsap.timeline();

    // --- Initial Setup ---
    gsap.set(containerRef.current, { backgroundColor: "#000" });
    gsap.set(whiteBallRef.current, { y: -150, scale: 1, autoAlpha: 1 });
    gsap.set(blackBallRef.current, { y: -150, scale: 1, autoAlpha: 0 });

    // === START OF THE LOOP ===
    tl.addLabel("startLoop");

    // ---------------------------
    // PHASE 1: WHITE BALL (On Black BG)
    // ---------------------------
    tl.to(whiteBallRef.current, { y: 0, duration: 0.5, ease: "power2.in" })
      .to(whiteBallRef.current, { y: -100, duration: 0.4, ease: "power2.out" })
      .to(whiteBallRef.current, { y: 0, duration: 0.4, ease: "power2.in" })
      // Expand White to cover screen
      .to(whiteBallRef.current, {
        scale: 100,
        duration: 0.8,
        ease: "expo.inOut",
        onComplete: () => {
          // 1. Screen is now visually WHITE (ball covered it).
          // 2. We swap the container BG to WHITE behind the scenes.
          gsap.set(containerRef.current, { backgroundColor: "#fff" });
          
          // 3. Hide White ball (redundant now) and Reset Black ball for next phase
          gsap.set(whiteBallRef.current, { autoAlpha: 0 });
          gsap.set(blackBallRef.current, { autoAlpha: 1, y: -150, scale: 1 });
        },
      });

    // ---------------------------
    // PHASE 2: BLACK BALL (On White BG)
    // ---------------------------
    tl.to(blackBallRef.current, { y: 0, duration: 0.5, ease: "power2.in" })
      .to(blackBallRef.current, { y: -100, duration: 0.4, ease: "power2.out" })
      .to(blackBallRef.current, { y: 0, duration: 0.4, ease: "power2.in" })
      // Expand Black to cover screen
      .to(blackBallRef.current, {
        scale: 100,
        duration: 0.8,
        ease: "expo.inOut",
        onComplete: () => {
          // 1. Screen is now visually BLACK.
          // 2. Swap container BG back to BLACK.
          gsap.set(containerRef.current, { backgroundColor: "#000" });
          
          // 3. Hide Black ball and Reset White ball for the loop restart
          gsap.set(blackBallRef.current, { autoAlpha: 0 });
          gsap.set(whiteBallRef.current, { autoAlpha: 1, y: -150, scale: 1 });
        },
      });

    // ---------------------------
    // LOOP LOGIC
    // ---------------------------
    tl.call(() => {
      // If site is NOT loaded, go back to the very start (White Ball)
      if (!siteLoadedRef.current) {
        tl.play("startLoop");
      } else {
        finishAnimation();
      }
    });

  }, { scope: containerRef });

  const finishAnimation = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.body.style.overflow = "";
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
    >
      <div ref={whiteBallRef} className="absolute w-12 h-12 bg-white rounded-full" />
      <div ref={blackBallRef} className="absolute w-12 h-12 bg-black rounded-full" />
    </div>
  );
};

export default Preloader;