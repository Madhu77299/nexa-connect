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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md border-b ${
      isScrolled 
        ? 'h-14 bg-white/95 border-neutral-200/80 dark:bg-[#0a0f1d]/95 dark:border-neutral-900/80 shadow-md' 
        : 'h-16 bg-white/40 border-transparent dark:bg-[#0a0f1d]/40 dark:border-transparent'
    }`}>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand Lockup */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-display font-bold text-base shadow-sm group-hover:bg-[#1d4ed8] dark:group-hover:bg-[#f97316] transition-colors duration-300">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white leading-none">
              PMK Nexa
            </span>
            <span className="text-[9px] font-medium text-neutral-500 dark:text-neutral-400 tracking-wider">
              Solutions Pvt. Ltd.
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
                className={`relative py-1 text-sm font-semibold tracking-wide transition-colors hover:text-[#1d4ed8] dark:hover:text-[#f97316] ${
                  isActive 
                    ? 'text-neutral-900 dark:text-white font-bold' 
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 bottom-0 h-0.5 w-full bg-[#1d4ed8] dark:bg-[#f97316]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="rounded-md p-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Contact CTA */}
          <Link
            to="/contact"
            className="flex items-center gap-1.5 rounded-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-1.5 text-xs font-bold shadow-sm hover:bg-[#1d4ed8] dark:hover:bg-[#f97316] dark:hover:text-white transition-all duration-300"
          >
            Get in Touch
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Mobile menu controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-md p-1.5 text-neutral-600 dark:text-neutral-400"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-1.5 text-neutral-600 dark:text-neutral-400"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0f1d] overflow-hidden shadow-lg"
          >
            <div className="space-y-1 px-4 pb-6 pt-3">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-md px-3 py-2 text-base font-bold transition-colors ${
                      isActive 
                        ? 'bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white' 
                        : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-900/50'
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
                  className="block w-full text-center rounded-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-2.5 text-sm font-bold shadow-md"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
