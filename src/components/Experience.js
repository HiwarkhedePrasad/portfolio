'use client';
import React from 'react';

const Experience = () => {
  const experience = [
    {
      role: "Full-Stack Freelance Developer",
      company: "Remote",
      period: "2022 - Present",
      description: "Building web and mobile applications using the MERN stack (MongoDB, Express, React, Node.js) and React Native. Delivering scalable solutions for diverse client needs."
    },
    {
      role: "Intern",
      company: "Edunet Foundation",
      period: "Apr 2025 - Aug 2025",
      description: "Microsoft AI National Skilling Initiative Internship. Gained hands-on experience in AI, cloud technologies, and full-stack development practices."
    },
    {
      role: "Summer Intern",
      company: "Microspectra Software Technologies",
      period: "Jun 2023 - Jul 2023",
      description: "Worked on web development projects using JavaScript and APIs. Gained practical experience in the software development lifecycle and team collaboration."
    }
  ];

  return (
    <section id="experience" className="py-20 bg-zinc-900/30">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Work Experience</h2>
        
        <div className="space-y-8">
          {experience.map((job, index) => (
            <div key={index} className="relative pl-8 md:pl-0">
              {/* Timeline Line (Desktop) */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2"></div>
              
              <div className={`md:flex items-center justify-between gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-orange-500 -translate-x-[5px] md:-translate-x-1/2 mt-1.5 md:mt-0 ring-4 ring-black"></div>
                
                <div className="md:w-1/2 mb-2 md:mb-0">
                  <div className={`bg-zinc-900/80 p-6 rounded-xl border border-zinc-800 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                     <span className="text-orange-400 text-sm font-mono mb-2 block">{job.period}</span>
                     <h3 className="text-xl font-bold text-white">{job.role}</h3>
                     <div className="text-slate-400 font-medium mb-4">{job.company}</div>
                     <p className="text-slate-400 text-sm leading-relaxed">{job.description}</p>
                  </div>
                </div>
                <div className="md:w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
