"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Preloader = () => {
  const [isSiteLoaded, setIsSiteLoaded] = useState(false);
  const siteLoadedRef = useRef(false); // Ref for GSAP to access current value immediately
  
  const containerRef = useRef(null);
  const whiteBallRef = useRef(null);
  const blackBallRef = useRef(null);

  // 1. Detect Website Load
  useLayoutEffect(() => {
    document.body.style.overflow = "hidden"; // Lock scroll

    const handleLoad = () => {
      setIsSiteLoaded(true);
      siteLoadedRef.current = true; // Update ref for GSAP
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

    // Initial States
    gsap.set(whiteBallRef.current, { y: -150, scale: 1, autoAlpha: 1 });
    gsap.set(blackBallRef.current, { y: -150, scale: 1, autoAlpha: 0 });
    gsap.set(containerRef.current, { backgroundColor: "#000000" });

    // --- PHASE 1: White Ball (Intro) ---
    tl.to(whiteBallRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.in",
    })
    .to(whiteBallRef.current, {
      y: -100,
      duration: 0.4,
      ease: "power2.out",
    })
    .to(whiteBallRef.current, {
      y: 0,
      duration: 0.4,
      ease: "power2.in",
    })
    // Expand White Ball
    .to(whiteBallRef.current, {
      scale: 100, // Massive scale to cover screen
      duration: 0.8,
      ease: "expo.inOut",
      onComplete: () => {
        // SWAP BACKGROUNDS HIDDENLY
        // Now that white ball covers screen, make container white
        gsap.set(containerRef.current, { backgroundColor: "#ffffff" });
        // Hide white ball (user won't see because container is white)
        gsap.set(whiteBallRef.current, { autoAlpha: 0 });
        // Prepare Black ball
        gsap.set(blackBallRef.current, { autoAlpha: 1 });
      }
    });

    // --- PHASE 2: Black Ball (The Loop) ---
    tl.addLabel("startBlackLoop"); // Mark the start of the loop

    // 1. Black Ball Reset (Instant snap back to top for looping)
    tl.set(blackBallRef.current, { y: -150, scale: 1 })
      
      // 2. Black Ball Bounce
      .to(blackBallRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.in",
      })
      .to(blackBallRef.current, {
        y: -100,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(blackBallRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      
      // 3. Black Ball Expand
      .to(blackBallRef.current, {
        scale: 100,
        duration: 0.8,
        ease: "expo.inOut",
      })

      // 4. CHECKPOINT: Are we loaded?
      .call(() => {
        if (!siteLoadedRef.current) {
          // If NOT loaded, jump back to start of black loop
          // We fade out the "expanded" black ball slightly to allow the "reset" small ball to be seen clearly
          // Or we just snap back. Snapping back creates a seamless loop.
          tl.play("startBlackLoop");
        } else {
          // If LOADED, we are currently looking at a black screen (expanded black ball).
          // We can now allow the component to fade out.
          finishAnimation();
        }
      });

  }, { scope: containerRef });

  // Function to handle the actual removal of the preloader
  const finishAnimation = () => {
    // Fade out the entire container
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.2,
      onComplete: () => {
        // Unlock scroll and remove component
        document.body.style.overflow = "";
        // You might set a state here to unmount the component entirely if you prefer
        // But opacity: 0 pointer-events-none is usually enough and smoother.
        if (containerRef.current) {
            containerRef.current.style.display = "none";
        }
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
    >
      {/* White Ball */}
      <div
        ref={whiteBallRef}
        className="absolute w-12 h-12 bg-white rounded-full"
      ></div>

      {/* Black Ball */}
      <div
        ref={blackBallRef}
        className="absolute w-12 h-12 bg-black rounded-full"
      ></div>
    </div>
  );
};

export default Preloader;