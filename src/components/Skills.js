'use client';
import React from 'react';
import { Layout, Server, Database } from 'lucide-react';

const Skills = () => {
  const skills = {
    frontend: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Redux / Zustand", level: 85 },
    ],
    backend: [
      { name: "Node.js", level: 90 },
      { name: "Python / Django", level: 80 },
      { name: "PostgreSQL", level: 85 },
      { name: "GraphQL", level: 75 },
    ],
    devops: [
      { name: "Docker", level: 80 },
      { name: "AWS", level: 75 },
      { name: "CI/CD", level: 85 },
      { name: "Git", level: 95 },
    ]
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Proficiency</h2>
          <p className="text-slate-400">My preferred tools and technologies for building robust applications.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Frontend */}
          <div className="bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-colors">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6">
              <Layout className="text-orange-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-6">Frontend Development</h3>
            <div className="space-y-4">
              {skills.frontend.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                    <span className="text-sm text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 hover:border-teal-500/50 transition-colors">
            <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mb-6">
              <Server className="text-teal-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-6">Backend Development</h3>
            <div className="space-y-4">
              {skills.backend.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                    <span className="text-sm text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DevOps */}
          <div className="bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 hover:border-red-500/50 transition-colors">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
              <Database className="text-red-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-6">DevOps & Tools</h3>
            <div className="space-y-4">
              {skills.devops.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                    <span className="text-sm text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
