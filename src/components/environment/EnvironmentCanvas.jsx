'use client';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useInteractionStore from '../../store/useInteractionStore';
import { useGlobalCursor } from '../../hooks/useCursorProximity';

/**
 * Particle system that responds to cursor and scroll position.
 */
function ParticleField({ count = 800 }) {
  const meshRef = useRef();
  const cursor = useGlobalCursor();
  const { scrollProgress, activeZone } = useInteractionStore();

  // Generate particles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, velocities, sizes };
  }, [count]);

  // Zone-based color mapping
  const zoneColors = useMemo(() => ({
    hook: new THREE.Color('#3b82f6'),
    explore: new THREE.Color('#8b5cf6'),
    understand: new THREE.Color('#06b6d4'),
    trust: new THREE.Color('#22c55e'),
    exit: new THREE.Color('#f59e0b'),
  }), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    // Cursor influence
    const cursorX = cursor.normalizedX * 5;
    const cursorY = -cursor.normalizedY * 5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Base movement
      positions[i3] += particles.velocities[i3] + Math.sin(time + i * 0.01) * 0.002;
      positions[i3 + 1] += particles.velocities[i3 + 1] + Math.cos(time + i * 0.01) * 0.002;
      positions[i3 + 2] += particles.velocities[i3 + 2];

      // Cursor attraction (subtle)
      const dx = cursorX - positions[i3];
      const dy = cursorY - positions[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        const force = (3 - dist) * 0.001;
        positions[i3] += dx * force;
        positions[i3 + 1] += dy * force;
      }

      // Wrap around edges
      if (positions[i3] > 10) positions[i3] = -10;
      if (positions[i3] < -10) positions[i3] = 10;
      if (positions[i3 + 1] > 10) positions[i3 + 1] = -10;
      if (positions[i3 + 1] < -10) positions[i3 + 1] = 10;
      if (positions[i3 + 2] > 5) positions[i3 + 2] = -5;
      if (positions[i3 + 2] < -5) positions[i3 + 2] = 5;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Update color based on zone
    const targetColor = zoneColors[activeZone] || zoneColors.hook;
    meshRef.current.material.color.lerp(targetColor, 0.02);

    // Particle density based on scroll (more sparse as you scroll)
    const targetOpacity = 0.6 - scrollProgress * 0.3;
    meshRef.current.material.opacity += (targetOpacity - meshRef.current.material.opacity) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Grid plane that morphs based on scroll.
 */
function GridPlane() {
  const meshRef = useRef();
  const { scrollProgress } = useInteractionStore();

  useFrame(() => {
    if (!meshRef.current) return;
    
    // Rotate grid slightly based on scroll
    meshRef.current.rotation.x = -Math.PI / 2 + scrollProgress * 0.2;
    meshRef.current.rotation.z = scrollProgress * 0.1;
    
    // Move grid depth based on scroll
    meshRef.current.position.z = -5 - scrollProgress * 3;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -5]}>
      <planeGeometry args={[40, 40, 30, 30]} />
      <meshBasicMaterial
        color="#1f1f1f"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

/**
 * Environment Canvas - persistent Three.js background.
 */
export default function EnvironmentCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 5, 25]} />
        
        <ambientLight intensity={0.2} />
        
        <ParticleField count={600} />
        <GridPlane />
      </Canvas>
    </div>
  );
}
