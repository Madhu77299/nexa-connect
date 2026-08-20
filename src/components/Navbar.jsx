import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme.jsx';
import { companyConfig, socialLinks } from '../data/companyData';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="w-full flex justify-center sticky top-0 z-50 px-4 pt-4 pb-2 pointer-events-none">
      <header className="w-full max-w-6xl rounded-2xl border border-neutral-800/80 bg-[#090d16]/90 backdrop-blur-xl shadow-2xl py-3 px-6 md:px-8 pointer-events-auto transition-all duration-300">
        <div className="mx-auto flex items-center justify-between">
          
          {/* Logo / Brand Lockup */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-base font-black tracking-tight text-white font-display">
              PMK NEXA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-neutral-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="rounded-full bg-[#dfff00] hover:bg-[#eaff33] text-neutral-950 px-6 py-2 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile drawer controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-neutral-400"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full p-2 text-neutral-400"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden border-t border-neutral-800/80 mt-3 overflow-hidden"
            >
              <div className="space-y-1 pb-4 pt-3">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-md px-3 py-2 text-sm font-bold transition-colors ${
                        isActive 
                          ? 'bg-neutral-800 text-white' 
                          : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] font-normal text-neutral-500 mr-2">0{idx + 1}</span>
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-neutral-800 mt-2">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center rounded-full bg-[#dfff00] text-neutral-950 py-2.5 text-sm font-bold shadow-md"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
