import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Cursor state (normalized -1 to 1)
  cursor: { x: 0, y: 0 },
  setCursor: (x, y) => set({ cursor: { x, y } }),

  // Active panel focus
  activePanel: null,
  setActivePanel: (panel) => set({ activePanel: panel }),

  // Terminal state
  terminalHistory: [
    { type: 'system', text: 'Welcome to PH Terminal v1.0' },
    { type: 'system', text: 'Type "help" for available commands' },
  ],
  terminalInput: '',
  setTerminalInput: (input) => set({ terminalInput: input }),
  
  executeCommand: (cmd) => {
    const { terminalHistory } = get();
    const command = cmd.toLowerCase().trim();
    
    let response = [];
    
    switch (command) {
      case 'help':
        response = [
          { type: 'system', text: 'Available commands:' },
          { type: 'info', text: '  help      - Show this message' },
          { type: 'info', text: '  about     - Who am I?' },
          { type: 'info', text: '  projects  - View my work' },
          { type: 'info', text: '  skills    - Technical stack' },
          { type: 'info', text: '  contact   - Get in touch' },
          { type: 'info', text: '  clear     - Clear terminal' },
        ];
        break;
      case 'about':
        response = [
          { type: 'success', text: '> Prasad Hiwarkhede' },
          { type: 'info', text: '  Full-Stack Developer & AI Practitioner' },
          { type: 'info', text: '  B.Tech AI & DS @ YCCE Nagpur' },
          { type: 'info', text: '  Building since 2022' },
        ];
        break;
      case 'projects':
        response = [
          { type: 'success', text: '> Featured Projects:' },
          { type: 'info', text: '  [1] Chat-Secure    → Zero-trace messaging' },
          { type: 'info', text: '  [2] ByteWise       → C/C++ struct optimizer' },
          { type: 'info', text: '  [3] RAG Agent      → Self-correcting AI' },
        ];
        break;
      case 'skills':
        response = [
          { type: 'success', text: '> Technical Stack:' },
          { type: 'info', text: '  Frontend  → React, Next.js, TypeScript' },
          { type: 'info', text: '  Backend   → Node.js, Python, Django' },
          { type: 'info', text: '  Mobile    → Flutter, React Native' },
          { type: 'info', text: '  AI/ML     → LangChain, Ollama, RAG' },
          { type: 'info', text: '  DevOps    → Docker, AWS, Firebase' },
        ];
        break;
      case 'contact':
        response = [
          { type: 'success', text: '> Contact:' },
          { type: 'info', text: '  Email    → phiwarkhede05@gmail.com' },
          { type: 'info', text: '  GitHub   → github.com/HiwarkhedePrasad' },
          { type: 'info', text: '  LinkedIn → linkedin.com/in/HiwarkhedePrasad' },
        ];
        break;
      case 'clear':
        set({ 
          terminalHistory: [
            { type: 'system', text: 'Terminal cleared' },
          ] 
        });
        return;
      case '':
        return;
      default:
        response = [
          { type: 'error', text: `Command not found: ${command}` },
          { type: 'system', text: 'Type "help" for available commands' },
        ];
    }
    
    set({
      terminalHistory: [
        ...terminalHistory,
        { type: 'command', text: `$ ${cmd}` },
        ...response,
      ],
    });
  },

  // Notebook expanded state
  expandedNotes: [],
  toggleNote: (noteId) => {
    const { expandedNotes } = get();
    if (expandedNotes.includes(noteId)) {
      set({ expandedNotes: expandedNotes.filter(id => id !== noteId) });
    } else {
      set({ expandedNotes: [...expandedNotes, noteId] });
    }
  },

  // Mobile detection
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
}));

export default useStore;
