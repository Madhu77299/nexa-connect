import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ArrowRight, Shield, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import SearchModal from './SearchModal';
import { useData } from '../context/DataContext';

export default function Navbar() {
  const { company } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Impact', path: '/impact' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Main Glassmorphic Sticky Header */}
      <header
        className={`w-full sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-[#060B16]/90 backdrop-blur-2xl border-b border-black/[0.06] dark:border-cyan-500/20 shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(0,85,255,0.08)] py-3'
            : 'bg-white/75 dark:bg-[#060B16]/75 backdrop-blur-xl border-b border-black/[0.04] dark:border-white/[0.06] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <Logo className="h-9 sm:h-11" variant="auto" />
          </div>

          {/* Center: Desktop Navigation Links matching Logo Theme */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8">
            {navLinks.map((link) => {
              const isHome = link.path === '/';
              const isActive = isHome 
                ? location.pathname === '/' 
                : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm tracking-tight py-2 font-medium transition-colors ${
                    isActive
                      ? 'text-[#0055FF] dark:text-[#00D2FF] font-bold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-[#0055FF] dark:hover:text-[#10B981]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0055FF] via-[#00D2FF] to-[#10B981] rounded-full shadow-[0_0_10px_rgba(0,85,255,0.7)] dark:shadow-[0_0_12px_rgba(0,210,255,0.9)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search, Theme Toggle, CMS Admin & Let's Connect CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3">
            {/* Search Icon Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:p-2.5 rounded-full bg-neutral-100/80 dark:bg-white/[0.08] hover:bg-neutral-200 dark:hover:bg-white/[0.15] hover:border-[#0055FF]/40 dark:hover:border-[#10B981]/40 text-neutral-700 dark:text-neutral-200 transition-all border border-neutral-200/80 dark:border-white/10 cursor-pointer shadow-xs"
              aria-label="Search"
              title="Search Capabilities & Solutions (Ctrl+K)"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Theme Toggle Button */}
            <ThemeToggle className="rounded-full shadow-xs" />

            {/* CMS Admin Button */}
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-neutral-100/90 dark:bg-white/[0.08] hover:bg-neutral-200 dark:hover:bg-white/[0.15] text-neutral-800 dark:text-neutral-200 hover:text-[#0055FF] dark:hover:text-[#00D2FF] border border-neutral-300/80 dark:border-white/10 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-xs cursor-pointer"
              title="Access CMS Admin Console"
            >
              <Shield className="h-3.5 w-3.5 text-[#0055FF] dark:text-[#00D2FF]" />
              <span>CMS Admin</span>
            </Link>

            {/* Let's Connect Pill CTA with PMK Dual Gradient */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0055FF] via-[#0062FF] to-[#10B981] hover:from-[#0047E0] hover:to-[#059669] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md shadow-blue-500/25 hover:shadow-emerald-500/35 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <span>Let's Connect</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl bg-neutral-100 dark:bg-white/[0.08] text-neutral-800 dark:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Off-Canvas Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative w-full max-w-sm h-full bg-white dark:bg-[#060B16] border-l border-neutral-200 dark:border-cyan-500/20 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 text-neutral-900 dark:text-white"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-neutral-200 dark:border-white/10">
                  <Logo className="h-8" variant="auto" />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="py-6 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0055FF] dark:text-[#00D2FF] px-3 block mb-2 font-mono">
                    NAVIGATION DIRECTORY
                  </span>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                        location.pathname === link.path
                          ? 'bg-blue-50 dark:bg-white/[0.08] text-[#0055FF] dark:text-[#00D2FF] border border-[#0055FF]/30 dark:border-[#10B981]/40 shadow-xs'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="h-4 w-4 text-neutral-400" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-neutral-200 dark:border-white/10 space-y-3">
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-neutral-100 dark:bg-white/[0.08] border border-neutral-200 dark:border-white/10 hover:border-[#0055FF]/40 py-3 text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider transition-colors"
                >
                  <Shield className="h-3.5 w-3.5 text-[#0055FF] dark:text-[#00D2FF]" />
                  <span>CMS Admin Console</span>
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-[#0055FF] via-[#0062FF] to-[#10B981] text-white py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/30"
                >
                  <span>Let's Connect</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
