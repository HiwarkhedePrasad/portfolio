'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useInteractionStore from '../store/useInteractionStore';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook that maps scroll position to active zone with GSAP-powered transitions.
 * Manages zone state in global store and triggers zone transition animations.
 * 
 * @param {React.RefObject} containerRef - Ref to scroll container
 */
export function useScrollZone(containerRef) {
  const { 
    setScrollProgress, 
    setActiveZone, 
    computeZone, 
    setTransitioning,
    activeZone 
  } = useInteractionStore();
  
  const previousZoneRef = useRef(activeZone);

  useEffect(() => {
    if (!containerRef?.current) return;

    const container = containerRef.current;

    // Create scroll trigger for progress tracking
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        const newZone = computeZone(progress);
        if (newZone !== previousZoneRef.current) {
          // Zone transition detected
          setTransitioning(true);
          setActiveZone(newZone);
          previousZoneRef.current = newZone;

          // Clear transitioning state after animation
          gsap.delayedCall(0.6, () => setTransitioning(false));
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [containerRef, setScrollProgress, setActiveZone, computeZone, setTransitioning]);

  return { activeZone };
}

/**
 * Hook for scroll-triggered element animations.
 * 
 * @param {Object} options - GSAP animation options
 * @returns {React.RefObject} Ref to attach to animated element
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      start = 'top 80%',
      end = 'top 40%',
      scrub = false,
    } = options;

    gsap.set(ref.current, from);

    const animation = gsap.to(ref.current, {
      ...to,
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        scrub,
        toggleActions: scrub ? undefined : 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
    };
  }, [options]);

  return ref;
}

export default useScrollZone;
