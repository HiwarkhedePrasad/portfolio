'use client';
import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, Folder } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Chat-Secure",
      slug: "chat-secure",
      description: "A \"Zero-Trace\" messaging app where data never touches a hard drive. Runs entirely in volatile memory (RAM) with a \"Panic Button\" that instantly wipes encryption keys.",
      tags: ["Node.js", "Redis", "Signal Protocol", "E2EE"],
      gradient: "from-red-500/20 to-rose-500/20",
      accentColor: "text-red-400",
      github: "#",
      live: "#"
    },
    {
      title: "ByteWise",
      slug: "bytewise",
      description: "VS Code extension that visualizes invisible \"wasted bytes\" in C/C++ structs due to padding and alignment. Features a visual heatmap and one-click struct reordering.",
      tags: ["VS Code API", "TypeScript", "C/C++", "AST"],
      gradient: "from-cyan-500/20 to-blue-500/20",
      accentColor: "text-cyan-400",
      github: "#",
      live: "#"
    },
    {
      title: "Self-Correcting RAG Agent",
      slug: "self-correcting-rag-agent",
      description: "A LangGraph-powered PDF chatbot that fact-checks itself. Uses a corrective pattern to grade retrieved chunks and rewrite queries if data is irrelevant.",
      tags: ["LangGraph", "Python", "RAG", "LLM"],
      gradient: "from-violet-500/20 to-purple-500/20",
      accentColor: "text-violet-400",
      github: "#",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="section-heading">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subheading">
              Some of the things I&apos;ve built recently
            </p>
          </div>
          <a 
            href="https://www.github.com/hiwarkhedeprasad" 
            className="group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View GitHub 
            <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={`/projects/${project.slug}`}
              className="group glass-card overflow-hidden block"
              style={{ 
                transform: 'perspective(1000px)',
              }}
            >
              {/* Project Header with Gradient */}
              <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} p-6 flex items-center justify-center relative overflow-hidden border-b border-white/5`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 left-4 w-32 h-32 border border-white/20 rounded-full" />
                  <div className="absolute bottom-4 right-4 w-24 h-24 border border-white/20 rounded-full" />
                </div>
                
                <Folder 
                  size={64} 
                  className={`${project.accentColor} transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`} 
                />
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 group-hover:${project.accentColor} transition-colors`}>
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <span 
                    className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group/link"
                    onClick={(e) => { e.preventDefault(); window.open(project.github, '_blank'); }}
                  >
                    <Github size={18} />
                    <span className="animated-underline">Code</span>
                  </span>
                  <span 
                    className={`flex items-center gap-2 text-sm font-medium ${project.accentColor} hover:brightness-125 transition-all group/link`}
                    onClick={(e) => { e.preventDefault(); window.open(project.live, '_blank'); }}
                  >
                    <ExternalLink size={18} />
                    <span className="animated-underline">Live Demo</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

