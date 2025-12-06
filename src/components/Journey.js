"use client";
import React from 'react';
import { Milestone, Calendar, Trophy, Star } from 'lucide-react';

const Journey = () => {
  const journeyItems = [
    {
      title: "Hack-a-Tron (IIIT Gwalior)",
      role: "Top 100",
      date: "Nov 2025",
      description: "Survived a 36-hour hackathon at Infotsav 2025. A test of endurance involving caffeine, code, and chaos, resulting in an unforgettable team bonding experience.",
      icon: <Trophy size={20} />,
      tags: ["Hackathon", "Teamwork", "Problem Solving"]
    },{
      title: "Central India Hackathon 2.0",
      role: "Top 12 Finalist",
      date: "June 2025",
      description: "Battled into the Top 12 out of 800+ teams in this 24-hour coding marathon at Suryodaya College. A story of redemption and resilience, overcoming technical roadblocks to build a functional prototype in the final hour.",
      icon: <Milestone size={20} />,
      tags: ["Top 12", "Resilience", "Innovation"]
    },
    {
      title: "Prototype 2.0 Hackathon",
      role: "Top 7 & Category Winner",
      date: "May 2025",
      description: "Built a 'Carbon-Footprint Tracker' with Team DCode. Secured a spot in the top 7 and won 'Best Use of Supabase'.",
      icon: <Star size={20} />,
      tags: ["Supabase", "React", "Sustainability"]
    },
    {
      title: "YASH 25.0 Double Win",
      role: "Winner",
      date: "Mar 2025",
      description: "Won both the 'Enigma Hackathon' and 'Code & Canvas' competitions at YCCE's YASH 25.0 event, showcasing technical skills and creativity.",
      icon: <Trophy size={20} />,
      tags: ["Hackathon", "Creative Coding", "YCCE"]
    },
  ];

  return (
    <section id="journey" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/20 -z-10" />
      
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center flex items-center justify-center gap-3">
          <Milestone className="text-orange-500" size={32} />
          My Journey
        </h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/20 via-orange-500/50 to-orange-500/20 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {journeyItems.map((item, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-zinc-900 border-2 border-orange-500 rounded-full transform -translate-x-1/2 mt-1.5 z-10 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />

                {/* Content Card */}
                <div className={`flex-1 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className="group relative bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/5">
                    
                    {/* Date Badge */}
                    <div className={`inline-flex items-center gap-2 text-xs font-medium text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full mb-4 ${
                      index % 2 === 0 ? 'md:ml-auto' : ''
                    }`}>
                      <Calendar size={12} />
                      {item.date}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className={`text-sm text-zinc-400 font-medium mb-3 flex items-center gap-2 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      <span className="text-orange-500">{item.icon}</span>
                      {item.role}
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-2 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty Space for alternate side */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
