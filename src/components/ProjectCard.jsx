'use client';
import React from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative flex flex-col justify-between p-6 bg-[#111] border border-gray-800 rounded-xl hover:border-gray-600 transition-all duration-300 w-[300px] md:w-[400px] shrink-0 h-[280px]">
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{project.category || 'Project'}</span>
          </div>
          <div className="flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <Github size={18} />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm text-gray-400 line-clamp-3 mb-4 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech?.map((tech, i) => (
            <span 
              key={i} 
              className="px-2 py-1 text-[10px] font-mono bg-gray-900 border border-gray-700 rounded text-gray-300 group-hover:border-gray-500 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProjectCard;
