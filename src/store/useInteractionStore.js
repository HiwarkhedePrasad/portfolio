'use client';
import { create } from 'zustand';

/**
 * Global interaction state for the portfolio experience.
 * Tracks scroll position, active zone, cursor, and engagement metrics.
 */
const useInteractionStore = create((set, get) => ({
  // Scroll state (0-1 normalized)
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  // Active zone based on scroll position
  activeZone: 'hook',
  zones: ['hook', 'explore', 'understand', 'trust', 'exit'],
  setActiveZone: (zone) => set({ activeZone: zone }),

  // Cursor position and proximity data
  cursor: { x: 0, y: 0 },
  setCursor: (x, y) => set({ cursor: { x, y } }),

  // Interaction metrics (engagement tracking)
  interactionCount: 0,
  incrementInteraction: () => set((state) => ({ 
    interactionCount: state.interactionCount + 1 
  })),

  // Time tracking
  entryTime: Date.now(),
  getTimeOnPage: () => Math.floor((Date.now() - get().entryTime) / 1000),

  // Terminal overlay state
  terminalOpen: false,
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  setTerminalOpen: (open) => set({ terminalOpen: open }),

  // Zone transition state
  isTransitioning: false,
  setTransitioning: (value) => set({ isTransitioning: value }),

  // Compute active zone from scroll progress
  computeZone: (progress) => {
    const zones = get().zones;
    const index = Math.min(
      Math.floor(progress * zones.length),
      zones.length - 1
    );
    return zones[index];
  },
}));

export default useInteractionStore;
