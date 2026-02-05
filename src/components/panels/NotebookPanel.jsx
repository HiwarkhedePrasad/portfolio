'use client';
import React from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Zap, BookOpen, Code } from 'lucide-react';
import useStore from '../../store/useStore';

const NotebookPanel = () => {
  const { expandedNotes, toggleNote } = useStore();

  const notes = [
    {
      id: 'rag-patterns',
      icon: Lightbulb,
      title: 'Corrective RAG Patterns',
      preview: 'Self-healing retrieval systems that grade their own outputs...',
      content: 'Discovered that grading retrieved chunks before generation reduces hallucinations by ~40%. The key insight: treat retrieval as a hypothesis, not a fact. If chunks score below threshold, trigger query rewriting instead of generating garbage.',
      tags: ['AI', 'RAG', 'LangGraph'],
    },
    {
      id: 'memory-layout',
      icon: Code,
      title: 'C Struct Padding Deep Dive',
      preview: 'How compilers waste bytes for alignment...',
      content: 'Compilers insert padding to align struct members to their natural boundaries. A poorly ordered struct can waste 30%+ memory. Solution: sort members by size (largest first) or use #pragma pack with caution.',
      tags: ['Systems', 'C/C++', 'Optimization'],
    },
    {
      id: 'e2ee-design',
      icon: Zap,
      title: 'End-to-End Encryption Design',
      preview: 'Building trust with zero server knowledge...',
      content: 'The hardest part of E2EE isn\'t the crypto—it\'s key management at scale. Signal Protocol\'s double ratchet provides forward secrecy, but implementing key distribution without central authority requires careful UX design.',
      tags: ['Security', 'Cryptography'],
    },
    {
      id: 'hackathon-learnings',
      icon: BookOpen,
      title: 'Hackathon Survival Notes',
      preview: 'Lessons from 36-hour coding marathons...',
      content: '1) MVP first, polish never. 2) Sleep is optional but caffeine has diminishing returns. 3) The demo is more important than the code. 4) Always have a backup plan for the demo. 5) Team communication > individual skill.',
      tags: ['Hackathons', 'Teamwork'],
    },
  ];

  return (
    <div className="glass-panel panel-notebook p-4 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Research Notebook</h2>
          <p className="text-xs text-gray-500">Ideas, learnings, and experiments</p>
        </div>
      </div>

      {/* Notes grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {notes.map((note) => {
            const isExpanded = expandedNotes.includes(note.id);
            const Icon = note.icon;
            
            return (
              <div
                key={note.id}
                onClick={() => toggleNote(note.id)}
                className={`notebook-card ${isExpanded ? 'expanded' : ''} ${isExpanded ? 'md:col-span-2' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <Icon size={18} className="text-cyan-400 mt-0.5" />
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-500" />
                  )}
                </div>
                
                <h3 className="text-sm font-medium text-white mb-1">{note.title}</h3>
                
                <p className="text-xs text-gray-400 leading-relaxed">
                  {isExpanded ? note.content : note.preview}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {note.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotebookPanel;
