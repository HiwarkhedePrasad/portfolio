"use client";
import React, { useEffect, useRef, useState } from "react";

const Skills = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [matterLoaded, setMatterLoaded] = useState(false);

  // Skill Data
  const skills = [
    { name: "React", slug: "react", color: "#61DAFB" },
    { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
    { name: "TypeScript", slug: "typescript", color: "#3178C6" },
    { name: "Tailwind", slug: "tailwindcss", color: "#06B6D4" },
    { name: "Redux", slug: "redux", color: "#764ABC" },
    { name: "Node.js", slug: "nodedotjs", color: "#339933" },
    { name: "Python", slug: "python", color: "#3776AB" },
    { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
    { name: "Firebase", slug: "firebase", color: "#FFCA28" },
    { name: "Flutter", slug: "flutter", color: "#02569B" },
    { name: "Android", slug: "android", color: "#3DDC84" },
    { name: "Git", slug: "git", color: "#F05032" },
    { name: "Docker", slug: "docker", color: "#2496ED" },
    { name: "AWS", slug: "amazonwebservices", color: "#FF9900" },
    { name: "Ollama", slug: "ollama", color: "#ffffff" },
    { name: "MongoDB", slug: "mongodb", color: "#47A248" },
    { name: "Express", slug: "express", color: "#ffffff" },
    { name: "Prisma", slug: "prisma", color: "#2D3748" },
    { name: "Figma", slug: "figma", color: "#F24E1E" },
  ];

  useEffect(() => {
    if (window.Matter) {
      setMatterLoaded(true);
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js";
      script.async = true;
      script.onload = () => setMatterLoaded(true);
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!matterLoaded || !canvasRef.current || !containerRef.current) return;

    const Matter = window.Matter;
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      Runner = Matter.Runner,
      Events = Matter.Events;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const engine = Engine.create({
      positionIterations: 20,
      velocityIterations: 20,
      constraintIterations: 10,
    });
    engineRef.current = engine;

    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
      },
    });

    // --- WALLS ---
    let walls = [];
    const addWalls = (w, h) => {
      const wallThickness = 100;
      const ground = Bodies.rectangle(w / 2, h + wallThickness / 2, w, wallThickness, { isStatic: true, render: { visible: false } });
      const ceiling = Bodies.rectangle(w / 2, -wallThickness / 2, w, wallThickness, { isStatic: true, render: { visible: false } });
      const leftWall = Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h, { isStatic: true, render: { visible: false } });
      const rightWall = Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h, { isStatic: true, render: { visible: false } });
      walls = [ground, ceiling, leftWall, rightWall];
      World.add(engine.world, walls);
    };
    addWalls(width, height);

    // --- SKILLS CREATION ---
    const createSkillNode = (x, y, radius, skill) => {
      const body = Bodies.circle(x, y, radius, {
        restitution: 0.6, // Slightly bouncier
        friction: 0.001,
        // --- CHANGED: Lower air friction for faster movement (was 0.05) ---
        frictionAir: 0.04, 
        mass: 1, 
        render: {
           fillStyle: "transparent",
           strokeStyle: skill.color,
           lineWidth: 0,
        },
        label: skill.name,
      });

      const img = new Image();
      img.src = `https://cdn.simpleicons.org/${skill.slug}/${skill.color.replace("#", "")}`;

      img.onload = () => {
        const availableSpace = radius * 2 * 0.70; 
        const imageSize = Math.max(img.width, img.height);
        const scale = availableSpace / (imageSize || 24); 
        body.render.sprite.texture = img.src;
        body.render.sprite.xScale = scale;
        body.render.sprite.yScale = scale;
      };

      return body;
    };

    const iconRadius = width < 768 ? 25 : 40; 
    const bodies = [];

    skills.forEach((skill) => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const body = createSkillNode(x, y, iconRadius, skill);
      bodies.push(body);
    });

    World.add(engine.world, bodies);

    // --- INTERACTION ---
    const mouse = Mouse.create(render.canvas);
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    
    const updateMouseScale = () => {
        const currentRect = render.canvas.getBoundingClientRect();
        const scaleX = render.canvas.width / currentRect.width;
        const scaleY = render.canvas.height / currentRect.height;
        Mouse.setScale(mouse, { x: scaleX, y: scaleY });
    };
    render.mouse = mouse;

    Events.on(engine, "beforeUpdate", () => {
      updateMouseScale();
      const mousePos = mouse.position;
      const time = engine.timing.timestamp;
      
      const canvasCenter = {
        x: render.canvas.width / 2,
        y: render.canvas.height / 2
      };

      bodies.forEach((body, index) => {
        // 1. AMBIENT FLOAT (Faster Drift)
        // Increased multiplier from 0.00005 to 0.0002 for more life
        const oscX = Math.sin(time * 0.001 + index) * 0.00008; 
        const oscY = Math.cos(time * 0.001 + index) * 0.00008;
        
        Matter.Body.applyForce(body, body.position, { x: oscX, y: oscY });

        // 2. CENTER ATTRACTION
        const dx = canvasCenter.x - body.position.x;
        const dy = canvasCenter.y - body.position.y;
        
        // Increased slightly to keep them together since they move faster now
        const forceStrength = 0.000008; 
        Matter.Body.applyForce(body, body.position, {
          x: dx * forceStrength * body.mass,
          y: dy * forceStrength * body.mass
        });

        // 3. MOUSE REPULSION (Stronger & Wider)
        const mDx = body.position.x - mousePos.x;
        const mDy = body.position.y - mousePos.y;
        const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
        
        // --- CHANGED: Repel Range increased from 100 to 250 ---
        const repelRange = 250; 

        if (mDist < repelRange) {
          // --- CHANGED: Repel Force increased significantly ---
          const repelForce = 0.05 * (1 - mDist / repelRange);
          Matter.Body.applyForce(body, body.position, {
            x: (mDx / mDist) * repelForce * body.mass,
            y: (mDy / mDist) * repelForce * body.mass,
          });
        }
      });
    });

    Runner.run(engine);
    Render.run(render);

    const handleResize = () => {
      if(!containerRef.current) return;
      const newRect = containerRef.current.getBoundingClientRect();
      const newWidth = newRect.width;
      const newHeight = newRect.height;
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      World.remove(engine.world, walls);
      walls = [];
      addWalls(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      Runner.stop(engine);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [matterLoaded]);

  return (
    <div 
      id="skills"
      ref={containerRef}
      className="flex h-[80vh] w-full overflow-hidden items-center justify-center relative bg-slate-900/0"
    >
      <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none flex flex-col justify-start pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
            My Skills
          </h2>
          <p className="text-slate-400 max-w-2xl">
            A dynamic representation of the technologies I work with. 
            Move your mouse to interact with the cloud.
          </p>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="z-20 w-full h-full block"
      />
    </div>
  );
};

export default Skills;