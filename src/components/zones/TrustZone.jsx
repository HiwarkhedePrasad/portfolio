'use client';
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import useInteractionStore from '../../store/useInteractionStore';

/**
 * Animated counter component.
 */
function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          gsap.to(countRef.current, {
            duration,
            ease: 'power2.out',
            onUpdate: function() {
              const progress = this.progress();
              setDisplayValue(Math.floor(value * progress));
            },
          });
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={countRef} className="counter-value">
      {displayValue}{suffix}
    </span>
  );
}

/**
 * TrustZone - Capability proof through metrics.
 */
export default function TrustZone() {
  const { getTimeOnPage, interactionCount } = useInteractionStore();
  const [timeOnPage, setTimeOnPage] = useState(0);

  // Update time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(getTimeOnPage());
    }, 1000);

    return () => clearInterval(interval);
  }, [getTimeOnPage]);

  const metrics = [
    { label: 'Years Building', value: 3, suffix: '+' },
    { label: 'Projects Shipped', value: 12, suffix: '' },
    { label: 'Technologies', value: 20, suffix: '+' },
  ];

  return (
    <section className="zone zone-trust">
      <div className="zone-content">
        <div className="trust-header">
          <span className="zone-label">PROOF</span>
          <h2 className="zone-title">Track Record</h2>
        </div>

        <div className="metrics-grid">
          {metrics.map((metric, i) => (
            <div key={i} className="metric-card">
              <AnimatedCounter 
                value={metric.value} 
                suffix={metric.suffix}
                duration={1.5 + i * 0.3}
              />
              <span className="metric-label">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Real-time engagement metrics */}
        <div className="engagement-row">
          <div className="engagement-item">
            <span className="engagement-value">{timeOnPage}s</span>
            <span className="engagement-label">time exploring</span>
          </div>
          <div className="engagement-item">
            <span className="engagement-value">{interactionCount}</span>
            <span className="engagement-label">interactions</span>
          </div>
        </div>

        {/* Capability pillars */}
        <div className="pillars-grid">
          <div className="pillar">
            <h4>Systems Thinking</h4>
            <p>Memory optimization, struct analysis, performance profiling</p>
          </div>
          <div className="pillar">
            <h4>AI Engineering</h4>
            <p>RAG architectures, LangGraph workflows, local LLMs</p>
          </div>
          <div className="pillar">
            <h4>Developer Tooling</h4>
            <p>VS Code extensions, CLI tools, build systems</p>
          </div>
        </div>
      </div>
    </section>
  );
}
