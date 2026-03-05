'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

const Terminal = ({ isExpanded, onToggleExpand }) => {
  const [history, setHistory] = useState([
    { type: 'system', text: '╔══════════════════════════════════════════╗' },
    { type: 'system', text: '║  PRASAD_SYS Terminal v2.0                ║' },
    { type: 'system', text: '║  Build: 2026.03 · Arch: x86_64           ║' },
    { type: 'system', text: '║  "Code is poetry. Ship it."              ║' },
    { type: 'system', text: '╚══════════════════════════════════════════╝' },
    { type: 'system', text: '' },
    { type: 'system', text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [demoActive, setDemoActive] = useState(true);
  const [demoTyping, setDemoTyping] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const demoRef = useRef(true);

  const commands = {
    help: [
      { type: 'normal', text: 'Available commands:' },
      { type: 'normal', text: '  help      Show this message' },
      { type: 'normal', text: '  about     Who is this?' },
      { type: 'normal', text: '  projects  List projects' },
      { type: 'normal', text: '  skills    Technical stack' },
      { type: 'normal', text: '  contact   Get in touch' },
      { type: 'normal', text: '  secret    ???' },
      { type: 'normal', text: '  clear     Clear terminal' },
    ],
    about: [
      { type: 'success', text: 'Prasad Hiwarkhede' },
      { type: 'normal', text: 'Full-stack engineer. AI builder.' },
      { type: 'normal', text: 'B.Tech AI & DS @ YCCE Nagpur' },
      { type: 'system', text: 'Building since 2022.' },
    ],
    projects: [
      { type: 'success', text: 'Selected Projects:' },
      { type: 'normal', text: '  [1] Heimdall    — Hybrid DDoS Defense' },
      { type: 'normal', text: '  [2] Chat-Secure — Zero-trace messaging' },
      { type: 'normal', text: '  [3] ByteWise    — Struct memory optimizer' },
      { type: 'normal', text: '  [4] RAG Agent   — Self-correcting AI' },
    ],
    skills: [
      { type: 'success', text: 'Stack:' },
      { type: 'normal', text: '  Frontend → React, Next.js, TypeScript' },
      { type: 'normal', text: '  Backend  → Node.js, Python, Django' },
      { type: 'normal', text: '  AI/ML    → LangChain, RAG, Ollama' },
      { type: 'normal', text: '  Systems  → C/C++, Memory Analysis' },
    ],
    contact: [
      { type: 'success', text: 'Contact:' },
      { type: 'normal', text: '  Email    → phiwarkhede05@gmail.com' },
      { type: 'normal', text: '  GitHub   → github.com/HiwarkhedePrasad' },
      { type: 'normal', text: '  LinkedIn → linkedin.com/in/hiwarkhedeprasad' },
    ],
    secret: [
      { type: 'success', text: '🎉 You found an easter egg!' },
      { type: 'normal', text: 'Try: /easter for the full retro terminal experience.' },
      { type: 'system', text: 'Built with ❤️  and too much caffeine.' },
    ],
  };

  // Demo sequence
  const demoSequence = ['about', 'skills', 'projects'];

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const stopDemo = useCallback(() => {
    if (demoRef.current) {
      demoRef.current = false;
      setDemoActive(false);
      setDemoTyping('');
    }
  }, []);

  // Demo mode
  useEffect(() => {
    let cancelled = false;

    const runDemo = async () => {
      await sleep(1500);

      while (demoRef.current && !cancelled) {
        for (const cmd of demoSequence) {
          if (!demoRef.current || cancelled) return;

          for (let i = 0; i <= cmd.length; i++) {
            if (!demoRef.current || cancelled) return;
            setDemoTyping(cmd.slice(0, i));
            await sleep(80 + Math.random() * 60);
          }

          if (!demoRef.current || cancelled) return;
          await sleep(400);

          const response = commands[cmd] || [];
          setHistory(prev => [
            ...prev,
            { type: 'command', text: `> ${cmd}` },
            ...response,
          ]);
          setDemoTyping('');

          if (!demoRef.current || cancelled) return;
          await sleep(2000);
        }

        if (demoRef.current && !cancelled) {
          await sleep(1500);
          setHistory([
            { type: 'system', text: 'PRASAD_SYS Terminal v2.0' },
            { type: 'system', text: 'Type "help" for available commands.' },
          ]);
          await sleep(1000);
        }
      }
    };

    runDemo();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, demoTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    // Save to command history
    setCmdHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    let response = [];
    
    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([{ type: 'system', text: 'Terminal cleared.' }]);
      setInput('');
      return;
    } else if (cmd.startsWith('rm -rf') || cmd.startsWith('rm -fr')) {
      response = [
        { type: 'error', text: '🚨 Nice try! This isn\'t your production server.' },
        { type: 'system', text: 'Fun fact: rm -rf users still live dangerously.' },
      ];
    } else if (cmd === 'sudo su' || cmd === 'sudo -i') {
      response = [
        { type: 'error', text: 'Permission denied. You\'re a guest here.' },
        { type: 'system', text: 'But you can type "secret" for a surprise.' },
      ];
    } else if (commands[cmd]) {
      response = commands[cmd];
    } else {
      response = [
        { type: 'error', text: `Command not found: ${cmd}` },
        { type: 'system', text: 'Type "help" for available commands.' },
      ];
    }

    setHistory(prev => [
      ...prev,
      { type: 'command', text: `> ${input}` },
      ...response,
    ]);
    setInput('');
  };

  // Arrow key history navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex] || '');
      }
    }
  };

  const handleTerminalClick = () => {
    if (demoActive) {
      stopDemo();
    }
    inputRef.current?.focus();
  };

  return (
    <div 
      className={`terminal flex flex-col ${isExpanded ? 'h-full' : 'h-full'}`}
      onClick={handleTerminalClick}
    >
      <div className="terminal-header flex items-center">
        <span className="terminal-dot" aria-hidden="true" />
        <span className="terminal-dot" aria-hidden="true" />
        <span className="terminal-dot" aria-hidden="true" />
        <span className="text-xs text-gray-500 ml-2 flex-1">
          terminal {demoActive && <span className="text-green-500 ml-1 animate-pulse">● demo</span>}
        </span>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand?.();
          }}
          className="p-1.5 rounded hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
          title={isExpanded ? 'Minimize' : 'Expand'}
          aria-label={isExpanded ? 'Minimize terminal' : 'Expand terminal'}
        >
          {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      <div ref={bodyRef} className="terminal-body flex-1 overflow-y-auto">
        {history.map((line, i) => (
          <div 
            key={i} 
            className={`terminal-line ${line.type}`}
            style={{
              color: line.type === 'error' ? '#888' : undefined
            }}
          >
            {line.text}
          </div>
        ))}

        {/* Demo typing indicator */}
        {demoActive && demoTyping !== '' && (
          <div className="terminal-line command" style={{ opacity: 0.8 }}>
            <span className="terminal-prompt">{'>'}</span>{' '}
            <span>{demoTyping}</span>
            <span className="terminal-cursor inline-block ml-0.5 animate-pulse">▌</span>
          </div>
        )}
      </div>

      {/* Mobile hint */}
      <div className="terminal-mobile-hint">
        Tap to interact · Type &quot;help&quot; to start
      </div>

      <form onSubmit={handleSubmit} className="terminal-input">
        <span className="terminal-prompt" aria-hidden="true">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (demoActive) stopDemo();
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono text-xs"
          placeholder={demoActive ? 'click to take control...' : (isFocused ? '' : 'type command...')}
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal command input"
        />
        <span className="terminal-cursor" aria-hidden="true" />
      </form>
    </div>
  );
};

export default Terminal;
