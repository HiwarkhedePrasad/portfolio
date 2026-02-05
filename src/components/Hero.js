'use client';
import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { useTransition } from '../context/TransitionContext';

const Hero = ({ scrollToSection }) => {
  const { triggerTransition } = useTransition();
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    "Full Stack Developer",
    "AI Enthusiast", 
    "Problem Solver",
    "Hackathon Winner"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id) => {
    triggerTransition(() => {
      scrollToSection(id, 'auto');
    });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-cyan-300 text-sm font-medium">Available for opportunities</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="block text-white mb-2">Hi, I&apos;m</span>
          <span className="gradient-text text-glow">Prasad</span>
        </h1>

        {/* Animated Role */}
        <div className="h-12 mb-8 overflow-hidden">
          <div 
            className="transition-transform duration-500 ease-out"
            style={{ transform: `translateY(-${currentRole * 48}px)` }}
          >
            {roles.map((role, index) => (
              <p key={index} className="h-12 flex items-center justify-center text-xl md:text-2xl text-slate-400">
                {role}
              </p>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          I craft exceptional digital experiences with modern technologies. 
          Currently focused on building <span className="text-cyan-400">AI-powered</span> and <span className="text-violet-400">human-centered</span> products.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button 
            onClick={() => handleScrollTo('projects')}
            suppressHydrationWarning={true}
            className="btn-gradient flex items-center justify-center gap-2"
          >
            View My Work <ChevronDown size={18} />
          </button>
          <button 
            onClick={() => handleScrollTo('contact')}
            suppressHydrationWarning={true}
            className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 text-white font-medium transition-all hover:scale-105 backdrop-blur-sm"
          >
            Get In Touch
          </button>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {[
            { icon: Github, href: "https://www.github.com/HiwarkhedePrasad", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/HiwarkhedePrasad/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:phiwarkhede05@gmail.com", label: "Email" }
          ].map((social) => (
            <a 
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300"
            >
              <social.icon size={22} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown size={24} className="text-slate-500" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
