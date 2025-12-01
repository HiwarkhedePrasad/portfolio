'use client';
import React, { useState, useEffect } from 'react';
import StarBackground from '../components/StarBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// --- Main Portfolio Component ---
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id, behavior = 'smooth') => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-slate-100 font-sans selection:bg-orange-500 selection:text-white relative">
      
      {/* Background Animation */}
      <StarBackground />

      {/* Main Content Wrapper - z-10 ensures it sits above canvas */}
      <div className="relative z-10">
        
        {/* Navigation */}
        <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

        {/* Hero Section */}
        <Hero scrollToSection={scrollToSection} />

        {/* About & Stats Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
};

export default Portfolio;