'use client';
import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, Minimize2, Move } from 'lucide-react';

const ProjectPage = () => {
  const params = useParams();
  const slug = params.slug;
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pan state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const isHeimdall = slug === 'heimdall';

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.25));
  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse drag handlers
  const handleMouseDown = useCallback((e) => {
    // Ignore if clicking on a button or link
    if (e.target.closest('button') || e.target.closest('a')) return;
    
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { x: position.x, y: position.y };
    e.preventDefault();
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({
      x: posStart.current.x + dx,
      y: posStart.current.y + dy,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch drag handlers
  const handleTouchStart = useCallback((e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    if (e.touches.length !== 1) return;
    
    setIsDragging(true);
    const touch = e.touches[0];
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    posStart.current = { x: position.x, y: position.y };
  }, [position]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;
    setPosition({
      x: posStart.current.x + dx,
      y: posStart.current.y + dy,
    });
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Wheel zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.min(Math.max(prev + delta, 0.25), 3));
  }, []);

  return (
    <main className={`min-h-screen ${isHeimdall ? 'bg-white text-black' : 'bg-[#050505] text-white'}`}>
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/#work"
          className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-sm transition-all shadow-lg ${isHeimdall ? 'bg-white/80 border border-gray-300 text-gray-600 hover:text-black hover:border-gray-400' : 'bg-black/70 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-500'}`}
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>

      {isHeimdall ? (
        /* Heimdall project - show the DDoS Prevention Architecture SVG */
        <div className="h-screen flex flex-col overflow-hidden">
          {/* Header */}
          <div className="pt-20 pb-4 px-8 text-center flex-shrink-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-black">
              {title}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              DDoS Prevention Architecture — Hybrid defense using Deterministic Rules (L7) and Isolation Forest ML (L4)
            </p>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center justify-center gap-3 pb-3 flex-shrink-0">
            <button
              onClick={handleZoomOut}
              className="p-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-600 hover:text-black transition-all"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-xs text-gray-600 hover:text-black transition-all font-mono"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-600 hover:text-black transition-all"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <div className="w-px h-6 bg-gray-300" />
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-600 hover:text-black transition-all"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <div className="hidden md:flex items-center gap-1.5 ml-2 text-xs text-gray-400">
              <Move size={12} />
              <span>Click & drag to pan</span>
            </div>
          </div>

          {/* SVG Canvas - pannable & zoomable */}
          <div 
            ref={containerRef}
            className={`flex-1 mx-4 mb-4 rounded-xl border border-gray-200 bg-white overflow-hidden select-none ${
              isFullscreen ? 'fixed inset-0 z-40 m-0 rounded-none' : ''
            }`}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            {isFullscreen && (
              <div className="sticky top-0 left-0 z-50 flex items-center justify-between p-4 bg-white/90 backdrop-blur-md border-b border-gray-200">
                <h2 className="text-sm font-medium text-gray-700">DDoS Prevention Architecture</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-black transition-all"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-xs text-gray-400 font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
                  <button
                    onClick={handleZoomIn}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-black transition-all"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-black transition-all ml-2"
                  >
                    <Minimize2 size={16} />
                  </button>
                </div>
              </div>
            )}
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              }}
            >
              <img
                src="/DDOS Prevention Architecure.svg"
                alt="DDoS Prevention Architecture Diagram"
                style={{ maxWidth: 'none', pointerEvents: 'none' }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Other projects - placeholder */
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">{title}</h1>
            <p className="text-gray-500 text-lg">Project details coming soon.</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectPage;
