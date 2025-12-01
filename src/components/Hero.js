'use client';
import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { useTransition } from '../context/TransitionContext';

const Hero = ({ scrollToSection }) => {
  const { triggerTransition } = useTransition();

  const handleScrollTo = (id) => {
    triggerTransition(() => {
      scrollToSection(id, 'auto');
    });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background blobs removed */}
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm font-medium">
          Available for freelance work
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Building Digital <br />
          <span className="text-orange-500 invert-hover">
            Experiences
          </span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          I&apos;m a Full Stack Developer specializing in building exceptional digital experiences. 
          Currently, I&apos;m focused on building accessible, human-centered products.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => handleScrollTo('projects')}
            suppressHydrationWarning={true}
            className="px-8 py-3.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium transition-all hover:scale-105 flex items-center justify-center gap-2 invert-hover"
          >
            View My Work <ChevronDown size={18} />
          </button>
          <button 
            onClick={() => handleScrollTo('contact')}
            suppressHydrationWarning={true}
            className="px-8 py-3.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-medium transition-all hover:scale-105 invert-hover"
          >
            Contact Me
          </button>
        </div>
        
        <div className="mt-16 flex justify-center gap-6 text-slate-400">
          <a href="#" className="hover:text-white transition-colors invert-hover"><Github size={24} /></a>
          <a href="#" className="hover:text-white transition-colors invert-hover"><Linkedin size={24} /></a>
          <a href="#" className="hover:text-white transition-colors invert-hover"><Mail size={24} /></a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
