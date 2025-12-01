'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTransition } from '../context/TransitionContext';

const Navbar = ({ activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { triggerTransition } = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    setIsMenuOpen(false);
    triggerTransition(() => {
      scrollToSection(id, 'auto');
    });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-zinc-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-bold text-orange-500 cursor-pointer invert-hover" onClick={() => handleScrollTo('home')}>
          DEV.PORTFOLIO
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleScrollTo(item.toLowerCase())}
              suppressHydrationWarning={true}
              className={`text-sm font-medium transition-colors hover:text-orange-400 invert-hover ${activeSection === item.toLowerCase() ? 'text-orange-400' : 'text-slate-400'}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-300 invert-hover" onClick={() => setIsMenuOpen(!isMenuOpen)} suppressHydrationWarning={true}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 absolute w-full">
          <div className="flex flex-col p-4 space-y-4">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleScrollTo(item.toLowerCase())}
                suppressHydrationWarning={true}
                className="text-left text-slate-300 hover:text-orange-400 py-2 invert-hover"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
