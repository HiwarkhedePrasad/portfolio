"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function WaterDropletCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [droplets, setDroplets] = useState([]);
  const [isHoveringText, setIsHoveringText] = useState(false);
  
  // Smooth mouse movement for the main cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      // Adjust center based on current size (80px normal, 150px hover)
      const offset = isHoveringText ? 75 : 40;
      cursorX.set(e.clientX - offset); 
      cursorY.set(e.clientY - offset);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY, isHoveringText]);

  // Handle text hover detection and magnification
  useEffect(() => {
    const handleMouseEnter = (e) => {
      setIsHoveringText(true);
      
      // Only scale if the element is NOT inline (to avoid layout shifts)
      const style = window.getComputedStyle(e.target);
      if (style.display !== 'inline') {
        e.target.style.transition = "transform 0.3s ease";
        e.target.style.transform = "scale(1.05)"; 
      }
    };

    const handleMouseLeave = (e) => {
      setIsHoveringText(false);
      // Reset transform only if we set it
      const style = window.getComputedStyle(e.target);
      if (style.display !== 'inline') {
        e.target.style.transform = "";
      }
    };

    // Removed 'span' to prevent layout issues in terminal/text blocks
    // Removed 'li' to prevent list layout shifts
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, label');
    
    textElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      textElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        // Clean up styles
        el.style.transform = "";
        el.style.transition = "";
      });
    };
  }, []); 

  // Logic to spawn leaking droplets
  useEffect(() => {
    const interval = setInterval(() => {
      if (mousePosition.x === 0 && mousePosition.y === 0) return;

      const id = Date.now();
      const size = Math.random() * 15 + 5; 
      const newDroplet = {
        id,
        x: mousePosition.x,
        y: mousePosition.y,
        size,
        duration: Math.random() * 2 + 2, 
      };

      setDroplets((prev) => [...prev, newDroplet]);

      setTimeout(() => {
        setDroplets((prev) => prev.filter((d) => d.id !== id));
      }, newDroplet.duration * 1000);

    }, 200); 

    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-difference">
      {/* Main Cursor - Morphing Blob */}
      <motion.div
        className="absolute bg-white"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        animate={{
          width: isHoveringText ? 150 : 80,
          height: isHoveringText ? 150 : 80,
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          borderRadius: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
      />

      {/* Leaking Droplets */}
      <AnimatePresence>
        {droplets.map((droplet) => (
          <motion.div
            key={droplet.id}
            initial={{ 
              x: droplet.x - droplet.size / 2, 
              y: droplet.y - droplet.size / 2, 
              opacity: 0.8, 
              scale: 0,
              borderRadius: "50%"
            }}
            animate={{ 
              y: -100, 
              opacity: 0,
              scale: 1,
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "40% 60% 70% 30% / 50% 60% 30% 60%",
              ]
            }}
            transition={{ 
              duration: droplet.duration, 
              ease: "easeOut" 
            }}
            className="absolute bg-white"
            style={{
              width: droplet.size,
              height: droplet.size,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
