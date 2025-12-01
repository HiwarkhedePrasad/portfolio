'use client';
import React, { createContext, useContext, useState } from 'react';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState('enter'); // 'enter' | 'exit'

  const triggerTransition = (callback) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTransitionStage('exit'); // Start curtain down

    // Wait for curtain down animation (0.5s duration + max delay ~0.5s = ~1s)
    // We'll give it 1.2s to be safe and ensure full coverage
    setTimeout(() => {
      if (callback) callback();
      
      // Small delay to ensure scroll (even instant) is applied before lifting curtain
      setTimeout(() => {
        // Start curtain up
        setTransitionStage('enter');
        
        // Wait for curtain up animation to finish before allowing new transition
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1200);
      }, 100);
    }, 1200);
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition, transitionStage }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);
