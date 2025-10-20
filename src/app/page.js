"use client";

import { useEffect, useRef, useState } from "react";

const USER = "prasad";
const HOST = "portfolio";

const HELP_TEXT = `Available commands:
  help                   Show this help
  about                  About Prasad
  skills                 Key skills
  projects               Live deployed projects
  links                  External links
  clear | cls            Clear the terminal
  ls | dir               List directory contents
  pwd                    Print working directory
  mkdir <name>           Create a directory
  touch <file>           Create a file
  cat <file>             Display file contents
  echo <text>            Display text
  whoami                 Display current user
  date                   Display current date and time
  uname                  System information
  tree                   Display directory tree
  cd <dir>               Change directory

With sudo (extra features):
  sudo projects all      Show all project links`;

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
GitHub:   https://github.com/HiwarkhedePrasad  `;

const PROJECTS = [
  "portfolio → https://prasad.teamxebec.xyz  ",
  "chat-cript → https://chat-cript.vercel.app  ",
  "hackathon → https://hackathon-five-taupe.vercel.app  ",
  "coderarmy → https://coderarmy.vercel.app  ",
  "sih-demo → https://sih-demo-delta.vercel.app  ",
  "exam → https://exam-seven-delta.vercel.app  ",
  "thinkbot → https://thinkbot-beige.vercel.app  ",
  "tutor-buddy → https://tutor-buddy-lovat.vercel.app  ",
  "learnconvo → https://learnconvo.vercel.app  ",
  "syntaxvizualizer → https://syntaxvizualizer.vercel.app  ",
  "team-d-code-cih-2-0 → https://team-d-code-cih-2-0.vercel.app  ",
  "codelive → https://codelive-git-main-grounddefaulter-project.vercel.app  ",
  "focus-blog → https://focus-blog-eight.vercel.app  ",
  "aerogen → https://aerogen-wine.vercel.app  ",
  "student-connect → https://student-connect-git-main-grounddefaulter-project.vercel.app  ",
  "dcode → https://dcode-git-main-grounddefaulter-project.vercel.app  ",
  "hostel-aanand → https://hostel-aanand-git-main-grounddefaulter-project.vercel.app  ",
  "king-cook → https://king-cook.vercel.app  ",
  "ground0 → https://ground0-grounddefaulter-project.vercel.app  ",
];

const ROASTS = [
  "Nice try, genius. You think this is your production server?",
  "rm -rf? Really? Did you learn Linux from a meme page?",
  "Local developer tries to nuke portfolio. Fails miserably.",
  "You've won the 'Worst Hacker Attempt' award!",
  "I've seen smarter commands from my grandmother.",
  "This isn't your Arch Linux setup, buddy.",
  "Error 403: Forbidden. Try 'sudo make-me-a-sandwich' instead.",
  "Fun fact: 73% of rm -rf users still live with their parents.",
];

export default function Home() {
  const [lines, setLines] = useState([
    `Welcome to ${USER}@${HOST}! Type 'help' to get started.`,
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [fileSystem, setFileSystem] = useState({
    "/": {
      "home": {
        "prasad": {
          "README.txt": "Welcome to Prasad's portfolio terminal!\nType 'help' for available commands.",
          "projects.txt": "Check out my projects using the 'projects' command!",
          "skills.txt": "View my skills with the 'skills' command."
        }
      },
      "usr": {
        "bin": {}
      },
      "etc": {}
    }
  });
  const [currentPath, setCurrentPath] = useState("/home/prasad");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function appendOutput(text) {
    setLines((prev) => [...prev, text]);
  }

  function handleSubmit(e) {
    e?.preventDefault();
    if (!input.trim()) return;
    const prefix = `${USER}@${HOST}:${currentPath}$`;
    setLines((prev) => [...prev, `${prefix} ${input}`]);
    runCommand(input);
    setHistory((prev) => [...prev, input]);
    setInput("");
  }

  function runCommand(command) {
    const cmd = command.trim();
    if (!cmd) return;

    if (cmd.match(/rm\s+(-rf|-fr)/i)) {
      const roast = ROASTS[Math.floor(Math.random() * ROASTS.length)];
      appendOutput(`🚨 SECURITY ALERT: ${roast}`);
      return;
    }

    const parts = cmd.split(/\s+/);
    const base = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (base) {
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
        const all = cmd.toLowerCase().includes("sudo") || args[0] === "all";
        const limit = all ? PROJECTS.length : 6;
        const list = PROJECTS.slice(0, limit).join("\n");
        appendOutput(`Live Projects:\n${list}`);
        break;
      }
      case "clear":
      case "cls":
        setLines([]);
        break;
      case "ls":
      case "dir": {
        const current = getDirectoryAtPath(currentPath);
        if (current && typeof current === 'object') {
          const entries = Object.keys(current);
          if (entries.length === 0) {
            appendOutput("(empty directory)");
          } else {
            const dirs = entries.filter(e => typeof current[e] === 'object').map(e => `📁 ${e}/`);
            const files = entries.filter(e => typeof current[e] === 'string').map(e => `📄 ${e}`);
            appendOutput([...dirs, ...files].join("\n"));
          }
        } else {
          appendOutput("Not a directory");
        }
        break;
      }
      case "pwd":
        appendOutput(currentPath);
        break;
      case "mkdir": {
        if (!args[0]) {
          appendOutput("mkdir: missing operand. Usage: mkdir <directory>");
          break;
        }
        const dirName = args[0];
        const current = getDirectoryAtPath(currentPath);
        if (current && typeof current === 'object') {
          if (current[dirName]) {
            appendOutput(`mkdir: cannot create directory '${dirName}': File exists`);
          } else {
            current[dirName] = {};
            appendOutput(`Directory '${dirName}' created`);
          }
        }
        break;
      }
      case "touch": {
        if (!args[0]) {
          appendOutput("touch: missing operand. Usage: touch <filename>");
          break;
        }
        const fileName = args[0];
        const current = getDirectoryAtPath(currentPath);
        if (current && typeof current === 'object') {
          if (current[fileName]) {
            appendOutput(`File '${fileName}' already exists`);
          } else {
            current[fileName] = "";
            appendOutput(`File '${fileName}' created`);
          }
        }
        break;
      }
      case "cat": {
        if (!args[0]) {
          appendOutput("cat: missing operand. Usage: cat <filename>");
          break;
        }
        const fileName = args[0];
        const current = getDirectoryAtPath(currentPath);
        if (current && typeof current === 'object' && current[fileName]) {
          if (typeof current[fileName] === 'string') {
            appendOutput(current[fileName] || "(empty file)");
          } else {
            appendOutput(`cat: ${fileName}: Is a directory`);
          }
        } else {
          appendOutput(`cat: ${fileName}: No such file`);
        }
        break;
      }
      case "echo": {
        const text = args.join(" ");
        appendOutput(text || "");
        break;
      }
      case "whoami":
        appendOutput(USER);
        break;
      case "date":
        appendOutput(new Date().toString());
        break;
      case "uname":
        appendOutput("RetroOS 95 (x86_64)");
        break;
      case "tree": {
        appendOutput(generateTree(fileSystem["/"], "", true));
        break;
      }
      case "cd": {
        if (!args[0] || args[0] === "~") {
          setCurrentPath("/home/prasad");
          appendOutput("");
        } else if (args[0] === "..") {
          const parts = currentPath.split("/").filter(Boolean);
          parts.pop();
          setCurrentPath("/" + parts.join("/") || "/");
          appendOutput("");
        } else if (args[0] === "/") {
          setCurrentPath("/");
          appendOutput("");
        } else {
          const newPath = args[0].startsWith("/") ? args[0] : `${currentPath}/${args[0]}`.replace("//", "/");
          const target = getDirectoryAtPath(newPath);
          if (target && typeof target === 'object') {
            setCurrentPath(newPath);
            appendOutput("");
          } else {
            appendOutput(`cd: ${args[0]}: No such directory`);
          }
        }
        break;
      }
      default:
        appendOutput(`Command not found: ${base}. Type 'help'`);
    }
  }

  function getDirectoryAtPath(path) {
    const parts = path.split("/").filter(Boolean);
    let current = fileSystem["/"];
    for (const part of parts) {
      if (current && typeof current === 'object' && current[part]) {
        current = current[part];
      } else {
        return null;
      }
    }
    return current;
  }

  function generateTree(obj, prefix = "", isLast = true) {
    let result = "";
    const entries = Object.entries(obj);
    entries.forEach(([key, value], index) => {
      const isLastEntry = index === entries.length - 1;
      const connector = isLastEntry ? "└── " : "├── ";
      const icon = typeof value === 'object' ? "📁" : "📄";
      result += prefix + connector + icon + " " + key + "\n";
      if (typeof value === 'object') {
        const newPrefix = prefix + (isLastEntry ? "    " : "│   ");
        result += generateTree(value, newPrefix, isLastEntry);
      }
    });
    return result;
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      setHistoryIndex((i) => {
        const next = i === null ? history.length - 1 : Math.max(0, i - 1);
        setInput(history[next] || "");
        return next;
      });
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
      setHistoryIndex((i) => {
        const next =
          i === null ? null : Math.min(history.length - 1, i + 1);
        setInput(next === null ? "" : history[next] || "");
        return next;
      });
    }
  }

  function renderLine(line) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = line.split(urlRegex);

    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part.trim()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline hover:text-yellow-300 hover:bg-blue-900 cursor-pointer transition-colors px-1 -mx-1"
            style={{ textDecoration: 'underline' }}
          >
            {part}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center">
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .cursor-blink::after {
          content: '█';
          animation: blink 1s infinite;
          margin-left: 2px;
        }
      `}</style>
      
      <div className="w-full max-w-4xl">
        <div 
          className="bg-gray-400 border-4 border-gray-300 shadow-2xl"
          style={{
            boxShadow: '8px 8px 0px rgba(0,0,0,0.5), inset 2px 2px 0px rgba(255,255,255,0.5), inset -2px -2px 0px rgba(0,0,0,0.3)'
          }}
        >
          <div 
            className="bg-gradient-to-r from-blue-800 to-blue-600 px-2 py-1 flex items-center justify-between border-b-2 border-gray-900"
            style={{
              background: 'linear-gradient(to right, #000080, #0000CD)',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 border border-gray-600 flex items-center justify-center text-xs">
                📁
              </div>
              <span className="text-white font-bold text-sm tracking-wider">
                C:\WINDOWS\TERMINAL.EXE - [{USER}@{HOST}]
              </span>
            </div>
            <div className="flex gap-1">
              <button className="w-5 h-5 bg-gray-300 border border-gray-600 flex items-center justify-center text-xs font-bold hover:bg-gray-400">
                _
              </button>
              <button className="w-5 h-5 bg-gray-300 border border-gray-600 flex items-center justify-center text-xs font-bold hover:bg-gray-400">
                □
              </button>
              <button className="w-5 h-5 bg-gray-300 border border-gray-600 flex items-center justify-center text-xs font-bold hover:bg-red-500">
                ✕
              </button>
            </div>
          </div>

          <div 
            className="bg-black p-4 h-96 overflow-y-auto font-mono text-sm"
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              textShadow: '0 0 5px rgba(0, 255, 0, 0.5)',
              border: '2px inset rgba(255,255,255,0.1)'
            }}
          >
            {lines.map((line, idx) => (
              <pre key={idx} className="whitespace-pre-wrap mb-1 text-green-400">
                {renderLine(line)}
              </pre>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="bg-black px-4 py-2 flex items-center gap-2 border-t-2 border-gray-700">
            <span className="text-green-400 font-bold">{`${USER}@${HOST}:${currentPath}$`}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-green-400 font-mono cursor-blink"
              style={{
                fontFamily: '"Courier New", Courier, monospace',
                textShadow: '0 0 5px rgba(0, 255, 0, 0.5)'
              }}
              spellCheck={false}
              autoFocus
            />
          </div>

          <div 
            className="bg-gray-300 px-2 py-1 text-xs flex items-center justify-between border-t-2 border-gray-400"
            style={{
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            <div className="flex gap-4">
              <span>Lines: {lines.length}</span>
              <span>|</span>
              <span>Ready</span>
            </div>
            <div>
              <span>MS-DOS Prompt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}