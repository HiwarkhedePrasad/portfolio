"use client";
import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const education = [
    {
      school: "Yeshwantrao Chavan College of Engineering - YCCE",
      degree: "Artificial Intelligence and Data Science",
      period: "Sep 2024 – Jun 2027",
      description: "Focused on Front-End Development, Node.js, and modern web technologies."
    },
    {
      school: "Government Polytechnic Jalna",
      degree: "High School Diploma, Computer Engineering",
      period: "Jul 2021 – 2024",
      description: "Specialized in Responsive Web Design, Bootstrap, and core computer engineering concepts."
    }
  ];

  return (
    <section id="education" className="py-20 bg-black/20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
          <GraduationCap className="text-orange-500" size={32} />
          Education
        </h2>
        
        <div className="grid gap-8">
          {education.map((edu, index) => (
            <div key={index} className="group relative bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all hover:-translate-y-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">{edu.school}</h3>
                  <div className="text-lg text-slate-300 font-medium">{edu.degree}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400 bg-zinc-800/50 px-3 py-1 rounded-full w-fit">
                  <Calendar size={14} />
                  {edu.period}
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
