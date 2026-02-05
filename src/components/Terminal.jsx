'use client';
import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'PRASAD_SYS Terminal v1.0' },
    { type: 'system', text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const commands = {
    help: [
      { type: 'normal', text: 'Available commands:' },
      { type: 'normal', text: '  help      Show this message' },
      { type: 'normal', text: '  about     Who is this?' },
      { type: 'normal', text: '  projects  List projects' },
      { type: 'normal', text: '  skills    Technical stack' },
      { type: 'normal', text: '  contact   Get in touch' },
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
      { type: 'normal', text: '  [1] Chat-Secure — Zero-trace messaging' },
      { type: 'normal', text: '  [2] ByteWise — Struct memory optimizer' },
      { type: 'normal', text: '  [3] RAG Agent — Self-correcting AI' },
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
      { type: 'normal', text: '  Email  → phiwarkhede05@gmail.com' },
      { type: 'normal', text: '  GitHub → github.com/HiwarkhedePrasad' },
    ],
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    let response = [];
    
    if (cmd === 'clear') {
      setHistory([{ type: 'system', text: 'Terminal cleared.' }]);
      setInput('');
      return;
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

  return (
    <div 
      className="terminal h-full flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-header">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="text-xs text-gray-500 ml-2">terminal</span>
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
      </div>

      <form onSubmit={handleSubmit} className="terminal-input">
        <span className="terminal-prompt">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono text-xs"
          placeholder={isFocused ? '' : 'type command...'}
          spellCheck={false}
          autoComplete="off"
        />
        <span className="terminal-cursor" />
      </form>
    </div>
  );
};

export default Terminal;
