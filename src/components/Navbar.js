'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useTransition } from '../context/TransitionContext';

const Navbar = ({ activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { triggerTransition } = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleScrollTo = (id) => {
    setIsMenuOpen(false);
    triggerTransition(() => {
      scrollToSection(id, 'auto');
    });
  };

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Journey', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Floating Pill Navbar */}
        <div className={`
          mx-auto max-w-fit px-2 py-2 rounded-full
          transition-all duration-500
          ${scrolled 
            ? 'bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-cyan-500/5' 
            : 'bg-transparent'
          }
        `}>
          <div className="flex items-center gap-1">
            {/* Logo */}
            <button 
              onClick={() => handleScrollTo('home')}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <Sparkles size={20} className="text-cyan-400" />
              <span className="font-bold text-lg gradient-text hidden sm:block">PH</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleScrollTo(item.toLowerCase())}
                  suppressHydrationWarning={true}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-full
                    transition-all duration-300
                    ${activeSection === item.toLowerCase() 
                      ? 'text-cyan-400 bg-cyan-400/10' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-white/5 text-slate-300 transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              suppressHydrationWarning={true}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div className={`
          md:hidden mt-2 overflow-hidden transition-all duration-300
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="glass-card p-4 mx-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleScrollTo(item.toLowerCase())}
                  suppressHydrationWarning={true}
                  className={`
                    text-left px-4 py-3 rounded-lg transition-all
                    ${activeSection === item.toLowerCase()
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
