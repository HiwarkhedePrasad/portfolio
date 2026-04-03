'use client';
import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, Minimize2, Move, Github, ExternalLink, Lock, Shield, Cpu, Network, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { getProjectBySlug } from '../../../content/projects';

const ProjectPage = () => {
  const params = useParams();
  const slug = params.slug;
  const project = getProjectBySlug(slug);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pan state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const title = project?.title || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const isHeimdall = slug === 'heimdall';
  const isDecentChat = slug === 'decentchat';

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.25));
  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse drag handlers
  const handleMouseDown = useCallback((e) => {
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
    <main className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-sm transition-all border border-[var(--gray-700)] text-[var(--gray-300)] hover:text-[var(--white)] hover:border-[var(--gray-500)] bg-[var(--gray-900)]/80"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>

      {isHeimdall ? (
        /* Heimdall project - Professional dark theme layout */
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="pt-24 pb-12 px-6 border-b border-[var(--gray-800)]">
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-[var(--gray-500)] mb-6 uppercase tracking-wider">
                <span>Projects</span>
                <span>/</span>
                <span className="text-[var(--accent)]">Heimdall</span>
              </div>

              {/* Title Block */}
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="text-[var(--accent)]" size={32} />
                    <span className="px-2 py-1 text-xs uppercase tracking-wider bg-[var(--accent-dim)] text-[var(--accent)] border border-[var(--accent)]/20 rounded">
                      Security System
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                    Heimdall
                  </h1>
                  <p className="text-xl md:text-2xl text-[var(--gray-300)] mb-6 font-light">
                    Hybrid DDoS Defense System
                  </p>
                  <p className="text-[var(--gray-400)] max-w-2xl leading-relaxed">
                    A hybrid DDoS prevention architecture combining deterministic L7 rules with Isolation Forest ML for L4 anomaly detection. Features real-time traffic classification and adaptive rate-limiting.
                  </p>
                </div>

                {/* Meta Info */}
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg">
                    <div className="text-xs text-[var(--gray-500)] uppercase tracking-wider mb-3">Tech Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'Isolation Forest', 'Scapy', 'Networking', 'ML'].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-[var(--gray-800)] border border-[var(--gray-700)] text-[var(--gray-300)] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg">
                    <div className="text-xs text-[var(--gray-500)] uppercase tracking-wider mb-3">Links</div>
                    <div className="flex gap-2">
                      <a
                        href="https://github.com/HiwarkhedePrasad/Heimdall"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 text-xs bg-[var(--gray-800)] border border-[var(--gray-700)] text-[var(--gray-300)] hover:text-[var(--white)] hover:border-[var(--gray-500)] rounded transition-all"
                      >
                        <Github size={14} /> Source
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Problem/Approach/Impact Grid */}
          <section className="py-12 px-6 border-b border-[var(--gray-800)]">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Problem */}
                <div className="p-6 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg group hover:border-[var(--gray-700)] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <AlertTriangle className="text-red-400" size={20} />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-300)]">Problem</h3>
                  </div>
                  <p className="text-[var(--gray-400)] text-sm leading-relaxed">
                    Origin servers are vulnerable to complex L4/L7 DDoS attacks that can overwhelm infrastructure and cause service outages.
                  </p>
                </div>

                {/* Approach */}
                <div className="p-6 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg group hover:border-[var(--gray-700)] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[var(--accent-dim)] rounded-lg">
                      <Cpu className="text-[var(--accent)]" size={20} />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-300)]">Approach</h3>
                  </div>
                  <p className="text-[var(--gray-400)] text-sm leading-relaxed">
                    Hybrid defense using Deterministic Rules (L7) and Isolation Forest ML (L4) for multi-layered protection.
                  </p>
                </div>

                {/* Impact */}
                <div className="p-6 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg group hover:border-[var(--accent)]/50 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <CheckCircle className="text-emerald-400" size={20} />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-300)]">Impact</h3>
                  </div>
                  <p className="text-[var(--gray-400)] text-sm leading-relaxed">
                    Adaptive, self-healing shield against multi-vector attacks with real-time threat detection and mitigation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture Diagram Section */}
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">System Architecture</h2>
                  <p className="text-sm text-[var(--gray-500)]">
                    Interactive diagram — zoom, pan, and explore the defense layers
                  </p>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 bg-[var(--gray-800)] hover:bg-[var(--gray-700)] border border-[var(--gray-700)] rounded-lg text-[var(--gray-400)] hover:text-[var(--white)] transition-all"
                    title="Zoom Out"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="px-3 py-2 bg-[var(--gray-800)] hover:bg-[var(--gray-700)] border border-[var(--gray-700)] rounded-lg text-xs text-[var(--gray-400)] hover:text-[var(--white)] transition-all font-mono min-w-[60px]"
                    aria-label={`Current zoom: ${Math.round(scale * 100)}%`}
                  >
                    {Math.round(scale * 100)}%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 bg-[var(--gray-800)] hover:bg-[var(--gray-700)] border border-[var(--gray-700)] rounded-lg text-[var(--gray-400)] hover:text-[var(--white)] transition-all"
                    title="Zoom In"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={18} />
                  </button>
                  <div className="w-px h-6 bg-[var(--gray-700)] mx-1" />
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 bg-[var(--gray-800)] hover:bg-[var(--gray-700)] border border-[var(--gray-700)] rounded-lg text-[var(--gray-400)] hover:text-[var(--white)] transition-all"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                </div>
              </div>

              {/* Diagram Canvas */}
              <div
                ref={containerRef}
                className={`relative bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-xl overflow-hidden select-none ${
                  isFullscreen ? 'fixed inset-0 z-40 rounded-none' : 'h-[500px] md:h-[600px]'
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
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `linear-gradient(var(--gray-600) 1px, transparent 1px), linear-gradient(90deg, var(--gray-600) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />

                {/* Fullscreen Header */}
                {isFullscreen && (
                  <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-[var(--gray-900)]/95 backdrop-blur-md border-b border-[var(--gray-800)]">
                    <div className="flex items-center gap-3">
                      <Shield className="text-[var(--accent)]" size={20} />
                      <h2 className="text-sm font-medium text-[var(--gray-300)]">Heimdall Architecture</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleZoomOut} className="p-1.5 hover:bg-[var(--gray-800)] rounded-lg text-[var(--gray-500)] hover:text-[var(--white)] transition-all" aria-label="Zoom out">
                        <ZoomOut size={16} />
                      </button>
                      <span className="text-xs text-[var(--gray-500)] font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
                      <button onClick={handleZoomIn} className="p-1.5 hover:bg-[var(--gray-800)] rounded-lg text-[var(--gray-500)] hover:text-[var(--white)] transition-all" aria-label="Zoom in">
                        <ZoomIn size={16} />
                      </button>
                      <button onClick={() => setIsFullscreen(false)} className="p-1.5 hover:bg-[var(--gray-800)] rounded-lg text-[var(--gray-500)] hover:text-[var(--white)] transition-all ml-2" aria-label="Exit fullscreen">
                        <Minimize2 size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Pan/Zoom Container */}
                <div
                  className="w-full h-full flex items-center justify-center p-8"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: 'center center',
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                  }}
                >
                  <img
                    src="/DDOS Prevention Architecure.svg"
                    alt="DDoS Prevention Architecture Diagram"
                    className="max-w-none"
                    style={{ pointerEvents: 'none' }}
                    draggable={false}
                  />
                </div>

                {/* Pan Hint */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-[var(--gray-600)]">
                  <Move size={14} />
                  <span>Click & drag to pan</span>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="py-12 px-6 border-t border-[var(--gray-800)]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Technical Implementation</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg h-fit">
                      <Network className="text-[var(--accent)]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[var(--gray-200)]">L7 Application Layer</h3>
                      <p className="text-sm text-[var(--gray-400)] leading-relaxed">
                        Deterministic rule-based filtering for HTTP/HTTPS traffic. Inspects request patterns, headers, and payload signatures to identify and block malicious requests before they reach the origin server.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg h-fit">
                      <Activity className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[var(--gray-200)]">L4 Network Layer</h3>
                      <p className="text-sm text-[var(--gray-400)] leading-relaxed">
                        Isolation Forest ML algorithm detects anomalous traffic patterns at the transport layer. Unsupervised learning identifies outliers in packet timing, size distribution, and connection behavior.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-500)] mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {[
                      'Real-time traffic classification',
                      'Adaptive rate-limiting based on behavior',
                      'Self-healing defense mechanisms',
                      'Multi-vector attack protection',
                      'Low-latency packet processing'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[var(--gray-300)]">
                        <span className="text-[var(--accent)] mt-0.5">›</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 px-6 border-t border-[var(--gray-800)]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[var(--gray-500)]">
                Built with Python, Scapy, and Isolation Forest ML
              </p>
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 text-sm text-[var(--gray-400)] hover:text-[var(--white)] transition-colors"
              >
                <ArrowLeft size={14} />
                Back to all projects
              </Link>
            </div>
          </footer>
        </div>
      ) : isDecentChat ? (
        /* DecentChat project - Professional dark theme layout */
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="pt-24 pb-12 px-6 border-b border-[var(--gray-800)]">
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-[var(--gray-500)] mb-6 uppercase tracking-wider">
                <span>Projects</span>
                <span>/</span>
                <span className="text-[var(--accent)]">DecentChat</span>
              </div>

              {/* Title Block */}
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="text-[var(--accent)]" size={32} />
                    <span className="px-2 py-1 text-xs uppercase tracking-wider bg-[var(--accent-dim)] text-[var(--accent)] border border-[var(--accent)]/20 rounded">
                      Privacy-First P2P
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                    {project?.title || 'DecentChat'}
                  </h1>
                  <p className="text-xl md:text-2xl text-[var(--gray-300)] mb-6 font-light">
                    {project?.tagline || 'Semi-Decentralized Encrypted Terminal Chat'}
                  </p>
                  <p className="text-[var(--gray-400)] max-w-2xl leading-relaxed">
                    {project?.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg">
                    <div className="text-xs text-[var(--gray-500)] uppercase tracking-wider mb-3">Tech Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {project?.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-[var(--gray-800)] border border-[var(--gray-700)] text-[var(--gray-300)] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg">
                    <div className="text-xs text-[var(--gray-500)] uppercase tracking-wider mb-3">Links</div>
                    <div className="flex gap-2">
                      <a
                        href={project?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 text-xs bg-[var(--gray-800)] border border-[var(--gray-700)] text-[var(--gray-300)] hover:text-[var(--white)] hover:border-[var(--gray-500)] rounded transition-all"
                      >
                        <Github size={14} /> Source
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Problem/Approach/Impact Grid */}
          <section className="py-12 px-6 border-b border-[var(--gray-800)]">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Problem */}
                <div className="p-6 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg group hover:border-[var(--gray-700)] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <AlertTriangle className="text-red-400" size={20} />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-300)]">Problem</h3>
                  </div>
                  <p className="text-[var(--gray-400)] text-sm leading-relaxed">
                    {project?.problem}
                  </p>
                </div>

                {/* Approach */}
                <div className="p-6 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg group hover:border-[var(--gray-700)] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[var(--accent-dim)] rounded-lg">
                      <Cpu className="text-[var(--accent)]" size={20} />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-300)]">Approach</h3>
                  </div>
                  <p className="text-[var(--gray-400)] text-sm leading-relaxed">
                    {project?.approach}
                  </p>
                </div>

                {/* Impact */}
                <div className="p-6 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg group hover:border-[var(--accent)]/50 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <CheckCircle className="text-emerald-400" size={20} />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-300)]">Impact</h3>
                  </div>
                  <p className="text-[var(--gray-400)] text-sm leading-relaxed">
                    {project?.impact}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture Diagram Section */}
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">System Architecture</h2>
                  <p className="text-sm text-[var(--gray-500)]">
                    Interactive diagram — zoom, pan, and explore the system layers
                  </p>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 bg-[var(--gray-800)] hover:bg-[var(--gray-700)] border border-[var(--gray-700)] rounded-lg text-[var(--gray-400)] hover:text-[var(--white)] transition-all"
                    title="Zoom Out"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="px-3 py-2 bg-[var(--gray-800)] hover:bg-[var(--gray-700)] border border-[var(--gray-700)] rounded-lg text-xs text-[var(--gray-400)] hover:text-[var(--white)] transition-all font-mono min-w-[60px]"
                    aria-label={`Current zoom: ${Math.round(scale * 100)}%`}
                  >
                    {Math.round(scale * 100)}%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 bg-[var(--gray-800)] hover:bg-[var(--gray-700)] border border-[var(--gray-700)] rounded-lg text-[var(--gray-400)] hover:text-[var(--white)] transition-all"
                    title="Zoom In"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={18} />
                  </button>
                  <div className="w-px h-6 bg-[var(--gray-700)] mx-1" />
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 bg-[var(--gray-800)] hover:bg-[var(--gray-700)] border border-[var(--gray-700)] rounded-lg text-[var(--gray-400)] hover:text-[var(--white)] transition-all"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                </div>
              </div>

              {/* Diagram Canvas */}
              <div
                ref={containerRef}
                className={`relative bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-xl overflow-hidden select-none ${
                  isFullscreen ? 'fixed inset-0 z-40 rounded-none' : 'h-[500px] md:h-[600px]'
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
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `linear-gradient(var(--gray-600) 1px, transparent 1px), linear-gradient(90deg, var(--gray-600) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />

                {/* Fullscreen Header */}
                {isFullscreen && (
                  <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-[var(--gray-900)]/95 backdrop-blur-md border-b border-[var(--gray-800)]">
                    <div className="flex items-center gap-3">
                      <Lock className="text-[var(--accent)]" size={20} />
                      <h2 className="text-sm font-medium text-[var(--gray-300)]">DecentChat Architecture</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleZoomOut} className="p-1.5 hover:bg-[var(--gray-800)] rounded-lg text-[var(--gray-500)] hover:text-[var(--white)] transition-all" aria-label="Zoom out">
                        <ZoomOut size={16} />
                      </button>
                      <span className="text-xs text-[var(--gray-500)] font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
                      <button onClick={handleZoomIn} className="p-1.5 hover:bg-[var(--gray-800)] rounded-lg text-[var(--gray-500)] hover:text-[var(--white)] transition-all" aria-label="Zoom in">
                        <ZoomIn size={16} />
                      </button>
                      <button onClick={() => setIsFullscreen(false)} className="p-1.5 hover:bg-[var(--gray-800)] rounded-lg text-[var(--gray-500)] hover:text-[var(--white)] transition-all ml-2" aria-label="Exit fullscreen">
                        <Minimize2 size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Pan/Zoom Container */}
                <div
                  className="w-full h-full flex items-center justify-center p-8"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: 'center center',
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                  }}
                >
                  <img
                    src="/DecentChat.svg"
                    alt="DecentChat Architecture Diagram"
                    className="max-w-none"
                    style={{ pointerEvents: 'none' }}
                    draggable={false}
                  />
                </div>

                {/* Pan Hint */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-[var(--gray-600)]">
                  <Move size={14} />
                  <span>Click & drag to pan</span>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="py-12 px-6 border-t border-[var(--gray-800)]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Technical Implementation</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg h-fit">
                      <Lock className="text-[var(--accent)]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[var(--gray-200)]">E2E Encryption</h3>
                      <p className="text-sm text-[var(--gray-400)] leading-relaxed">
                        X25519 for secure Diffie-Hellman key exchange, combined with AES-256-GCM for authenticated symmetric encryption of all messages. Local keys never touch a server.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg h-fit">
                      <Network className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-[var(--gray-200)]">P2P Tunnels</h3>
                      <p className="text-sm text-[var(--gray-400)] leading-relaxed">
                        Built-in support for Cloudflare tunnels provides robust NAT traversal without exposing your local network, enabling connections even behind firewalls.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-lg">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--gray-500)] mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {[
                      'X25519 Key Exchange',
                      'AES-256-GCM Encryption',
                      'Ed25519 Message Signing',
                      'Trust-on-First-Use (TOFU) model',
                      'Terminal-native interaction via BubbleTea',
                      'No Account Verification required'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[var(--gray-300)]">
                        <span className="text-[var(--accent)] mt-0.5">›</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 px-6 border-t border-[var(--gray-800)]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[var(--gray-500)]">
                Built with Go, BubbleTea, Gorillas WebSocket and Supabase
              </p>
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 text-sm text-[var(--gray-400)] hover:text-[var(--white)] transition-colors"
              >
                <ArrowLeft size={14} />
                Back to all projects
              </Link>
            </div>
          </footer>
        </div>
      ) : (
        /* Other projects - show detail page */
        <div className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-lg text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            {project && (
              <>
                <p className="text-lg mb-6" style={{ color: 'var(--gray-400)' }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded"
                      style={{
                        background: 'var(--gray-800)',
                        border: '1px solid var(--gray-700)',
                        color: 'var(--gray-300)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 justify-center">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      <Github size={16} /> Source Code
                    </a>
                  ) : (
                    <span className="btn" style={{ opacity: 0.5, cursor: 'default' }}>
                      <Lock size={16} /> Private / NDA
                    </span>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </>
            )}
            {!project && (
              <p style={{ color: 'var(--gray-500)' }}>Project details coming soon.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectPage;
