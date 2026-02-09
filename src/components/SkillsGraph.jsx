'use client';
import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const SkillsGraph = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Composite = Matter.Composite,
          Constraint = Matter.Constraint;

    const engine = Engine.create();
    engine.world.gravity.y = 0; // Zero gravity for floating effect

    const width = containerRef.current.clientWidth;
    const height = 400; // Fixed height for the banner

    const render = Render.create({
      element: containerRef.current,
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      }
    });

    // --- Data ---
    const centerSkill = { label: 'Me', r: 30, color: '#3b82f6' };
    const skills = [
      // Languages
      { label: 'JavaScript', category: 'frontend' },
      { label: 'TypeScript', category: 'frontend' },
      { label: 'Python', category: 'backend' },
      { label: 'Java', category: 'backend' },
      { label: 'C++', category: 'systems' },
      { label: 'Rust', category: 'systems' },
      { label: 'SQL', category: 'db' },
      
      // Frontend
      { label: 'React', category: 'frontend' },
      { label: 'Next.js', category: 'frontend' },
      { label: 'Tailwind', category: 'frontend' },
      { label: 'Three.js', category: 'creative' },
      { label: 'Framer', category: 'creative' },
      { label: 'Redux', category: 'frontend' },
      { label: 'HTML5', category: 'frontend' },
      { label: 'CSS3', category: 'frontend' },

      // Backend
      { label: 'Node.js', category: 'backend' },
      { label: 'Express', category: 'backend' },
      { label: 'Django', category: 'backend' },
      { label: 'FastAPI', category: 'backend' },
      { label: 'GraphQL', category: 'backend' },
      { label: 'WebSockets', category: 'backend' },

      // Database
      { label: 'PostgreSQL', category: 'db' },
      { label: 'MongoDB', category: 'db' },
      { label: 'Redis', category: 'db' },
      { label: 'Vector DB', category: 'ai' },

      // AI / ML
      { label: 'PyTorch', category: 'ai' },
      { label: 'TensorFlow', category: 'ai' },
      { label: 'LangChain', category: 'ai' },
      { label: 'RAG', category: 'ai' },
      { label: 'LLMs', category: 'ai' },
      { label: 'OpenCV', category: 'ai' },
      { label: 'HuggingFace', category: 'ai' },
      { label: 'Scikit-learn', category: 'ai' },

      // DevOps & Tools
      { label: 'Docker', category: 'devops' },
      { label: 'Kubernetes', category: 'devops' },
      { label: 'AWS', category: 'devops' },
      { label: 'Git', category: 'devops' },
      { label: 'Linux', category: 'systems' },
      { label: 'Nginx', category: 'devops' },
      { label: 'CI/CD', category: 'devops' },
    ];

    const categoryColors = {
      frontend: '#60a5fa', // blue-400
      backend: '#34d399',  // emerald-400
      db: '#f472b6',       // pink-400
      creative: '#a78bfa', // violet-400
      devops: '#fbbf24',   // amber-400
      ai: '#f87171',       // red-400
      systems: '#6366f1',  // indigo-500
    };

    // --- Bodies ---
    const centerX = width / 2;
    const centerY = height / 2;

    const centerBody = Bodies.circle(centerX, centerY, centerSkill.r, {
      label: centerSkill.label,
      render: {
        fillStyle: centerSkill.color,
        strokeStyle: '#ffffff',
        lineWidth: 2,
      },
      isStatic: true, // Keep center fixed
    });

    const skillBodies = skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const dist = 100 + Math.random() * 50;
      const x = centerX + Math.cos(angle) * dist;
      const y = centerY + Math.sin(angle) * dist;
      const r = 15 + Math.random() * 10; // Slightly smaller radius for density
      const color = categoryColors[skill.category] || '#9ca3af';

      return Bodies.circle(x, y, r, {
        label: skill.label,
        frictionAir: 0.05,
        restitution: 0.9,
        render: {
          fillStyle: '#1f2937', // Dark bg
          strokeStyle: color,
          lineWidth: 2,
        },
      });
    });

    // --- Constraints (Springs) ---
    const constraints = skillBodies.map(body => {
      return Constraint.create({
        bodyA: centerBody,
        bodyB: body,
        stiffness: 0.005,
        damping: 0.1,
        length: 120 + Math.random() * 50,
        render: {
          strokeStyle: '#374151',
          type: 'line',
        }
      });
    });

    // Inter-skill constraints (random connections for mesh look)
    const extraConstraints = [];
    for (let i = 0; i < skillBodies.length; i++) {
        if (Math.random() > 0.7) { // 30% chance to connect to neighbor
            const nextIdx = (i + 1) % skillBodies.length;
             extraConstraints.push(Constraint.create({
                bodyA: skillBodies[i],
                bodyB: skillBodies[nextIdx],
                stiffness: 0.002,
                damping: 0.1,
                length: 80,
                render: {
                    strokeStyle: '#374151',
                    type: 'line',
                    anchors: false
                }
            }));
        }
    }


    World.add(engine.world, [centerBody, ...skillBodies, ...constraints, ...extraConstraints]);

    // --- Mouse Control ---
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // --- Custom Rendering for Text ---
    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      ctx.font = '10px "Geist Mono", monospace'; // Use a nice mono font if available
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw Center
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(centerBody.label, centerBody.position.x, centerBody.position.y);

      // Draw Skills
      skillBodies.forEach(body => {
        ctx.fillStyle = '#e5e7eb';
        ctx.font = '10px monospace';
        ctx.fillText(body.label, body.position.x, body.position.y);
      });
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Resize handler
    const handleResize = () => {
      render.canvas.width = containerRef.current.clientWidth;
      render.canvas.height = height; // Keep height fixed or dynamic
      Matter.Body.setPosition(centerBody, {
        x: containerRef.current.clientWidth / 2,
        y: height / 2
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-[#050505] border-y border-gray-900" ref={containerRef}>
        <canvas ref={canvasRef} />
        <div className="absolute top-4 left-4 text-xs text-gray-500 font-mono pointer-events-none">
            INTERACTIVE_SKILL_NET<br/>
            [DRAG_NODES_TO_INTERACT]
        </div>
    </div>
  );
};

export default SkillsGraph;
