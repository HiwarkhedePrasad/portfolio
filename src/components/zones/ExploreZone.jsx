'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function ExploreZone() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const skills = {
    core: [
      { name: 'Systems Architecture', desc: 'Designing fault-tolerant distributed networks' },
      { name: 'Applied AI', desc: 'RAG pipelines, Agentic workflows, Local LLMs' },
      { name: 'Security Engineering', desc: 'Zero-trust architecture, Cryptography, DDoS defense' },
    ],
    tech: [
      'Rust', 'Go', 'Python', 'TypeScript', 
      'Docker', 'Kubernetes', 'Terraform', 
      'LangChain', 'PyTorch', 'PostgreSQL'
    ],
    specialization: [
      'Distributed Systems',
      'Cryptography',
      'LLM Ops'
    ]
  };

  return (
    <section className="zone zone-explore">
      <div className="zone-content-narrow">
        <motion.div 
          className="explore-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="zone-label">CAPABILITIES</span>
          <h2 className="zone-title">Technical Arsenal</h2>
        </motion.div>

        <motion.div 
          className="skills-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Column 1: Core Expertise */}
          <div className="skill-column">
            <h3 className="column-title">Core Expertise</h3>
            <div className="core-list">
              {skills.core.map((item, i) => (
                <motion.div key={i} className="core-item" variants={fadeInUp}>
                  <h4 className="core-name">{item.name}</h4>
                  <p className="core-desc">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Technologies */}
          <div className="skill-column">
            <h3 className="column-title">Technologies</h3>
            <div className="tech-list">
              {skills.tech.map((tech, i) => (
                <motion.span 
                  key={tech} 
                  className="tech-badge"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, color: '#fff', borderColor: '#3b82f6' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Column 3: Specialization */}
          <div className="skill-column">
            <h3 className="column-title">Specialization</h3>
            <ul className="spec-list">
              {skills.specialization.map((spec, i) => (
                <motion.li key={i} className="spec-item" variants={fadeInUp}>
                  <span className="spec-bullet">›</span>
                  {spec}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
