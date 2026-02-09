'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HookZone() {
  const containerRef = useRef(null);
  
  // Mouse tracking for subtle parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 20, mass: 0.1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }     
    }
  };

  return (
    <section ref={containerRef} className="zone zone-hook hero-section">
      {/* Grid background - retained but subtle */}
      <motion.div 
        className="hook-grid"
        style={{
          x: useTransform(springX, [-1, 1], [10, -10]),
          y: useTransform(springY, [-1, 1], [10, -10]),
          opacity: 0.4
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div 
            key={`h-${i}`}
            className="grid-line horizontal"
            style={{ top: `${15 + i * 14}%` }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`v-${i}`}
            className="grid-line vertical"
            style={{ left: `${8 + i * 12}%` }}
          />
        ))}
      </motion.div>

      <div className="hero-center-container">
        <motion.div 
          className="hero-content-centered"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Primary Statement */}
          <motion.h1 className="hero-title-engineering" variants={fadeInUp}>
            Engineer building <span className="text-highlight">secure systems</span> <br />
            & <span className="text-highlight">applied AI infrastructure</span>
          </motion.h1>

          {/* Secondary Statement */}
          <motion.p className="hero-subtitle-engineering" variants={fadeInUp}>
            I design real-time platforms, local AI pipelines, and encrypted communication tools 
            focused on performance, reliability, and control over data.
          </motion.p>

          {/* Proof Strip */}
          <motion.div className="hero-proof-line" variants={fadeInUp}>
            <span className="proof-item">12+ systems built</span>
            <span className="proof-separator">•</span>
            <span className="proof-item">AI + Systems focus</span>
            <span className="proof-separator">•</span>
            <span className="proof-item">Security oriented</span>
          </motion.div>

          {/* CTAs */}
          <motion.div className="hero-actions" variants={fadeInUp}>
            <a href="#projects" className="btn-primary">
              View Selected Work
            </a>
            
            <div className="hero-links">
              <a href="https://github.com/HiwarkhedePrasad" target="_blank" className="link-subtle">GitHub</a>
              <a href="/resume.pdf" className="link-subtle">Resume</a>
              <a href="/contact" className="link-subtle">Contact</a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner accents */}
      <div className="corner-accent top-left" />
      <div className="corner-accent top-right" />
      <div className="corner-accent bottom-left" />
      <div className="corner-accent bottom-right" />
    </section>
  );
}
