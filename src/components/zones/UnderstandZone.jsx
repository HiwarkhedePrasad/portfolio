'use client';
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursorProximity } from '../../hooks/useCursorProximity';
import useInteractionStore from '../../store/useInteractionStore';

/**
 * Interactive project card with micro-demo.
 */
function ProjectDemo({ project, index }) {
  const [isActive, setIsActive] = useState(false);
  const proximity = useCursorProximity(120);

  // Demo states (kept from original for visual interest)
  const [encryptedMessage, setEncryptedMessage] = useState('Your secret message');
  const [memoryBlocks] = useState([
    { size: 4, type: 'int', padded: false },
    { size: 1, type: 'char', padded: true },
    { size: 3, type: 'pad', padded: true },
    { size: 8, type: 'long', padded: false },
  ]);
  const [queryStep, setQueryStep] = useState(0);
  const [trafficPackets, setTrafficPackets] = useState([]);
  const [shieldActive] = useState(true);

  // Interaction handlers (simplified)
  const handleChatSecureHover = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let result = '';
    for (let i = 0; i < 'Your secret message'.length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setEncryptedMessage(result);
  };

  const handleSentinelClick = () => {
    const newPackets = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      type: Math.random() > 0.5 ? 'attack' : 'legit',
      blocked: Math.random() > 0.5 && shieldActive,
    }));
    setTrafficPackets(newPackets);
    setTimeout(() => setTrafficPackets([]), 2000);
  };

  const handleRAGClick = () => {
    setQueryStep(0);
    [1, 2, 3, 0].forEach((step, i) => setTimeout(() => setQueryStep(step), i * 600));
  };

  // Render visual demo based on project ID
  const renderVisual = () => {
    switch (project.id) {
      case 'sentinel':
        return (
          <div className="eng-visual sentinel-visual" onClick={handleSentinelClick}>
            <div className="traffic-lane">
              {trafficPackets.map((p, i) => (
                <div key={p.id} className={`packet ${p.type} ${p.blocked ? 'blocked' : ''}`} style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <div className="shield-icon">🛡️</div>
            <div className="visual-hint">Click to simulate traffic</div>
          </div>
        );
      case 'chat-secure':
        return (
          <div className="eng-visual encrypt-visual" onMouseEnter={handleChatSecureHover} onMouseLeave={() => setEncryptedMessage('Your secret message')}>
            <div className="encrypt-text">{encryptedMessage}</div>
            <div className="visual-hint">Hover for encryption</div>
          </div>
        );
      case 'bytewise':
        return (
          <div className="eng-visual memory-visual">
            <div className="memory-row">
              {memoryBlocks.map((b, i) => (
                <div key={i} className={`mem-block ${b.type} ${b.padded ? 'padded' : ''}`} style={{ flex: b.size }} />
              ))}
            </div>
            <div className="visual-hint">Padding visualization</div>
          </div>
        );
      case 'rag-agent':
        return (
          <div className="eng-visual rag-visual" onClick={handleRAGClick}>
             <div className="rag-steps">
               <span className={queryStep >= 1 ? 'active' : ''}>Query</span>
               <span>→</span>
               <span className={queryStep >= 2 ? 'active' : ''}>Ret</span>
               <span>→</span>
               <span className={queryStep >= 3 ? 'active' : ''}>Gen</span>
             </div>
             <div className="visual-hint">Click flow</div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div 
      ref={proximity.ref}
      className={`project-card-engineering ${isActive ? 'active' : ''}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="card-header">
        <div className="header-top">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-type">{project.type}</span>
        </div>
        <p className="project-oneliner">{project.oneliner}</p>
      </div>

      <div className="card-body">
        <div className="engineering-content">
          <div className="content-block">
            <span className="block-label">Problem</span>
            <p>{project.problem}</p>
          </div>
          <div className="content-block">
            <span className="block-label">Engineering</span>
            <p>{project.engineering}</p>
          </div>
          <div className="content-block">
            <span className="block-label">Outcome</span>
            <p>{project.outcome}</p>
          </div>
        </div>

        <div className="card-visual">
          {renderVisual()}
        </div>
      </div>

      <div className="card-footer">
        <div className="tech-tags">
          {project.stack.map(tech => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="card-actions">
          {project.links.demo && <a href={project.links.demo} className="action-link">Demo</a>}
          {project.links.code && <a href={project.links.code} className="action-link">Code</a>}
          <button className="action-link architecture-btn">Architecture</button>
        </div>
      </div>
    </div>
  );
}

/**
 * UnderstandZone - Projects with engineering depth.
 */
export default function UnderstandZone() {
  const projects = [
    {
      id: 'sentinel',
      title: 'Sentinel',
      type: 'Security Infrastructure',
      oneliner: 'ML-powered traffic filtering system',
      problem: 'Public APIs are vulnerable to sophisticated L7 DDoS attacks that bypass traditional WAFs.',
      engineering: 'Implemented a sliding window rate limiter with eBPF for packet inspection at the kernel level.',
      outcome: 'Reduced latency by 40% while blocking 99.9% of malicious traffic in simulations.',
      stack: ['Go', 'eBPF', 'Python', 'Redis'],
      links: { code: '#' }
    },
    {
      id: 'chat-secure',
      title: 'Chat-Secure',
      type: 'Cryptography',
      oneliner: 'Zero-knowledge messaging platform',
      problem: 'Centralized messaging architectures are susceptible to server-side data breaches and metadata analysis.',
      engineering: 'Architected a double-ratchet protocol for forward secrecy and implemented client-side key rotation.',
      outcome: 'Zero-knowledge architecture ensures messages cannot be decrypted even if the server is compromised.',
      stack: ['Rust', 'WebSockets', 'Signal Protocol'],
      links: { code: '#' }
    },
    {
      id: 'bytewise',
      title: 'ByteWise',
      type: 'Systems Tooling',
      oneliner: 'Memory layout analyzer & optimizer',
      problem: 'Memory misalignment in C structs causes hidden fragmentation and cache misses in high-performance systems.',
      engineering: 'Built a static analysis tool that visualizes padding bytes and suggests optimal member ordering.',
      outcome: 'Optimized memory layout reduced struct size by up to 25% in tested codebases.',
      stack: ['C++', 'Clang', 'React'],
      links: { code: '#' }
    },
    {
      id: 'rag-agent',
      title: 'Self-Correcting RAG',
      type: 'Applied AI',
      oneliner: 'Agentic retrieval system',
      problem: 'Standard RAG systems hallucinate when retrieval fails or context is ambiguous.',
      engineering: 'Implemented a self-correcting feedback loop with graph-based verification of retrieved chunks.',
      outcome: 'Increased factual accuracy by 35% on complex multi-hop queries.',
      stack: ['LangChain', 'Pinecone', 'OpenAI'],
      links: { code: '#' }
    },
  ];

  return (
    <section className="zone zone-understand engineering-projects">
      <div className="zone-content">
        <div className="understand-header">
          <span className="zone-label-eng">ENGINEERING</span>
          <h2 className="zone-title-eng">Selected Work</h2>
        </div>

        <div className="projects-grid-eng">
          {projects.map((project, i) => (
            <ProjectDemo 
              key={project.id} 
              project={project} 
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
