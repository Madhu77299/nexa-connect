import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme.jsx';
import { companyConfig } from '../data/companyData';

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
    <div className="w-full flex justify-center sticky top-0 z-50 px-4 pt-4 pointer-events-none">
      <header className={`w-full max-w-7xl rounded-full border transition-all duration-300 backdrop-blur-md pointer-events-auto ${
        isScrolled 
          ? 'bg-[#08111f]/90 dark:bg-[#101c2f]/90 border-[#3167ff]/20 shadow-md py-2.5 px-6' 
          : 'bg-[#faf9f6]/40 dark:bg-[#08111f]/40 border-transparent py-4 px-6'
      }`}>
        <div className="mx-auto flex items-center justify-between">
          
          {/* Logo / Brand Lockup */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* N-FLOW brand icon */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-display font-black text-lg shadow-sm group-hover:bg-[#3167ff] dark:group-hover:bg-[#20c9b5] dark:group-hover:text-neutral-950 transition-colors duration-300">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-neutral-900 dark:text-white leading-none font-display">
                PMK NEXA
              </span>
              <span className="text-[8px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-0.5">
                SOLUTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative py-1 text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#3167ff] dark:hover:text-[#20c9b5] ${
                    isActive 
                      ? 'text-neutral-900 dark:text-white' 
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 bottom-0 h-[3px] w-full bg-[#3167ff] dark:bg-[#20c9b5] rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="flex items-center gap-1.5 rounded-full bg-[#3167ff] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#ff715b] transition-all duration-300"
            >
              Get in Touch
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile drawer controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-neutral-600 dark:text-neutral-400"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full p-2 text-neutral-600 dark:text-neutral-400"
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
              className="md:hidden border-t border-neutral-200/50 dark:border-neutral-800/50 mt-4 overflow-hidden"
            >
              <div className="space-y-1 pb-4 pt-3">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                        isActive 
                          ? 'bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white' 
                          : 'text-neutral-500 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-900/50'
                      }`}
                    >
                      <span className="text-[10px] font-normal text-neutral-400 dark:text-neutral-500 mr-2">0{idx + 1}</span>
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 mt-2">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center rounded-full bg-[#3167ff] text-white py-2.5 text-xs font-bold uppercase tracking-wider shadow-md"
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
