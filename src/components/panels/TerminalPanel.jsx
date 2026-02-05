'use client';
import React, { useRef, useEffect, useState } from 'react';
import useStore from '../../store/useStore';

const TerminalPanel = () => {
  const { terminalHistory, terminalInput, setTerminalInput, executeCommand } = useStore();
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      executeCommand(terminalInput);
      setTerminalInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div 
      className="glass-panel panel-terminal flex flex-col overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-500 ml-2 mono">terminal — bash</span>
      </div>

      {/* Terminal Output */}
      <div 
        ref={outputRef}
        className="flex-1 p-4 overflow-y-auto terminal-output"
      >
        {terminalHistory.map((line, index) => (
          <div key={index} className={`${line.type} mb-1`}>
            {line.text}
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="px-4 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 mono text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white mono text-sm"
            placeholder={isFocused ? '' : 'type a command...'}
            spellCheck={false}
            autoComplete="off"
          />
          <span className="terminal-cursor" />
        </div>
      </form>
    </div>
  );
};

export default TerminalPanel;
