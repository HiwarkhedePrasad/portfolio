'use client';
import React from 'react';
import { Code2, Terminal, Cpu } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-zinc-900/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-orange-500 p-1">
              <div className="w-full h-full bg-black rounded-xl overflow-hidden flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
                 <Code2 size={80} className="text-orange-400 relative z-10" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-orange-400">5+</div>
                <div className="text-sm text-slate-400 leading-tight">Years of<br/>Experience</div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
              About Me
            </h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              I am a full-stack developer and AI practitioner pursuing a B.Tech in Artificial Intelligence and Data Science at <span className="text-orange-400">YCCE, Nagpur</span>. 
              I have been building web and mobile applications as a freelance developer since 2022, working with the <span className="text-orange-400">MERN stack</span>, React, Django, Flutter, and Firebase. 
              My interests extend into practical AI—fine-tuning models, integrating <span className="text-orange-400">Ollama-based workflows</span>, and creating applied machine-learning solutions.
            </p>
            <p className="text-slate-400 mb-6 leading-relaxed">
              I have worked on projects spanning encrypted communication, cross-platform app development, and AI-driven systems, and represented YCCE at the <span className="text-orange-400">NASA Space Apps Challenge</span>. 
              Previously associated with Edunet and Microspectra, I continue to expand my technical range through competitive environments.
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              An active hackathon participant, I have received recognitions at Prototype 2.0, Infotsav (IIIT Gwalior), and YASH 25.0. 
              My recent work includes contributing to sustainability-focused and cybersecurity-driven prototypes.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-black/50 rounded-lg border border-zinc-800">
                <Terminal className="text-teal-400 mb-2" size={24} />
                <h3 className="font-bold mb-1">Clean Code</h3>
                <p className="text-sm text-slate-500">Readable & Maintainable</p>
              </div>
              <div className="p-4 bg-black/50 rounded-lg border border-zinc-800">
                <Cpu className="text-red-400 mb-2" size={24} />
                <h3 className="font-bold mb-1">Performance</h3>
                <p className="text-sm text-slate-500">Optimized & Fast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
