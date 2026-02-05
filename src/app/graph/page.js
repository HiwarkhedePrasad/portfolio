'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const GraphPage = () => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const hoveredNodeRef = useRef(null);
  const svgRef = useRef(null);

  const nodes = useMemo(() => [
    { id: 'core', label: 'Prasad', x: 0.5, y: 0.5, size: 35, type: 'center' },
    { id: 'systems', label: 'Systems', x: 0.22, y: 0.25, size: 28, type: 'domain' },
    { id: 'memory', label: 'Memory Opt', x: 0.12, y: 0.12, size: 18, type: 'skill' },
    { id: 'struct', label: 'Struct Analysis', x: 0.15, y: 0.4, size: 18, type: 'skill' },
    { id: 'profiling', label: 'Profiling', x: 0.1, y: 0.28, size: 16, type: 'skill' },
    { id: 'ai', label: 'AI / ML', x: 0.78, y: 0.25, size: 28, type: 'domain' },
    { id: 'rag', label: 'RAG', x: 0.88, y: 0.12, size: 18, type: 'skill' },
    { id: 'langgraph', label: 'LangGraph', x: 0.85, y: 0.4, size: 18, type: 'skill' },
    { id: 'llm', label: 'Local LLMs', x: 0.9, y: 0.28, size: 16, type: 'skill' },
    { id: 'fullstack', label: 'Full-Stack', x: 0.22, y: 0.75, size: 28, type: 'domain' },
    { id: 'react', label: 'React', x: 0.12, y: 0.68, size: 18, type: 'skill' },
    { id: 'nextjs', label: 'Next.js', x: 0.15, y: 0.88, size: 18, type: 'skill' },
    { id: 'node', label: 'Node.js', x: 0.1, y: 0.78, size: 16, type: 'skill' },
    { id: 'tooling', label: 'Tooling', x: 0.78, y: 0.75, size: 28, type: 'domain' },
    { id: 'vscode', label: 'VS Code Ext', x: 0.88, y: 0.68, size: 18, type: 'skill' },
    { id: 'cli', label: 'CLI Tools', x: 0.85, y: 0.88, size: 18, type: 'skill' },
    { id: 'devx', label: 'DevX', x: 0.9, y: 0.78, size: 16, type: 'skill' },
  ], []);

  const edges = useMemo(() => [
    { from: 'core', to: 'systems' },
    { from: 'core', to: 'ai' },
    { from: 'core', to: 'fullstack' },
    { from: 'core', to: 'tooling' },
    { from: 'systems', to: 'memory' },
    { from: 'systems', to: 'struct' },
    { from: 'systems', to: 'profiling' },
    { from: 'ai', to: 'rag' },
    { from: 'ai', to: 'langgraph' },
    { from: 'ai', to: 'llm' },
    { from: 'fullstack', to: 'react' },
    { from: 'fullstack', to: 'nextjs' },
    { from: 'fullstack', to: 'node' },
    { from: 'tooling', to: 'vscode' },
    { from: 'tooling', to: 'cli' },
    { from: 'tooling', to: 'devx' },
    { from: 'struct', to: 'vscode' },
    { from: 'rag', to: 'langgraph' },
    { from: 'react', to: 'nextjs' },
  ], []);

  const nodeMap = useMemo(() => {
    const map = {};
    nodes.forEach(n => map[n.id] = n);
    return map;
  }, [nodes]);

  const connectedMap = useMemo(() => {
    const map = {};
    nodes.forEach(n => map[n.id] = new Set());
    edges.forEach(e => {
      map[e.from].add(e.to);
      map[e.to].add(e.from);
    });
    return map;
  }, [nodes, edges]);

  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth - 48, 1200);
      const height = Math.min(window.innerHeight - 200, 700);
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Pure CSS-based hover - no React state, no re-renders
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseEnter = (e) => {
      const nodeId = e.currentTarget.dataset.nodeId;
      if (!nodeId) return;
      
      hoveredNodeRef.current = nodeId;
      
      // Highlight this node
      e.currentTarget.querySelector('circle').setAttribute('fill', '#fff');
      e.currentTarget.querySelector('text').setAttribute('fill', '#fff');
      
      // Highlight connected nodes and edges
      const connected = connectedMap[nodeId];
      connected?.forEach(connId => {
        const connNode = svg.querySelector(`[data-node-id="${connId}"]`);
        if (connNode) {
          connNode.querySelector('circle').setAttribute('fill', '#fff');
          connNode.querySelector('text').setAttribute('fill', '#fff');
        }
      });
      
      // Highlight edges
      svg.querySelectorAll('line').forEach(line => {
        const from = line.dataset.from;
        const to = line.dataset.to;
        if (from === nodeId || to === nodeId) {
          line.setAttribute('stroke', '#fff');
          line.setAttribute('stroke-width', '2');
        }
      });
    };

    const handleMouseLeave = (e) => {
      const nodeId = e.currentTarget.dataset.nodeId;
      if (!nodeId) return;
      
      hoveredNodeRef.current = null;
      
      // Reset this node
      const node = nodeMap[nodeId];
      const baseFill = node.type === 'center' ? '#fff' : node.type === 'domain' ? '#3a3a3a' : '#1f1f1f';
      e.currentTarget.querySelector('circle').setAttribute('fill', baseFill);
      e.currentTarget.querySelector('text').setAttribute('fill', '#8a8a8a');
      
      // Reset connected nodes
      const connected = connectedMap[nodeId];
      connected?.forEach(connId => {
        const connNode = svg.querySelector(`[data-node-id="${connId}"]`);
        const cNode = nodeMap[connId];
        if (connNode && cNode) {
          const cFill = cNode.type === 'center' ? '#fff' : cNode.type === 'domain' ? '#3a3a3a' : '#1f1f1f';
          connNode.querySelector('circle').setAttribute('fill', cFill);
          connNode.querySelector('text').setAttribute('fill', '#8a8a8a');
        }
      });
      
      // Reset edges
      svg.querySelectorAll('line').forEach(line => {
        line.setAttribute('stroke', '#2a2a2a');
        line.setAttribute('stroke-width', '1');
      });
    };

    const nodeGroups = svg.querySelectorAll('[data-node-id]');
    nodeGroups.forEach(g => {
      g.addEventListener('mouseenter', handleMouseEnter);
      g.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      nodeGroups.forEach(g => {
        g.removeEventListener('mouseenter', handleMouseEnter);
        g.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [nodeMap, connectedMap]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-6xl mx-auto mb-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Overview
        </Link>
        
        <h1 className="text-3xl font-semibold text-white mb-2">Capabilities Graph</h1>
        <p className="text-gray-400">Interactive visualization of skills. Hover to explore connections.</p>
      </div>

      <div className="max-w-6xl mx-auto bg-[#0f0f0f] border border-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-6 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white" />
            <span>Core</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-600" />
            <span>Domain</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-800 border border-gray-600" />
            <span>Skill</span>
          </div>
        </div>

        <svg 
          ref={svgRef}
          width={dimensions.width} 
          height={dimensions.height}
          className="overflow-visible"
        >
          {/* Edges - static render */}
          {edges.map((edge, i) => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            
            return (
              <line
                key={i}
                data-from={edge.from}
                data-to={edge.to}
                x1={from.x * dimensions.width}
                y1={from.y * dimensions.height}
                x2={to.x * dimensions.width}
                y2={to.y * dimensions.height}
                stroke="#2a2a2a"
                strokeWidth="1"
              />
            );
          })}

          {/* Nodes - static render, hover handled by DOM */}
          {nodes.map((node) => {
            const x = node.x * dimensions.width;
            const y = node.y * dimensions.height;
            const baseFill = node.type === 'center' ? '#fff' 
              : node.type === 'domain' ? '#3a3a3a' : '#1f1f1f';
            const labelY = node.size + 16;
            
            return (
              <g 
                key={node.id}
                data-node-id={node.id}
                transform={`translate(${x}, ${y})`}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={node.size}
                  fill={baseFill}
                  stroke={node.type === 'center' ? '#fff' : '#5a5a5a'}
                  strokeWidth="1"
                />
                
                <text
                  y={labelY}
                  textAnchor="middle"
                  fill="#8a8a8a"
                  style={{ 
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: node.type === 'skill' ? '10px' : '12px',
                    pointerEvents: 'none',
                  }}
                >
                  {node.label}
                </text>

                {node.type === 'center' && (
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#0a0a0a"
                    style={{ fontFamily: 'ui-sans-serif', fontSize: '14px', fontWeight: 600, pointerEvents: 'none' }}
                  >
                    PH
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </main>
  );
};

export default GraphPage;
