'use client';
import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProofStrip — Fast Credibility Section
 * Compact horizontal badges showing achievements, stats, and domains
 * Reduces skepticism immediately after hero
 */
export default function ProofStrip() {
  const proofs = [
    {
      icon: '🏆',
      title: 'Enigma Hackathon',
      subtitle: 'Winner',
      highlight: true,
    },
    {
      icon: '🚀',
      title: 'NASA Space App',
      subtitle: '2nd Runner Up • Nagpur',
      highlight: true,
    },
    {
      icon: '🥇',
      title: 'CIH 2.0 / 3.0',
      subtitle: 'Top 12 • Top 7',
    },
    {
      icon: '💼',
      title: 'Micro Spectra',
      subtitle: 'Internship',
    },
    {
      icon: '📦',
      title: '52+ Repos',
      subtitle: 'Open Source',
    },
    {
      icon: '🤖',
      title: 'AI Agents',
      subtitle: 'Specialty',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="proof-strip">
      <div className="proof-container">
        <motion.div 
          className="proof-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {proofs.map((proof, i) => (
            <motion.div
              key={i}
              className={`proof-item ${proof.highlight ? 'highlight' : ''}`}
              variants={itemVariants}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              <span className="proof-icon">{proof.icon}</span>
              <div className="proof-text">
                <span className="proof-title">{proof.title}</span>
                <span className="proof-subtitle">{proof.subtitle}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
