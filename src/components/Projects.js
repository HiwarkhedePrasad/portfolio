'use client';
import React from 'react';
import { Layout, Github, ExternalLink } from 'lucide-react';
import { useTransition } from '../context/TransitionContext';

const Projects = () => {
  const { triggerTransition } = useTransition();
  const projects = [
    {
      title: "Chat-Secure",
      description: "A \"Zero-Trace\" messaging app where data never touches a hard drive. Runs entirely in volatile memory (RAM) with a \"Panic Button\" that instantly wipes encryption keys.",
      tags: ["Node.js", "Redis", "Signal Protocol", "E2EE"],
      color: "from-red-600 to-rose-600",
      github: "#",
      live: "#"
    },
    {
      title: "ByteWise",
      description: "VS Code extension that visualizes invisible \"wasted bytes\" in C/C++ structs due to padding and alignment. Features a visual heatmap and one-click struct reordering.",
      tags: ["VS Code API", "TypeScript", "C/C++", "AST"],
      color: "from-orange-600 to-amber-600",
      github: "#",
      live: "#"
    },
    {
      title: "Self-Correcting RAG Agent",
      description: "A LangGraph-powered PDF chatbot that fact-checks itself. Uses a corrective pattern to grade retrieved chunks and rewrite queries if data is irrelevant, reducing hallucinations.",
      tags: ["LangGraph", "Python", "RAG", "LLM"],
      color: "from-teal-600 to-emerald-600",
      github: "#",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-slate-400">Some of the things I&apos;ve built recently.</p>
          </div>
          <a href="https://www.github.com/hiwarkhedeprasad" className="hidden md:flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mt-4 md:mt-0 invert-hover">
            View Github <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all hover:-translate-y-2">
              {/* Project Image Placeholder */}
              <div className={`h-48 w-full bg-gradient-to-br ${project.color} p-6 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <Layout size={64} className="text-white/80 transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors invert-hover">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded bg-zinc-800 text-slate-300 border border-zinc-700">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <a href={project.github} className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors invert-hover">
                    <Github size={18} /> Code
                  </a>
                  <a href={project.live} className="flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors invert-hover">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
