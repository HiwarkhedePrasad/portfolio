'use client';
import React, { useEffect, useRef } from 'react';

const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // --- Star & Animation Constants ---
    const stars = [];
    const isSmallScreen = window.innerWidth < 768;
    const numStars = isSmallScreen ? 60 : 180;

    const mouse = { x: null, y: null };
    
    const connectionDistance = 150;
    const connectionDistSq = connectionDistance * connectionDistance;
    const mouseMaxDist = connectionDistance * 1.5;
    const mouseMaxDistSq = mouseMaxDist * mouseMaxDist;

    // --- Star Class with subtle color tinting ---
    class Star {
      constructor(id) {
        this.id = id;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        // Random color tint (mostly white, occasionally cyan/violet)
        const colorRand = Math.random();
        if (colorRand > 0.9) {
          this.color = 'rgba(6, 182, 212, 0.8)'; // Cyan
        } else if (colorRand > 0.8) {
          this.color = 'rgba(139, 92, 246, 0.8)'; // Violet
        } else {
          this.color = 'rgba(255, 255, 255, 0.7)';
        }
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < numStars; i++) {
      stars.push(new Star(i));
    }

    // --- Spatial Hash Grid for Optimization ---
    class SpatialHashGrid {
      constructor(cellSize) {
        this.cellSize = cellSize;
        this.grid = new Map();
      }

      _getKey(x, y) {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);
        return `${cellX},${cellY}`;
      }

      clear() {
        this.grid.clear();
      }

      insert(star) {
        const key = this._getKey(star.x, star.y);
        if (!this.grid.has(key)) {
          this.grid.set(key, []);
        }
        this.grid.get(key).push(star);
      }

      getNearby(x, y) {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);
        const nearbyStars = [];

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const key = `${cellX + i},${cellY + j}`;
            if (this.grid.has(key)) {
              nearbyStars.push(...this.grid.get(key));
            }
          }
        }
        return nearbyStars;
      }
    }

    const grid = new SpatialHashGrid(connectionDistance);

    // --- Event Handlers ---
    const handleWindowMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleWindowMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleWindowMouseLeave, { passive: true });

    // --- Animation Loop ---
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      grid.clear();

      stars.forEach((star) => {
        star.update();
        star.draw();
        grid.insert(star);
      });

      // Draw connections between nearby stars
      ctx.lineWidth = 0.5;
      stars.forEach((star) => {
        const neighbors = grid.getNearby(star.x, star.y);
        neighbors.forEach((neighbor) => {
          if (star.id < neighbor.id) {
            const dx = star.x - neighbor.x;
            const dy = star.y - neighbor.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < connectionDistSq) {
              const opacity = 0.12 * (1 - distSq / connectionDistSq);
              // Gradient line color
              const gradient = ctx.createLinearGradient(star.x, star.y, neighbor.x, neighbor.y);
              gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity})`);
              gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
              ctx.strokeStyle = gradient;
              ctx.beginPath();
              ctx.moveTo(star.x, star.y);
              ctx.lineTo(neighbor.x, neighbor.y);
              ctx.stroke();
            }
          }
        });
      });

      // Draw connections to mouse
      if (mouse.x !== null && mouse.y !== null) {
        ctx.lineWidth = 1;
        const nearbyStars = grid.getNearby(mouse.x, mouse.y);
        
        nearbyStars.forEach((star) => {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseMaxDistSq) {
            const opacity = 0.4 * (1 - distSq / mouseMaxDistSq);
            const gradient = ctx.createLinearGradient(star.x, star.y, mouse.x, mouse.y);
            gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseleave', handleWindowMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Aurora Background Overlay */}
      <div className="aurora-bg" />
      {/* Star Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
    </>
  );
};

export default StarBackground;