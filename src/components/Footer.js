'use client';
import React from 'react';
import { Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "https://www.github.com/HiwarkhedePrasad", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/HiwarkhedePrasad/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:phiwarkhede05@gmail.com", label: "Email" }
  ];

  return (
    <footer className="relative py-12 border-t border-white/5">
      {/* Gradient Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-cyan-400" />
            <span className="text-slate-400 text-sm">
              © {currentYear} Prasad Hiwarkhede. Built with{' '}
              <Heart size={14} className="inline text-pink-400 fill-pink-400" />{' '}
              and lots of ☕
            </span>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
