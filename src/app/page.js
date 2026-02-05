'use client';
import React from 'react';
import Link from 'next/link';
import Terminal from '../components/Terminal';
import Preloader from '../components/Preloader';
import { ArrowUpRight, Mail, Github } from 'lucide-react';

// ============================================
// IDENTITY BLOCK
// ============================================
const IdentityBlock = () => {
  return (
    <div className="panel block-identity flex flex-col justify-between h-full">
      <div>
        <div className="panel-header">
          <span className="panel-label">Identity</span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
          Prasad Hiwarkhede
        </h1>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Full-stack engineer building AI-powered systems and developer tools. 
          I care about performance, clarity, and code that scales.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <a href="#work" className="btn btn-primary">
          View Work <ArrowUpRight size={14} />
        </a>
        <a href="mailto:phiwarkhede05@gmail.com" className="btn">
          Contact
        </a>
      </div>
    </div>
  );
};

// ============================================
// WORK BLOCK
// ============================================
const WorkBlock = () => {
  const projects = [
    {
      title: 'Chat-Secure',
      problem: 'Messaging apps leave traces on servers',
      approach: 'RAM-only architecture, Signal Protocol',
      challenge: 'Zero-persistence key management',
      impact: 'True zero-trace messaging',
    },
    {
      title: 'ByteWise',
      problem: 'C structs waste memory due to padding',
      approach: 'VS Code extension with AST parsing',
      challenge: 'Real-time analysis without compilation',
      impact: 'Visualizes invisible memory waste',
    },
    {
      title: 'Self-Correcting RAG',
      problem: 'LLMs hallucinate when retrieval fails',
      approach: 'LangGraph with feedback loops',
      challenge: 'Grading retrieval before generation',
      impact: '~40% reduction in hallucinations',
    },
  ];

  return (
    <div className="panel block-work" id="work">
      <div className="panel-header">
        <span className="panel-label">Selected Work</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {projects.map((project, i) => (
          <div key={i} className="project-card">
            <h4>{project.title}</h4>
            
            <div className="space-y-2">
              <div>
                <span className="project-meta">Problem</span>
                <p className="project-text">{project.problem}</p>
              </div>
              <div>
                <span className="project-meta">Approach</span>
                <p className="project-text">{project.approach}</p>
              </div>
              <div>
                <span className="project-meta">Challenge</span>
                <p className="project-text">{project.challenge}</p>
              </div>
              <div>
                <span className="project-meta">Impact</span>
                <p className="project-text text-white">{project.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// CAPABILITIES BLOCK
// ============================================
const CapabilitiesBlock = () => {
  const capabilities = [
    {
      domain: 'Systems',
      skills: ['Memory optimization', 'Struct analysis', 'Performance profiling', 'Debugging'],
    },
    {
      domain: 'AI / Automation',
      skills: ['RAG architectures', 'LangGraph', 'Prompt engineering', 'Local LLMs'],
    },
    {
      domain: 'Full-Stack',
      skills: ['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    },
    {
      domain: 'Tooling',
      skills: ['VS Code extensions', 'CLI tools', 'Build systems', 'DevX'],
    },
  ];

  return (
    <div className="panel block-capabilities flex flex-col">
      <div className="panel-header">
        <span className="panel-label">Capabilities</span>
        <Link href="/graph" className="btn ml-auto text-xs">
          View Graph <ArrowUpRight size={12} />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {capabilities.map((cap, i) => (
          <div key={i} className="capability-group">
            <div className="capability-title">{cap.domain}</div>
            <div className="capability-pills">
              {cap.skills.map((skill, j) => (
                <span key={j} className="capability-pill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// TERMINAL BLOCK
// ============================================
const TerminalBlock = () => {
  return (
    <div className="block-terminal">
      <Terminal />
    </div>
  );
};

// ============================================
// NOTES BLOCK
// ============================================
const NotesBlock = () => {
  const notes = [
    { text: 'How do retrieval systems correct themselves before generating?', tag: 'RAG' },
    { text: 'Why do compilers waste memory, and how can we visualize it?', tag: 'Systems' },
    { text: 'What makes encryption key management work in volatile memory?', tag: 'Security' },
  ];

  return (
    <div className="panel block-notes">
      <div className="panel-header">
        <span className="panel-label">Research Notes</span>
      </div>
      
      <div>
        {notes.map((note, i) => (
          <div key={i} className="note-item">
            <div className="note-marker" />
            <div>
              <div className="note-text">{note.text}</div>
              <div className="note-tag">{note.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// CONTACT BLOCK
// ============================================
const ContactBlock = () => {
  return (
    <div className="panel block-contact">
      <div className="panel-header">
        <span className="panel-label">Contact</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <a 
          href="mailto:phiwarkhede05@gmail.com" 
          className="btn"
        >
          <Mail size={14} />
          Email
        </a>
        <a 
          href="https://github.com/HiwarkhedePrasad" 
          className="btn"
        >
          <Github size={14} />
          GitHub
        </a>
        <span className="text-xs text-gray-500 ml-auto">
          © {new Date().getFullYear()} Prasad Hiwarkhede
        </span>
      </div>
    </div>
  );
};

// ============================================
// MAIN PAGE
// ============================================
const HomePage = () => {
  return (
    <>
      <Preloader />
      
      <main className="bento-container">
        <div className="bento-grid">
          <IdentityBlock />
          <WorkBlock />
          <CapabilitiesBlock />
          <TerminalBlock />
          <NotesBlock />
          <ContactBlock />
        </div>
      </main>
    </>
  );
};

export default HomePage;