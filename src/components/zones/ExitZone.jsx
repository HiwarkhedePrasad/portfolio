'use client';
import React, { useRef } from 'react';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { useMagneticCursor } from '../../hooks/useCursorProximity';

/**
 * Magnetic button with cursor pull effect.
 */
function MagneticButton({ href, children, primary = false }) {
  const { ref, offset } = useMagneticCursor(0.4, 120);

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic-btn ${primary ? 'primary' : ''}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      {children}
    </a>
  );
}

/**
 * ExitZone - Strong call to action with magnetic effects.
 */
export default function ExitZone() {
  return (
    <section className="zone zone-exit">
      <div className="zone-content">
        <div className="exit-statement">
          <h2 className="exit-title">Let's build something.</h2>
          <p className="exit-subtitle">
            I'm always interested in challenging problems and innovative projects.
          </p>
        </div>

        <div className="cta-row">
          <MagneticButton href="mailto:phiwarkhede05@gmail.com" primary>
            <Mail size={18} />
            <span>Get in Touch</span>
            <ArrowUpRight size={16} />
          </MagneticButton>
        </div>

        <div className="links-row">
          <MagneticButton href="https://github.com/HiwarkhedePrasad">
            <Github size={18} />
            <span>GitHub</span>
          </MagneticButton>
          
          <MagneticButton href="https://linkedin.com/in/HiwarkhedePrasad">
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </MagneticButton>
        </div>

        <div className="exit-footer">
          <span className="footer-text">
            © {new Date().getFullYear()} Prasad Hiwarkhede
          </span>
          <span className="footer-separator">·</span>
          <span className="footer-text">
            Built with precision
          </span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="exit-decoration">
        <div className="deco-line left" />
        <div className="deco-line right" />
      </div>
    </section>
  );
}
