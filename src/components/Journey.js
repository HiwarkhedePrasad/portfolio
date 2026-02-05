"use client";
import React from 'react';
import { Trophy, Star, Award, Calendar, Sparkles } from 'lucide-react';

const Journey = () => {
  const journeyItems = [
    {
      title: "Hack-a-Tron (IIIT Gwalior)",
      role: "Top 100",
      date: "Nov 2025",
      description: "Survived a 36-hour hackathon at Infotsav 2025. A test of endurance involving caffeine, code, and chaos.",
      icon: <Trophy size={20} />,
      tags: ["Hackathon", "Teamwork", "Problem Solving"],
      color: "cyan"
    },
    {
      title: "Central India Hackathon 2.0",
      role: "Top 12 Finalist",
      date: "June 2025",
      description: "Battled into the Top 12 out of 800+ teams. Overcame technical roadblocks to build a functional prototype in the final hour.",
      icon: <Award size={20} />,
      tags: ["Top 12", "Resilience", "Innovation"],
      color: "violet"
    },
    {
      title: "Prototype 2.0 Hackathon",
      role: "Top 7 & Category Winner",
      date: "May 2025",
      description: "Built a 'Carbon-Footprint Tracker' with Team DCode. Won 'Best Use of Supabase'.",
      icon: <Star size={20} />,
      tags: ["Supabase", "React", "Sustainability"],
      color: "pink"
    },
    {
      title: "YASH 25.0 Double Win",
      role: "Winner",
      date: "Mar 2025",
      description: "Won both 'Enigma Hackathon' and 'Code & Canvas' competitions at YCCE's YASH 25.0 event.",
      icon: <Trophy size={20} />,
      tags: ["Hackathon", "Creative Coding", "YCCE"],
      color: "cyan"
    },
  ];

  const colorClasses = {
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/20'
    },
    violet: {
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      text: 'text-violet-400',
      glow: 'shadow-violet-500/20'
    },
    pink: {
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30',
      text: 'text-pink-400',
      glow: 'shadow-pink-500/20'
    }
  };

  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-cyan-400" size={24} />
            <h2 className="section-heading">
              My <span className="gradient-text">Journey</span>
            </h2>
          </div>
          <p className="section-subheading mx-auto">
            Hackathons, competitions, and milestones
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-px" />

          <div className="space-y-12">
            {journeyItems.map((item, index) => {
              const colors = colorClasses[item.color];
              
              return (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}>
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 ${colors.bg} border-2 ${colors.border} shadow-lg ${colors.glow}`} />

                  {/* Content Card */}
                  <div className={`flex-1 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}>
                    <div className="group glass-card p-6 hover:shadow-lg transition-all">
                      
                      {/* Date Badge */}
                      <div className={`inline-flex items-center gap-2 text-xs font-medium ${colors.text} ${colors.bg} px-3 py-1 rounded-full mb-4 ${
                        index % 2 === 0 ? 'md:ml-auto' : ''
                      }`}>
                        <Calendar size={12} />
                        {item.date}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h3>
                      
                      <div className={`text-sm font-medium mb-3 flex items-center gap-2 ${colors.text} ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}>
                        <span>{item.icon}</span>
                        {item.role}
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}>
                        {item.tags.map((tag, i) => (
                          <span key={i} className="tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty Space for alternate side */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
