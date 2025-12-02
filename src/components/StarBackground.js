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
    const numStars = 150;
    const mouse = { x: null, y: null };
    
    // Pre-calculate squared distances
    const connectionDistance = 150;
    const connectionDistSq = connectionDistance * connectionDistance;
    const mouseMaxDist = connectionDistance * 1.5;
    const mouseMaxDistSq = mouseMaxDist * mouseMaxDist;

    // --- Star Class ---
    class Star {
      constructor(id) {
        this.id = id;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
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
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
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

      ctx.lineWidth = 0.5;
      stars.forEach((star) => {
        const neighbors = grid.getNearby(star.x, star.y);
        neighbors.forEach((neighbor) => {
          if (star.id < neighbor.id) {
            const dx = star.x - neighbor.x;
            const dy = star.y - neighbor.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < connectionDistSq) {
              const opacity = 0.15 * (1 - distSq / connectionDistSq);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.beginPath();
              ctx.moveTo(star.x, star.y);
              ctx.lineTo(neighbor.x, neighbor.y);
              ctx.stroke();
            }
          }
        });
      });

      if (mouse.x !== null && mouse.y !== null) {
        ctx.lineWidth = 1;
        const nearbyStars = grid.getNearby(mouse.x, mouse.y);
        
        nearbyStars.forEach((star) => {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseMaxDistSq) {
            const opacity = 0.3 * (1 - distSq / mouseMaxDistSq);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
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
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
    </>
  );
};

export default StarBackground;
