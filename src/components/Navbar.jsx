import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, ArrowRight, Shield, Globe, ExternalLink, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useData } from '../context/DataContext';

export default function Navbar() {
  const { company, services } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
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

  // Close mobile drawer on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Capabilities', path: '/services', hasDropdown: true },
    { name: 'Our Work', path: '/our-work' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* Main Sticky Header */}
      <header className={`w-full sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F17]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl py-2.5'
          : 'bg-[#0B0F17]/85 backdrop-blur-xl border-b border-white/[0.05] py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo Lockup */}
          <div className="flex items-center gap-8">
            <Logo className="h-10 sm:h-12" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setServicesDropdown(true)}
                      onMouseLeave={() => setServicesDropdown(false)}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center gap-1.5 text-sm font-bold tracking-tight py-2 transition-colors ${
                          isActive || location.pathname.startsWith('/services')
                            ? 'text-amber-400'
                            : 'text-neutral-300 hover:text-white'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesDropdown ? 'rotate-180' : ''}`} />
                      </Link>

                      {/* Mega Dropdown Preview */}
                      <AnimatePresence>
                        {servicesDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-[420px] rounded-2xl bg-[#121824] border border-white/15 p-5 shadow-2xl space-y-3 z-50"
                          >
                            <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 pb-2 border-b border-white/10 flex justify-between font-mono">
                              <span>ENTERPRISE CAPABILITIES</span>
                              <span>5 ACTIVE DOMAINS</span>
                            </div>
                            <div className="space-y-2">
                              {services.slice(0, 5).map((svc) => (
                                <Link
                                  key={svc.id}
                                  to="/services"
                                  className="flex items-start justify-between p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                                >
                                  <div>
                                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                                      {svc.title}
                                    </h4>
                                    <p className="text-[11px] text-neutral-400 line-clamp-1">
                                      {svc.shortDescription || svc.description}
                                    </p>
                                  </div>
                                  <ArrowRight className="h-3.5 w-3.5 text-neutral-500 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0 mt-0.5" />
                                </Link>
                              ))}
                            </div>
                            <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                              <Link to="/services" className="text-amber-400 font-bold hover:underline">
                                View Full Capability Matrix →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative text-sm font-bold tracking-tight py-2 transition-colors flex items-center gap-1.5 ${
                      isActive ? 'text-amber-400' : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.isHiring && (
                      <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Items: CMS Admin, Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-xs group"
              title="PMK Nexa CMS Admin Console"
            >
              <Shield className="h-3.5 w-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>CMS Admin</span>
            </Link>

            <ThemeToggle />

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Off-Canvas Full Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative w-full max-w-sm h-full bg-[#0B0F17] border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 text-white"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <Logo className="h-8" />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full text-neutral-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="py-6 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 px-3 block mb-2 font-mono">
                    GLOBAL ENTERPRISE DIRECTORY
                  </span>
                  {navLinks.map((link, idx) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                        location.pathname === link.path
                          ? 'bg-white/[0.08] text-amber-400 border border-amber-400/30'
                          : 'text-neutral-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-neutral-500">0{idx + 1}</span>
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-neutral-500" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="space-y-2 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-amber-400" />
                    <span>{company?.contact?.email || "pmknexasolutions@gmail.com"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{company?.contact?.phone || "+91 86880 07523"}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-white py-3 text-xs font-bold uppercase tracking-wider"
                  >
                    <Shield className="h-3.5 w-3.5 text-amber-400" />
                    <span>CMS Admin Console</span>
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-blue-600 text-white py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg"
                  >
                    <span>Connect With Enterprise Desk</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
