'use client';
import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const Experience = () => {
  const experience = [
    {
      role: "Full-Stack Freelance Developer",
      company: "Remote",
      period: "2022 - Present",
      description: "Building web and mobile applications using the MERN stack (MongoDB, Express, React, Node.js) and React Native. Delivering scalable solutions for diverse client needs.",
      current: true
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
      description: "Worked on web development projects using JavaScript and APIs. Gained practical experience in the software development lifecycle."
    }
  ];

  return (
    <section id="experience" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subheading mx-auto">
            My professional journey so far
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-px" />
          
          <div className="space-y-12">
            {experience.map((job, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 timeline-dot z-10" />
                
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'}`}>
                  <div className="glass-card p-6 ml-8 md:ml-0 relative">
                    {/* Current Badge */}
                    {job.current && (
                      <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
                        Current
                      </div>
                    )}
                    
                    {/* Period */}
                    <div className="flex items-center gap-2 text-sm text-cyan-400 mb-3">
                      <Calendar size={14} />
                      <span className="font-mono">{job.period}</span>
                    </div>
                    
                    {/* Role */}
                    <h3 className="text-xl font-bold text-white mb-2">{job.role}</h3>
                    
                    {/* Company */}
                    <div className="flex items-center gap-2 text-slate-400 mb-4">
                      <Briefcase size={14} />
                      <span>{job.company}</span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
