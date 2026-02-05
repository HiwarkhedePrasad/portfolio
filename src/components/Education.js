'use client';
import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: "B.Tech in AI & Data Science",
      school: "Yeshwantrao Chavan College of Engineering",
      location: "Nagpur, India",
      period: "2023 - 2027 (Expected)",
      description: "Pursuing Bachelor's in Artificial Intelligence and Data Science. Active participant in hackathons and technical events.",
      current: true
    },
    {
      degree: "Higher Secondary (12th)",
      school: "SRPD Jr. College",
      location: "Nagpur, India", 
      period: "2021 - 2023",
      description: "Completed with focus on Science stream (PCM + Computer Science)."
    }
  ];

  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="text-violet-400" size={28} />
          </div>
          <h2 className="section-heading">
            <span className="gradient-text-secondary">Education</span>
          </h2>
          <p className="section-subheading mx-auto">
            Academic background and qualifications
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="glass-card p-6 md:p-8 relative overflow-hidden group">
              {/* Gradient Accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-violet-500" />
              
              {/* Current Badge */}
              {edu.current && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-medium">
                  Current
                </div>
              )}
              
              <div className="pl-6">
                {/* Period */}
                <div className="flex items-center gap-2 text-sm text-cyan-400 mb-2">
                  <Calendar size={14} />
                  <span className="font-mono">{edu.period}</span>
                </div>
                
                {/* Degree */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {edu.degree}
                </h3>
                
                {/* School */}
                <div className="flex items-center gap-2 text-violet-400 font-medium mb-1">
                  <GraduationCap size={16} />
                  <span>{edu.school}</span>
                </div>
                
                {/* Location */}
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <MapPin size={14} />
                  <span>{edu.location}</span>
                </div>
                
                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
