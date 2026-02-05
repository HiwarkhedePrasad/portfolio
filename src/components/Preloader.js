"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Preloader = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [hasSeenLoader, setHasSeenLoader] = useState(true); // Default to true to prevent flash
  const containerRef = useRef(null);
  const linesRef = useRef([]);

  const bootSequence = [
    { text: 'PRASAD_SYS v2.0', type: 'success', delay: 100 },
    { text: 'Initializing system...', type: 'dim', delay: 200 },
    { text: '', type: 'dim', delay: 50 },
    { text: 'Loading modules:', type: 'dim', delay: 150 },
    { text: '  [OK] core/identity', type: 'normal', delay: 100 },
    { text: '  [OK] core/projects', type: 'normal', delay: 120 },
    { text: '  [OK] core/capabilities', type: 'normal', delay: 100 },
    { text: '  [OK] core/terminal', type: 'normal', delay: 130 },
    { text: '  [OK] core/interface', type: 'normal', delay: 100 },
    { text: '', type: 'dim', delay: 50 },
    { text: 'Memory check... 16384K OK', type: 'dim', delay: 200 },
    { text: 'All systems nominal.', type: 'normal', delay: 150 },
    { text: '', type: 'dim', delay: 100 },
    { text: 'Ready._', type: 'success', delay: 300 },
  ];

  // Check if user has already seen the loader (runs once on mount)
  useEffect(() => {
    const seen = sessionStorage.getItem('preloader_seen');
    if (seen) {
      setIsComplete(true);
      setHasSeenLoader(true);
    } else {
      setHasSeenLoader(false);
    }
  }, []);

  // Run boot sequence only if user hasn't seen it
  useEffect(() => {
    if (hasSeenLoader) return;
    
    let totalDelay = 0;
    
    bootSequence.forEach((line, index) => {
      totalDelay += line.delay;
      
      setTimeout(() => {
        if (linesRef.current[index]) {
          linesRef.current[index].classList.add('visible');
        }
      }, totalDelay);
    });

    // Complete after boot sequence
    setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsComplete(true);
          // Mark as seen for this session
          sessionStorage.setItem('preloader_seen', 'true');
          document.body.style.overflow = '';
        }
      });
    }, totalDelay + 400);

    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasSeenLoader]);

  // Don't render if already seen or complete
  if (isComplete || hasSeenLoader) return null;

  return (
    <div ref={containerRef} className="preloader">
      <div className="max-w-xl">
        {bootSequence.map((line, index) => (
          <div
            key={index}
            ref={el => linesRef.current[index] = el}
            className={`boot-line ${line.type === 'dim' ? 'dim' : ''} ${line.type === 'success' ? 'success crt-glow' : ''}`}
          >
            {line.text}
            {index === bootSequence.length - 1 && (
              <span className="boot-cursor" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preloader;