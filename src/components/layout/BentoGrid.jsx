'use client';
import React, { useEffect } from 'react';
import useStore from '../../store/useStore';
import IdentityPanel from '../panels/IdentityPanel';
import SystemsPanel from '../panels/SystemsPanel';
import ProjectSimPanel from '../panels/ProjectSimPanel';
import TerminalPanel from '../panels/TerminalPanel';
import NotebookPanel from '../panels/NotebookPanel';

const BentoGrid = () => {
  const setCursor = useStore((state) => state.setCursor);
  const setIsMobile = useStore((state) => state.setIsMobile);

  // Track cursor position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setCursor(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setCursor]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  return (
    <div className="bento-grid">
      {/* Ambient background glow */}
      <div className="ambient-glow" />
      
      {/* Panels */}
      <IdentityPanel />
      <SystemsPanel />
      <ProjectSimPanel />
      <TerminalPanel />
      <NotebookPanel />
    </div>
  );
};

export default BentoGrid;
