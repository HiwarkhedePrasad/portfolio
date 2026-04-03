'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Terminal from '../components/Terminal';
import Preloader from '../components/Preloader';
import { projects } from '../content/projects';
import { ArrowUpRight, Mail, Github, Linkedin, Search, FolderOpen, Copy, Terminal as TerminalIcon, User, BookOpen, Lock } from 'lucide-react';

// ============================================
// IDENTITY BLOCK
// ============================================
const IdentityBlock = () => {
  return (
    <div className="panel block-identity">
      <div>
        <div className="panel-header">
          <span className="panel-label">Identity</span>
        </div>
        
        <div className="flex items-start gap-4 mb-4">
          {/* Monogram Avatar */}
          <div 
            className="w-14 h-14 rounded flex-shrink-0 flex items-center justify-center text-lg font-bold tracking-tight"
            style={{ 
              background: 'linear-gradient(135deg, var(--accent-dim), var(--gray-800))',
              border: '1px solid var(--gray-600)',
              color: 'var(--accent)'
            }}
          >
            PH
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              Prasad Hiwarkhede
            </h1>
            <p className="text-xs" style={{ color: 'var(--gray-400)' }}>
              Full-Stack Engineer · AI Builder
            </p>
          </div>
        </div>
        
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--gray-400)' }}>
          Full-stack engineer building AI-powered systems and developer tools. 
          I care about performance, clarity, and code that scales.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <a href="#work" className="btn btn-primary">
          View Work <ArrowUpRight size={14} />
        </a>
        <a href="mailto:&#112;&#104;&#105;&#119;&#97;&#114;&#107;&#104;&#101;&#100;&#101;&#48;&#53;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;" className="btn">
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
  return (
    <div className="panel block-work" id="work">
      <div className="panel-header">
        <span className="panel-label">Selected Work</span>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 -mx-2 px-2 snap-x">
        {projects.map((project, i) => (
          <Link 
            key={i} 
            href={`/projects/${project.slug}`} 
            className="project-card w-[400px] md:w-[350px] aspect-square flex-shrink-0 snap-center flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <h4>{project.title}</h4>
              {!project.github && !project.live && (
                <span className="link-badge"><Lock size={10} /> Private</span>
              )}
            </div>
            
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
                <p className="project-impact">{project.impact}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// ============================================
// ABOUT BLOCK (Compact sidebar layout)
// ============================================
const AboutBlock = () => {
  const stats = [
    { value: '3+', label: 'Years' },
    { value: '15+', label: 'Projects' },
    { value: '5+', label: 'Hackathons' },
  ];

  return (
    <div className="panel block-about flex flex-col">
      <div className="panel-header">
        <span className="panel-label">About</span>
      </div>
      
      {/* Stats row */}
      <div className="flex gap-2 mb-4">
        {stats.map((stat, i) => (
          <div key={i} className="about-stat flex-1">
            <div className="about-stat-value">{stat.value}</div>
            <div className="about-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--gray-300)' }}>
        Full-stack developer &amp; AI practitioner — B.Tech AI &amp; DS at YCCE, Nagpur.
        Building with MERN, React, Django, LangChain, and systems-level C since 2022.
      </p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--gray-500)' }}>
        NASA Space Apps alumni · Hackathon competitor · Systems thinker
      </p>
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
const TerminalBlock = ({ isExpanded, onToggleExpand }) => {
  return (
    <div className={`block-terminal transition-all duration-500 ease-out ${isExpanded ? 'terminal-expanded' : ''}`}>
      <Terminal isExpanded={isExpanded} onToggleExpand={onToggleExpand} />
    </div>
  );
};

// ============================================
// NOTES BLOCK (Expanded)
// ============================================
const NotesBlock = () => {
  const notes = [
    { text: 'How do retrieval systems correct themselves before generating?', tag: 'RAG', link: '/projects/self-correcting-rag-agent' },
    { text: 'Why do compilers waste memory, and how can we visualize it?', tag: 'Systems', link: '/projects/bytewise' },
    { text: 'Building adaptive shields: ML vs rule-based traffic classification', tag: 'Networking', link: '/projects/heimdall' },
  ];

  return (
    <div className="panel block-notes">
      <div className="panel-header">
        <span className="panel-label">Research Notes</span>
      </div>
      
      <div>
        {notes.map((note, i) => {
          const inner = (
            <>
              <div className="note-marker" />
              <div>
                <div className="note-text">{note.text}</div>
                <div className="note-tag">{note.tag}</div>
              </div>
            </>
          );

          return note.link ? (
            <Link key={i} href={note.link} className="note-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              {inner}
            </Link>
          ) : (
            <div key={i} className="note-item">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// CONTACT BLOCK
// ============================================
const ContactBlock = () => {
  return (
    <div className="panel block-contact flex flex-col justify-between">
      <div className="panel-header">
        <span className="panel-label">Contact</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <a 
          href="mailto:&#112;&#104;&#105;&#119;&#97;&#114;&#107;&#104;&#101;&#100;&#101;&#48;&#53;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;"
          className="btn"
        >
          <Mail size={14} />
          Email
        </a>
        <a 
          href="https://github.com/HiwarkhedePrasad" 
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={14} />
          GitHub
        </a>
        <a 
          href="https://www.linkedin.com/in/hiwarkhedeprasad" 
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={14} />
          LinkedIn
        </a>
      </div>

      <div className="text-xs mt-3" style={{ color: 'var(--gray-600)' }}>
        © {new Date().getFullYear()} Prasad Hiwarkhede
      </div>
    </div>
  );
};

// ============================================
// COMMAND PALETTE (Cmd+K)
// ============================================
const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    { label: 'Go to Projects', icon: FolderOpen, action: () => { document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { label: 'View Heimdall', icon: FolderOpen, action: () => { window.location.href = '/projects/heimdall'; } },
    { label: 'View DecentChat', icon: FolderOpen, action: () => { window.location.href = '/projects/decentchat'; } },
    { label: 'View ByteWise', icon: FolderOpen, action: () => { window.location.href = '/projects/bytewise'; } },
    { label: 'View RAG Agent', icon: FolderOpen, action: () => { window.location.href = '/projects/self-correcting-rag-agent'; } },
    { label: 'Copy Email', icon: Copy, action: () => { navigator.clipboard.writeText('phiwarkhede05@gmail.com'); onClose(); } },
    { label: 'Open GitHub', icon: Github, action: () => { window.open('https://github.com/HiwarkhedePrasad', '_blank'); onClose(); } },
    { label: 'Open LinkedIn', icon: Linkedin, action: () => { window.open('https://www.linkedin.com/in/hiwarkhedeprasad', '_blank'); onClose(); } },
    { label: 'View Skills Graph', icon: BookOpen, action: () => { window.location.href = '/graph'; } },
    { label: 'Easter Egg Terminal', icon: TerminalIcon, action: () => { window.location.href = '/easter'; } },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      e.preventDefault();
      filtered[activeIndex].action();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [filtered, activeIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-overlay" onClick={onClose}>
      <div className="cmd-palette" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-4" style={{ borderBottom: '1px solid var(--gray-700)' }}>
          <Search size={16} style={{ color: 'var(--gray-500)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            className="cmd-palette-input"
            style={{ border: 'none', borderBottom: 'none', padding: '0.875rem 0' }}
            placeholder="Type a command…"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
        </div>
        <div className="cmd-palette-results">
          {filtered.length === 0 && (
            <div className="cmd-palette-item" style={{ color: 'var(--gray-500)', justifyContent: 'center' }}>
              No results
            </div>
          )}
          {filtered.map((item, i) => (
            <div 
              key={i} 
              className={`cmd-palette-item ${i === activeIndex ? 'active' : ''}`}
              onClick={item.action}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN PAGE
// ============================================
const HomePage = () => {
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);

  // Global keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCmdPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Preloader />
      <CommandPalette isOpen={cmdPaletteOpen} onClose={() => setCmdPaletteOpen(false)} />
      
      {/* Cmd+K hint - bottom right */}
      <button
        onClick={() => setCmdPaletteOpen(true)}
        className="fixed bottom-4 right-4 z-50 btn text-xs hidden md:inline-flex"
        style={{ background: 'var(--gray-900)', borderColor: 'var(--gray-600)' }}
        aria-label="Open command palette"
      >
        <Search size={12} />
        <span style={{ color: 'var(--gray-500)' }}>⌘K</span>
      </button>

      {terminalExpanded ? (
        // EXPANDED MODE: Split layout
        <main className="h-screen flex overflow-hidden p-3 gap-3" style={{ background: 'var(--black)' }}>
          {/* Left side - scrollable content */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            <IdentityBlock />
            <WorkBlock />
            <AboutBlock />
            <CapabilitiesBlock />
            <NotesBlock />
            <ContactBlock />
          </div>
          
          {/* Right side - fixed terminal */}
          <div className="w-1/2 flex-shrink-0 h-full">
            <Terminal 
              isExpanded={terminalExpanded} 
              onToggleExpand={() => setTerminalExpanded(!terminalExpanded)} 
            />
          </div>
        </main>
      ) : (
        // NORMAL MODE: Bento grid
        <main className="bento-container">
          <div className="bento-grid">
            <IdentityBlock />
            <WorkBlock />
            <AboutBlock />
            <CapabilitiesBlock />
            <TerminalBlock 
              isExpanded={terminalExpanded} 
              onToggleExpand={() => setTerminalExpanded(!terminalExpanded)} 
            />
            <NotesBlock />
            <ContactBlock />
          </div>
        </main>
      )}
    </>
  );
};

export default HomePage;