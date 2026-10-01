import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles, Building, Layers, Users, Calendar, BarChart3, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  const quickLinks = [
    { title: 'Strategic Vendor Networks', category: 'Capabilities', icon: Users, path: '/services' },
    { title: 'Event Operations', category: 'Capabilities', icon: Calendar, path: '/services' },
    { title: 'Technical Platforms', category: 'Capabilities', icon: Layers, path: '/services' },
    { title: 'Digital Marketing', category: 'Capabilities', icon: BarChart3, path: '/services' },
    { title: 'About PMK Nexa', category: 'Company', icon: Building, path: '/about' },
    { title: 'Our Solutions & Portfolio', category: 'Solutions', icon: Sparkles, path: '/our-work' },
    { title: 'Connect With Enterprise Desk', category: 'Contact', icon: Mail, path: '/contact' }
  ];

  const filteredLinks = query.trim()
    ? quickLinks.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()))
    : quickLinks;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#0A1224] border border-neutral-200 dark:border-[#0055FF]/30 shadow-2xl shadow-[#0055FF]/10 overflow-hidden z-10 text-neutral-900 dark:text-white"
          >
            {/* Top gradient accent line */}
            <div className="h-1 w-full bg-pmk-gradient" />

            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-200 dark:border-[#0055FF]/15">
              <Search className="h-5 w-5 text-neutral-400 dark:text-[#00D2FF] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search capabilities, solutions, or services..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Links / Results */}
            <div className="p-3 max-h-80 overflow-y-auto space-y-1">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#0055FF] dark:text-[#00D2FF] px-3 py-1 font-mono">
                {query ? 'Search Results' : 'Recommended Destinations'}
              </div>

              {filteredLinks.length > 0 ? (
                filteredLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-blue-50/50 dark:hover:bg-[#0055FF]/10 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-[#0055FF]/20 text-[#0055FF] dark:text-[#00D2FF] flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-[#0055FF] dark:group-hover:text-[#10B981] transition-colors">
                            {item.title}
                          </div>
                          <span className="text-[10px] text-neutral-400 dark:text-slate-400 font-medium">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-[#0055FF] dark:group-hover:text-[#10B981] transition-all shrink-0" />
                    </Link>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-neutral-400">
                  No matching results found for "{query}"
                </div>
              )}
            </div>

            <div className="px-5 py-2.5 bg-neutral-50 dark:bg-black/30 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 font-mono text-[10px]">Esc</kbd> to close</span>
              <span>PMK Nexa Solutions Ecosystem</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
