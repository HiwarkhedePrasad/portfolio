'use client';
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTransition } from '../context/TransitionContext';

const Footer = () => {
  const { triggerTransition } = useTransition();
  return (
    <footer className="py-8 bg-black/80 border-t border-zinc-900 text-center text-slate-500 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p className="mb-4">Designed & Built by Your Name</p>
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-orange-400 transition-colors invert-hover"><Github size={20} /></a>
          <a href="#" className="hover:text-orange-400 transition-colors invert-hover"><Linkedin size={20} /></a>
          <a href="#" className="hover:text-orange-400 transition-colors invert-hover"><Mail size={20} /></a>
        </div>
        <p>&copy; 2024 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
