'use client';
import React from 'react';
import { Code2, Terminal, Cpu, Zap, Award, Calendar } from 'lucide-react';

const About = () => {
  const stats = [
    { value: '3+', label: 'Years Experience', icon: Calendar },
    { value: '15+', label: 'Projects Built', icon: Code2 },
    { value: '5+', label: 'Hackathon Wins', icon: Award },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subheading mx-auto">
            Passionate developer with a love for creating impactful digital solutions
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Bio Card - Spans 2 columns */}
          <div className="md:col-span-2 glass-card p-8">
            <div className="flex items-start gap-6">
              {/* Avatar Area */}
              <div className="hidden sm:block shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 p-[2px]">
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                    <Code2 size={40} className="text-cyan-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Prasad Hiwarkhede</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  I&apos;m a <span className="text-cyan-400">full-stack developer</span> and AI practitioner pursuing B.Tech in AI & Data Science at YCCE, Nagpur. 
                  Since 2022, I&apos;ve been building web and mobile apps with the <span className="text-violet-400">MERN stack</span>, React, Django, Flutter, and Firebase.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  My interests extend into practical AI—fine-tuning models, integrating Ollama-based workflows, and creating applied ML solutions. 
                  I&apos;ve represented YCCE at the <span className="text-cyan-400">NASA Space Apps Challenge</span> and continue to expand my technical range through competitive environments.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-6 text-center group">
                <stat.icon size={24} className="mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Skill Highlights - Bottom Row */}
          <div className="glass-card p-6 group">
            <Terminal className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform" size={28} />
            <h3 className="font-bold text-white mb-2">Clean Code</h3>
            <p className="text-sm text-slate-400">Readable, maintainable, and well-documented</p>
          </div>

          <div className="glass-card p-6 group">
            <Cpu className="text-violet-400 mb-4 group-hover:scale-110 transition-transform" size={28} />
            <h3 className="font-bold text-white mb-2">Performance</h3>
            <p className="text-sm text-slate-400">Optimized for speed and efficiency</p>
          </div>

          <div className="glass-card p-6 group">
            <Zap className="text-pink-400 mb-4 group-hover:scale-110 transition-transform" size={28} />
            <h3 className="font-bold text-white mb-2">Modern Stack</h3>
            <p className="text-sm text-slate-400">Latest technologies and best practices</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
