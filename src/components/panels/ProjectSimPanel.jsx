'use client';
import React, { useState, useEffect, useRef } from 'react';

// Packet animation for Chat-Secure
const PacketAnimation = () => {
  const [packets, setPackets] = useState([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const createPacket = () => {
      const id = Date.now();
      const newPacket = {
        id,
        x: 10,
        y: 30 + Math.random() * 40,
        speed: 1 + Math.random() * 2,
        encrypted: Math.random() > 0.3,
      };
      setPackets(prev => [...prev.slice(-8), newPacket]);
    };

    const interval = setInterval(createPacket, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animate = () => {
      setPackets(prev => 
        prev
          .map(p => ({ ...p, x: p.x + p.speed }))
          .filter(p => p.x < 100)
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {/* Server nodes */}
      <rect x="5" y="40" width="12" height="20" rx="2" fill="#1e293b" stroke="#06b6d4" strokeWidth="0.5" />
      <rect x="83" y="40" width="12" height="20" rx="2" fill="#1e293b" stroke="#06b6d4" strokeWidth="0.5" />
      
      {/* Connection line */}
      <line x1="17" y1="50" x2="83" y2="50" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
      
      {/* Packets */}
      {packets.map(packet => (
        <g key={packet.id} transform={`translate(${packet.x}, ${packet.y})`}>
          <rect
            x="-4"
            y="-3"
            width="8"
            height="6"
            rx="1"
            fill={packet.encrypted ? '#22c55e' : '#ef4444'}
            opacity="0.8"
          />
          {packet.encrypted && (
            <text x="0" y="1" textAnchor="middle" fontSize="3" fill="white">🔒</text>
          )}
        </g>
      ))}
      
      {/* Labels */}
      <text x="11" y="70" textAnchor="middle" fontSize="4" fill="#64748b">Client</text>
      <text x="89" y="70" textAnchor="middle" fontSize="4" fill="#64748b">Server</text>
    </svg>
  );
};

// Memory visualization for ByteWise
const MemoryAnimation = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // Generate memory layout
    const generateLayout = () => {
      const newBlocks = [];
      for (let i = 0; i < 32; i++) {
        newBlocks.push({
          id: i,
          used: Math.random() > 0.3,
          padding: Math.random() > 0.7,
        });
      }
      setBlocks(newBlocks);
    };

    generateLayout();
    const interval = setInterval(generateLayout, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <text x="50" y="12" textAnchor="middle" fontSize="5" fill="#64748b">Struct Memory Layout</text>
      
      {blocks.map((block, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const x = 10 + col * 10;
        const y = 20 + row * 18;
        
        return (
          <rect
            key={block.id}
            x={x}
            y={y}
            width="9"
            height="15"
            rx="1"
            fill={block.padding ? '#ef444440' : block.used ? '#8b5cf640' : 'transparent'}
            stroke={block.padding ? '#ef4444' : '#8b5cf6'}
            strokeWidth="0.5"
            style={{ transition: 'all 0.5s ease' }}
          />
        );
      })}
      
      <g transform="translate(10, 95)">
        <rect x="0" y="-5" width="6" height="4" fill="#8b5cf640" stroke="#8b5cf6" strokeWidth="0.3" />
        <text x="9" y="-2" fontSize="3" fill="#64748b">Data</text>
        <rect x="25" y="-5" width="6" height="4" fill="#ef444440" stroke="#ef4444" strokeWidth="0.3" />
        <text x="34" y="-2" fontSize="3" fill="#64748b">Padding (Wasted)</text>
      </g>
    </svg>
  );
};

// AI decision flow for RAG Agent
const RAGAnimation = () => {
  const [step, setStep] = useState(0);
  const steps = ['Query', 'Retrieve', 'Grade', 'Correct', 'Generate'];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % steps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {steps.map((s, i) => {
        const x = 10 + i * 18;
        const isActive = i === step;
        const isPast = i < step;
        
        return (
          <g key={s}>
            {/* Connection line */}
            {i < steps.length - 1 && (
              <line
                x1={x + 6}
                y1="50"
                x2={x + 18}
                y2="50"
                stroke={isPast ? '#22c55e' : '#1e293b'}
                strokeWidth="1"
                style={{ transition: 'stroke 0.3s ease' }}
              />
            )}
            
            {/* Node */}
            <circle
              cx={x + 3}
              cy="50"
              r={isActive ? 7 : 5}
              fill={isActive ? '#22c55e' : isPast ? '#22c55e40' : '#1e293b'}
              stroke="#22c55e"
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.3s ease' }}
            />
            
            {/* Label */}
            <text
              x={x + 3}
              y="65"
              textAnchor="middle"
              fontSize="4"
              fill={isActive ? '#22c55e' : '#64748b'}
              style={{ transition: 'fill 0.3s ease' }}
            >
              {s}
            </text>
          </g>
        );
      })}
      
      {/* Feedback loop arrow */}
      <path
        d="M 80 45 Q 90 30 50 25 Q 20 25 18 40"
        fill="none"
        stroke="#64748b"
        strokeWidth="0.5"
        strokeDasharray="2 1"
        markerEnd="url(#arrowhead)"
      />
      <text x="50" y="20" textAnchor="middle" fontSize="3" fill="#64748b">Self-correction loop</text>
      
      <defs>
        <marker id="arrowhead" markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
};

const ProjectSimPanel = () => {
  const [activeProject, setActiveProject] = useState(0);
  
  const projects = [
    { 
      id: 'chat-secure', 
      name: 'Chat-Secure', 
      desc: 'Zero-trace encrypted messaging',
      component: PacketAnimation 
    },
    { 
      id: 'bytewise', 
      name: 'ByteWise', 
      desc: 'C/C++ struct memory optimizer',
      component: MemoryAnimation 
    },
    { 
      id: 'rag-agent', 
      name: 'RAG Agent', 
      desc: 'Self-correcting AI chatbot',
      component: RAGAnimation 
    },
  ];

  const ActiveComponent = projects[activeProject].component;

  return (
    <div className="glass-panel panel-simulation flex flex-col overflow-hidden">
      {/* Header with tabs */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div>
          <h2 className="text-lg font-semibold text-white">Project Simulation</h2>
          <p className="text-xs text-gray-500">Live interactive demos</p>
        </div>
        
        <div className="flex gap-1">
          {projects.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(i)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                activeProject === i 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>

      {/* Simulation area */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full h-full max-w-md">
          <ActiveComponent />
        </div>
      </div>

      {/* Description */}
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-400 text-center">
          {projects[activeProject].desc}
        </p>
      </div>
    </div>
  );
};

export default ProjectSimPanel;
