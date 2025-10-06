"use client";

import { useEffect, useRef, useState } from "react";

const USER = "prasad";
const HOST = "portfolio";

const HELP_TEXT = `Available commands:
  help                   Show this help
  about                  About Prasad
  skills                 Key skills
  projects               Recent GitHub projects
  links                  External links
  clear | cls            Clear the terminal

With sudo (extra features):
  sudo projects all      Show more repositories
Also works: projects all`;

const ABOUT = `Hi, I'm Prasad Hiwarkhede — Full-Stack Freelance Developer.
Current focus: Data Science & Machine Learning.
Specialization: MERN, Web Development, API Design.`;

const SKILLS = `Full-Stack: MERN (MongoDB, Express.js, React.js, Node.js)
APIs: RESTful APIs
Backend: Node.js, Express.js
Frontend: HTML, CSS, JavaScript, Tailwind CSS, Material UI, React, Next.js
Databases: MongoDB, Firebase, MySQL
Tools: Git, GitHub`;

const LINKS = `LinkedIn: https://www.linkedin.com/in/hiwarkhedeprasad
GitHub:   https://github.com/HiwarkhedePrasad`;

const ROASTS = [
  "Nice try, genius. You think this is your production server? 😂",
  "rm -rf? Really? Did you learn Linux from a meme page? 🤡",
  "BREAKING: Local developer tries to nuke portfolio site. Fails miserably.",
  "Congratulations! You've won the 'Worst Hacker Attempt' award! 🏆",
  "I've seen smarter commands from my grandmother. And she uses Internet Explorer.",
  "Did you really think that would work? This isn't your Arch Linux setup, buddy.",
  "Error 403: Your l33t h4ck3r skills are forbidden here. Try sudo make-me-a-sandwich instead.",
  "Fun fact: 73% of people who try rm -rf on portfolios still live with their parents. 📊"
];

export default function Home() {
  const [lines, setLines] = useState([
    `Welcome to ${USER}@${HOST}! Type 'help' to get started.`,
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [chatMode, setChatMode] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  async function runCommand(command) {
    const raw = command.trim();
    const cmd = raw.toLowerCase();
    if (!cmd) return;

    // Check for rm -rf attempts
    if (cmd.match(/rm\s+(-rf|-fr|-r\s+-f|-f\s+-r|--recursive\s+--force)/i)) {
      const roast = ROASTS[Math.floor(Math.random() * ROASTS.length)];
      appendOutput(`
╔════════════════════════════════════════════════════╗
║  🚨 SECURITY ALERT: DESTRUCTION ATTEMPT DETECTED  🚨  ║
╚════════════════════════════════════════════════════╝

${roast}

P.S. This terminal is sandboxed. But your dignity isn't. 💀
`);
      return;
    }

    const isSudo = cmd.startsWith("sudo ");
    const base = isSudo ? cmd.replace(/^sudo\s+/, "") : cmd;
    const parts = base.split(/\s+/).filter(Boolean);
    const commandName = parts[0] || "";
    const arg1 = parts[1] || "";

    // Secret chatbot command
    if (commandName === "jarvis" || commandName === "chat") {
      if (!chatMode) {
        setChatMode(true);
        appendOutput(`
🤖 AI Chat Mode Activated!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You can now chat with Gemini AI.
Type 'exit' or 'quit' to return to terminal.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
      }
      return;
    }

    // Handle chat mode
    if (chatMode) {
      if (cmd === "exit" || cmd === "quit") {
        setChatMode(false);
        appendOutput("🤖 AI Chat Mode Deactivated. Back to terminal.");
        return;
      }
      
      appendOutput("🤖 Thinking...");
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: raw }),
        });
        
        if (!res.ok) throw new Error("AI request failed");
        const data = await res.json();
        appendOutput(`🤖 ${data.response || "Sorry, I couldn't process that."}`);
      } catch (e) {
        appendOutput("🤖 Error: Unable to connect to AI. Check your API configuration.");
      }
      return;
    }

    switch (commandName) {
      case "help":
        appendOutput(HELP_TEXT);
        break;
      case "about":
        appendOutput(ABOUT);
        break;
      case "skills":
        appendOutput(SKILLS);
        break;
      case "links":
        appendOutput(LINKS);
        break;
      case "projects": {
        const limit = isSudo || arg1 === "all" ? 12 : 6;
        appendOutput(`Fetching latest projects (limit ${limit})...`);
        try {
          const res = await fetch(`/api/projects?limit=${limit}`, { cache: "no-store" });
          if (!res.ok) throw new Error("Failed to load projects");
          const items = await res.json();
          if (!Array.isArray(items) || items.length === 0) {
            appendOutput("No projects found.");
            break;
          }
          const list = items
            .map((r) => `- ${r.name} (${r.stars}★) - ${r.url}`)
            .join("\n");
          appendOutput(list);
        } catch (e) {
          appendOutput("Error fetching projects.");
        }
        break;
      }
      case "cls":
      case "clear":
        setLines([]);
        break;
      default:
        appendOutput(`Command not found: ${base}. Type 'help'.`);
    }
  }

  function appendOutput(text) {
    setLines((prev) => [...prev, text]);
  }

  function handleSubmit(e) {
    e?.preventDefault();
    const current = input;
    if (!current.trim()) return;
    
    const prefix = chatMode ? "💬" : `${USER}@${HOST}:~$`;
    setLines((prev) => [...prev, `${prefix} ${current}`]);
    setInput("");
    setHistory((prev) => [...prev, current]);
    setHistoryIndex(null);
    runCommand(current);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
      return;
    }
    
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      setHistoryIndex((prev) => {
        const nextIndex = prev === null ? history.length - 1 : Math.max(0, prev - 1);
        setInput(history[nextIndex] || "");
        return nextIndex;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!history.length) return;
      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const nextIndex = Math.min(history.length - 1, prev + 1);
        if (nextIndex === history.length - 1) {
          setInput(history[nextIndex] || "");
        } else if (prev === history.length - 1) {
          setInput("");
        } else {
          setInput(history[nextIndex] || "");
        }
        return nextIndex === history.length ? null : nextIndex;
      });
    }
  }

  const promptSymbol = chatMode ? "💬" : `${USER}@${HOST}:~$`;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-gray-300 text-sm">
            {USER}@{HOST} {chatMode && "- 🤖 AI CHAT MODE"}
          </span>
        </div>
        <div className="p-4 h-96 overflow-y-auto">
          {lines.map((line, idx) => (
            <pre key={idx} className="whitespace-pre-wrap mb-1">{line}</pre>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
          <span className="text-green-400">{promptSymbol}</span>
          <input
            ref={inputRef}
            aria-label="terminal-input"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}