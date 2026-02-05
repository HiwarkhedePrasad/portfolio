'use client';
import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

const IdentityPanel = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const panelRef = useRef(null);
  
  const fullText = "Full-Stack Developer & AI Practitioner";
  const roles = [
    "Full-Stack Developer",
    "AI Practitioner",
    "Systems Thinker",
    "Problem Solver"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentRole, setCurrentRole] = useState('');

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing animation for role
  useEffect(() => {
    const role = roles[currentRoleIndex];
    let charIndex = 0;
    setIsTyping(true);
    setCurrentRole('');

    const typeInterval = setInterval(() => {
      if (charIndex <= role.length) {
        setCurrentRole(role.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        
        // Wait, then switch to next role
        setTimeout(() => {
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2500);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentRoleIndex]);

  return (
    <div 
      ref={panelRef}
      className="glass-panel panel-identity p-6 flex flex-col justify-between relative overflow-hidden group"
    >
      {/* Ambient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent" />
      </div>

      {/* Top: Status indicator */}
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="relative">
          <span className="block w-2 h-2 rounded-full bg-emerald-400" />
          <span className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
        </div>
        <span className="text-xs text-gray-500 uppercase tracking-widest">Available</span>
      </div>

      {/* Middle: Name & Role */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Prasad
          <span className="text-gradient ml-2">H.</span>
        </h1>
        
        <div className="h-8 flex items-center">
          <span className="text-lg text-gray-400 mono">
            {currentRole}
            <span 
              className={`inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
            />
          </span>
        </div>
      </div>

      {/* Bottom: Quick stats */}
      <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/5 relative z-10">
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient">3+</div>
          <div className="text-xs text-gray-500 mt-0.5">Years</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient">15+</div>
          <div className="text-xs text-gray-500 mt-0.5">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient">5+</div>
          <div className="text-xs text-gray-500 mt-0.5">Wins</div>
        </div>
      </div>
    </div>
  );
};

export default IdentityPanel;
