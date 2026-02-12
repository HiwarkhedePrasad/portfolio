'use client';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const GraphPage = () => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const svgRef = useRef(null);

  // --- Configuration ---
  const center = { x: 0.5, y: 0.5 };
  const categories = [
    { id: 'frontend', label: 'Frontend', angle: 0, color: '#60a5fa' }, // 0 deg
    { id: 'backend', label: 'Backend', angle: 72, color: '#34d399' },
    { id: 'systems', label: 'Systems', angle: 144, color: '#6366f1' },
    { id: 'ai', label: 'AI / ML', angle: 216, color: '#f87171' },
    { id: 'devops', label: 'DevOps', angle: 288, color: '#fbbf24' },
  ];

  /* 
     Helper to place nodes in a cluster around a category center.
     centerAngle: Direction of the category from the main center.
     distance: Distance from main center.
     spread: How wide the cluster spreads.
  */
  const generateNodes = () => {
    const nodeList = [
        { id: 'core', label: 'Prasad', x: 0.5, y: 0.5, size: 40, type: 'center', color: '#fff' }
    ];
    const edgeList = [];

    categories.forEach((cat, i) => {
        // 1. Place Category Node (Domain)
        const rad = (cat.angle * Math.PI) / 180;
        const dist = 0.25; // Distance from center (0-0.5)
        const catX = center.x + Math.cos(rad) * dist;
        const catY = center.y + Math.sin(rad) * dist;
        
        nodeList.push({
            id: cat.id,
            label: cat.label,
            x: catX,
            y: catY,
            size: 25,
            type: 'domain',
            color: cat.color
        });

        // Connect Domain to Core
        edgeList.push({ from: 'core', to: cat.id });

        // 2. Define Skills for this Category
        let skills = [];
        if (cat.id === 'frontend') skills = ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Three.js', 'Framer', 'Redux', 'HTML5', 'CSS3'];
        if (cat.id === 'backend') skills = ['Node.js', 'Python', 'Java', 'Express', 'Django', 'FastAPI', 'GraphQL', 'WebSockets'];
        if (cat.id === 'systems') skills = ['Rust', 'C++', 'Linux', 'SQL', 'PostgreSQL', 'Redis', 'MongoDB'];
        if (cat.id === 'ai') skills = ['PyTorch', 'TensorFlow', 'RAG', 'LangChain', 'LLMs', 'OpenCV', 'Vector DB'];
        if (cat.id === 'devops') skills = ['Docker', 'K8s', 'AWS', 'Git', 'CI/CD', 'Nginx'];

        // 3. Place Skills around Category Node
        skills.forEach((skill, j) => {
            // Spread skills in a semi-circle pointing away from center
            const offsetAngle = (j - skills.length/2 + 0.5) * (Math.PI / 6); // 30 degree spread per node
            const finalAngle = rad + offsetAngle * 0.8; // dampen spread
            const skillDist = 0.12 + (j % 2) * 0.04; // Stagger distances
            
            const skillX = catX + Math.cos(finalAngle) * skillDist;
            const skillY = catY + Math.sin(finalAngle) * skillDist;

            const skillId = skill.toLowerCase().replace(/[^a-z0-9]/g, '');
            
            nodeList.push({
                id: skillId,
                label: skill,
                x: skillX,
                y: skillY,
                size: 14,
                type: 'skill',
                color: '#94a3b8' // slate-400
            });

            // Connect Skill to Domain
            edgeList.push({ from: cat.id, to: skillId });
        });
    });

    // Add some cross-connections for density 
    edgeList.push({ from: 'react', to: 'nextjs' });
    edgeList.push({ from: 'typescript', to: 'react' });
    edgeList.push({ from: 'node', to: 'express' });
    edgeList.push({ from: 'pytorch', to: 'tensorflow' });
    edgeList.push({ from: 'rag', to: 'langchain' });
    edgeList.push({ from: 'docker', to: 'k8s' });
    edgeList.push({ from: 'sql', to: 'postgresql' });

    return { nodes: nodeList, edges: edgeList };
  };

  const { nodes, edges } = useMemo(() => generateNodes(), []);

  const nodeMap = useMemo(() => {
    const map = {};
    nodes.forEach(n => map[n.id] = n);
    return map;
  }, [nodes]);

  const connectedMap = useMemo(() => {
    const map = {};
    nodes.forEach(n => map[n.id] = new Set());
    edges.forEach(e => {
       // Check if nodes exist to avoid crash on cross-connections if IDs don't match
       if(nodeMap[e.from] && nodeMap[e.to]) {
           map[e.from].add(e.to);
           map[e.to].add(e.from);
       }
    });
    return map;
  }, [nodes, edges, nodeMap]);

  useEffect(() => {
    const updateDimensions = () => {
      // Full viewport minus padding
      setDimensions({ 
          width: window.innerWidth, 
          height: window.innerHeight 
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Hover Interaction Logic
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseEnter = (e) => {
      const nodeId = e.currentTarget.dataset.nodeId;
      if (!nodeId) return;
      
      // Dim all
      svg.style.opacity = '1';
      svg.querySelectorAll('g').forEach(g => g.style.opacity = '0.2');
      svg.querySelectorAll('line').forEach(l => l.style.opacity = '0.1');

      // Highlight Self
      e.currentTarget.style.opacity = '1';
      e.currentTarget.querySelector('circle').setAttribute('stroke', '#fff');
      e.currentTarget.querySelector('circle').setAttribute('stroke-width', '2');

      // Highlight Neighbors
      const neighbors = connectedMap[nodeId];
      if(neighbors){
        neighbors.forEach(nId => {
            const el = svg.querySelector(`[data-node-id="${nId}"]`);
            if(el) el.style.opacity = '1';
            
            // Highlight Edge
            const l1 = svg.querySelector(`line[data-from="${nodeId}"][data-to="${nId}"]`);
            const l2 = svg.querySelector(`line[data-from="${nId}"][data-to="${nodeId}"]`);
            if(l1) { l1.style.opacity = '1'; l1.setAttribute('stroke', '#fff'); }
            if(l2) { l2.style.opacity = '1'; l2.setAttribute('stroke', '#fff'); }
        });
      }
    };

    const handleMouseLeave = (e) => {
       // Reset All
       svg.querySelectorAll('g').forEach(g => {
           g.style.opacity = '1';
           g.querySelector('circle').setAttribute('stroke', 'none');
       });
       svg.querySelectorAll('line').forEach(l => {
           l.style.opacity = '0.3';
           l.setAttribute('stroke', '#334155');
       });
    };

    const nodesEls = svg.querySelectorAll('[data-node-id]');
    nodesEls.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
        nodesEls.forEach(el => {
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
        });
    };
  }, [nodes, connectedMap]);


  return (
    <main className="min-h-screen bg-[#050505] overflow-hidden relative">
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur border border-gray-800 rounded-full text-sm text-gray-300 hover:text-white hover:border-white transition-all"
        >
          <ArrowLeft size={16} />
          Back to Overview
        </Link>
      </div>

      <div className="absolute bottom-6 right-6 z-10 text-right pointer-events-none opacity-50">
           <h1 className="text-6xl font-black text-gray-800 tracking-tighter select-none">SKILL GRAPH</h1>
      </div>

      <div className="w-full h-screen flex items-center justify-center">
         <svg 
            ref={svgRef}
            width={dimensions.width} 
            height={dimensions.height}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            className="transition-all duration-300 ease-out"
         >
            {/* Edges */}
            {edges.map((e, i) => {
                const n1 = nodeMap[e.from];
                const n2 = nodeMap[e.to];
                if(!n1 || !n2) return null;
                return (
                    <line 
                        key={i}
                        data-from={e.from}
                        data-to={e.to}
                        x1={(n1.x * dimensions.width).toFixed(3)}
                        y1={(n1.y * dimensions.height).toFixed(3)}
                        x2={(n2.x * dimensions.width).toFixed(3)}
                        y2={(n2.y * dimensions.height).toFixed(3)}
                        stroke="#334155"
                        strokeWidth="1"
                        opacity="0.3"
                        className="transition-all duration-300"
                    />
                );
            })}

            {/* Nodes */}
            {nodes.map((n) => (
                <g 
                    key={n.id} 
                    data-node-id={n.id}
                    className="group cursor-pointer transition-all duration-300"
                    transform={`translate(${(n.x * dimensions.width).toFixed(3)}, ${(n.y * dimensions.height).toFixed(3)})`}
                >
                    <circle 
                        r={n.size} 
                        fill={n.type === 'center' ? '#fff' : '#1e293b'} // slate-800
                        stroke="none"
                        className="transition-all duration-300"
                    />
                    
                    {/* Inner Colored Dot for Domains */}
                    {n.type === 'domain' && (
                        <circle r={6} fill={n.color} />
                    )}
                     {/* Small Dot for Skills */}
                    {n.type === 'skill' && (
                        <circle r={3} fill={n.color} />
                    )}

                    <text 
                        y={n.size + 15} 
                        fill="#94a3b8" 
                        textAnchor="middle" 
                        className="text-[10px] font-mono tracking-widest uppercase opacity-70 group-hover:opacity-100 group-hover:fill-white transition-all"
                    >
                        {n.label}
                    </text>
                    
                    {n.type === 'center' && (
                         <text y="5" textAnchor="middle" fill="#000" fontWeight="bold" fontSize="12">PH</text>
                    )}
                </g>
            ))}
         </svg>
      </div>
    </main>
  );
};

export default GraphPage;
