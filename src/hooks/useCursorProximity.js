'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for cursor proximity detection to DOM elements.
 * Returns distance and normalized proximity (0-1) to registered elements.
 * 
 * @param {number} threshold - Max distance in pixels to track (default 200)
 * @returns {Object} { ref, isNear, distance, proximity }
 */
export function useCursorProximity(threshold = 200) {
  const ref = useRef(null);
  const [state, setState] = useState({
    isNear: false,
    distance: Infinity,
    proximity: 0, // 1 = at element, 0 = at threshold or beyond
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const isNear = distance < threshold;
      const proximity = isNear ? 1 - distance / threshold : 0;

      setState({ isNear, distance, proximity });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [threshold]);

  return { ref, ...state };
}

/**
 * Global cursor position tracker hook.
 * Updates on every mouse move for environment effects.
 * 
 * @returns {Object} { x, y, normalizedX, normalizedY }
 */
export function useGlobalCursor() {
  const [cursor, setCursor] = useState({ 
    x: 0, 
    y: 0, 
    normalizedX: 0, 
    normalizedY: 0 
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      
      setCursor({
        x: e.clientX,
        y: e.clientY,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return cursor;
}

/**
 * Magnetic cursor effect hook.
 * Pulls the element towards cursor when near.
 * 
 * @param {number} strength - Pull strength (default 0.3)
 * @param {number} threshold - Activation distance (default 150)
 */
export function useMagneticCursor(strength = 0.3, threshold = 150) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < threshold) {
        const factor = (1 - distance / threshold) * strength;
        setOffset({ x: dx * factor, y: dy * factor });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, threshold]);

  return { ref, offset };
}

export default useCursorProximity;
