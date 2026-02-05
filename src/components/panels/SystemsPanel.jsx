'use client';
import React, { useRef, useEffect, useState } from 'react';

const SystemsPanel = () => {
  const svgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  // Project nodes with connections
  const nodes = [
    { id: 'core', label: 'Me', x: 0.5, y: 0.5, size: 28, color: '#06b6d4' },
    { id: 'chat-secure', label: 'Chat-Secure', x: 0.2, y: 0.25, size: 20, color: '#ef4444' },
    { id: 'bytewise', label: 'ByteWise', x: 0.8, y: 0.3, size: 20, color: '#8b5cf6' },
    { id: 'rag-agent', label: 'RAG Agent', x: 0.75, y: 0.7, size: 20, color: '#22c55e' },
    { id: 'web-dev', label: 'Web Dev', x: 0.15, y: 0.65, size: 16, color: '#f59e0b' },
    { id: 'ai-ml', label: 'AI/ML', x: 0.35, y: 0.8, size: 16, color: '#ec4899' },
    { id: 'systems', label: 'Systems', x: 0.65, y: 0.15, size: 16, color: '#14b8a6' },
  ];

  const edges = [
    { from: 'core', to: 'chat-secure' },
    { from: 'core', to: 'bytewise' },
    { from: 'core', to: 'rag-agent' },
    { from: 'core', to: 'web-dev' },
    { from: 'core', to: 'ai-ml' },
    { from: 'core', to: 'systems' },
    { from: 'chat-secure', to: 'systems' },
    { from: 'bytewise', to: 'systems' },
    { from: 'rag-agent', to: 'ai-ml' },
    { from: 'web-dev', to: 'chat-secure' },
  ];

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const { width, height } = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getNodePosition = (node) => ({
    x: node.x * dimensions.width,
    y: node.y * dimensions.height,
  });

  const getNode = (id) => nodes.find(n => n.id === id);

  return (
    <div className="glass-panel panel-systems p-4 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Systems Graph</h2>
          <p className="text-xs text-gray-500">How my projects connect</p>
        </div>
        {hoveredNode && hoveredNode !== 'core' && (
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="text-xs text-cyan-400">{getNode(hoveredNode)?.label}</span>
          </div>
        )}
      </div>

      {/* Graph SVG */}
      <div className="flex-1 relative">
        <svg 
          ref={svgRef} 
          width="100%" 
          height="100%" 
          className="overflow-visible"
        >
          {/* Edges */}
          {edges.map((edge, i) => {
            const from = getNode(edge.from);
            const to = getNode(edge.to);
            const fromPos = getNodePosition(from);
            const toPos = getNodePosition(to);
            const isActive = hoveredNode === edge.from || hoveredNode === edge.to;
            
            return (
              <line
                key={i}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                className={`graph-edge ${isActive ? 'active' : ''}`}
                style={{
                  stroke: isActive ? from.color : undefined,
                  opacity: isActive ? 0.8 : 0.2,
                }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const pos = getNodePosition(node);
            const isHovered = hoveredNode === node.id;
            const isConnected = edges.some(
              e => (e.from === hoveredNode && e.to === node.id) ||
                   (e.to === hoveredNode && e.from === node.id)
            );
            
            return (
              <g 
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
                style={{ transition: 'transform 0.3s ease' }}
              >
                {/* Pulse ring on hover */}
                {isHovered && (
                  <circle
                    r={node.size + 10}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="2"
                    opacity="0.3"
                    style={{
                      animation: 'pulse-ring 1s ease-out infinite',
                    }}
                  />
                )}
                
                {/* Main node */}
                <circle
                  r={isHovered ? node.size + 4 : node.size}
                  fill={isHovered || isConnected ? node.color + '30' : 'var(--bg-secondary)'}
                  stroke={node.color}
                  strokeWidth={isHovered ? 3 : 2}
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 10px ${node.color}60)` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                />
                
                {/* Label */}
                <text
                  y={node.size + 16}
                  textAnchor="middle"
                  className="text-xs fill-gray-400 pointer-events-none"
                  style={{
                    opacity: isHovered || isConnected || node.id === 'core' ? 1 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default SystemsPanel;
