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

export default function Home() {
  const [lines, setLines] = useState([
    `Welcome to ${USER}@${HOST}! Type 'help' to get started.`,
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  async function runCommand(command) {
    const raw = command.trim();
    const cmd = raw.toLowerCase();
    if (!cmd) return;

    const isSudo = cmd.startsWith("sudo ");
    const base = isSudo ? cmd.replace(/^sudo\s+/, "") : cmd;
    const parts = base.split(/\s+/).filter(Boolean);
    const commandName = parts[0] || "";
    const arg1 = parts[1] || "";

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
    e.preventDefault();
    const current = input;
    setLines((prev) => [...prev, `${USER}@${HOST}:~$ ${current}`]);
    setInput("");
    setHistory((prev) => [...prev, current]);
    setHistoryIndex(null);
    runCommand(current);
  }

  function handleKeyDown(e) {
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

  return (
    <div className="terminal-container">
      <div className="terminal-window">
        <div className="terminal-header">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="title">{USER}@{HOST}</span>
        </div>
        <div className="terminal-body">
          {lines.map((line, idx) => (
            <pre key={idx} className="line">{line}</pre>
          ))}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleSubmit} className="terminal-input">
          <span className="prompt">{USER}@{HOST}:~$</span>
          <input
            aria-label="terminal-input"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
