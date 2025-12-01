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
              I started my coding journey 5 years ago, and since then, I&apos;ve had the privilege of working at an 
              <span className="text-orange-400"> advertising agency</span>, a 
              <span className="text-orange-400"> start-up</span>, and a huge 
              <span className="text-orange-400"> corporation</span>.
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              My main focus these days is building accessible, inclusive products and digital experiences 
              for a variety of clients. I enjoy turning complex problems into simple, beautiful and intuitive designs.
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
