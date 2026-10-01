import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Play, Layers, BarChart3, 
  LayoutGrid, Network
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import ThreeHologramEffects from './ThreeHologramEffects';

export default function FuturisticHero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 4 Bottom metrics matching PMK logo palette
  const bottomMetrics = [
    {
      icon: LayoutGrid,
      val: '4+',
      label: 'Core Domains',
      link: '/services',
      lightColor: 'bg-[#0055FF]/10 text-[#0055FF] border border-[#0055FF]/20',
      darkColor: 'dark:bg-[#0055FF]/20 dark:text-[#38BDF8] dark:border-[#0055FF]/40'
    },
    {
      icon: Network,
      val: 'Growing',
      label: 'Partner Network',
      link: '/services',
      lightColor: 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20',
      darkColor: 'dark:bg-[#10B981]/20 dark:text-[#34D399] dark:border-[#10B981]/40'
    },
    {
      icon: Layers,
      val: 'End-to-End',
      label: 'Business Solutions',
      link: '/solutions',
      lightColor: 'bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20',
      darkColor: 'dark:bg-[#00B4D8]/20 dark:text-[#00D2FF] dark:border-[#00B4D8]/40'
    },
    {
      icon: BarChart3,
      val: 'Greater',
      label: 'Reach & Impact',
      link: '/impact',
      lightColor: 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20',
      darkColor: 'dark:bg-[#22C55E]/20 dark:text-[#4ADE80] dark:border-[#22C55E]/40'
    }
  ];

  return (
    <div className="relative w-full min-h-[74vh] lg:min-h-[78vh] flex flex-col justify-between overflow-hidden transition-colors duration-500 select-none bg-[#f8fafc] dark:bg-[#060B16]">
      
      {/* 1. Full-Bleed 3D Architectural Terrace Background with Synchronized Theme Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Light theme scene */}
        <img
          src="/hero-scene-light.jpg"
          alt="PMK Nexa Solutions Terrace & 3D Hologram Hub Light"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out pointer-events-none ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
        />

        {/* Dark theme scene */}
        <img
          src="/hero-scene-dark.jpg"
          alt="PMK Nexa Solutions Terrace & 3D Hologram Hub Dark"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out pointer-events-none ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />

        {/* 3D Three.js Holographic Effects Layer */}
        <ThreeHologramEffects />

        {/* Ambient Left Overlay ONLY behind the Left Text Column */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-full lg:w-[46%] z-1 pointer-events-none bg-gradient-to-r from-white via-white/85 to-transparent transition-opacity duration-500 ease-in-out ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          className={`absolute left-0 top-0 bottom-0 w-full lg:w-[46%] z-1 pointer-events-none bg-gradient-to-r from-[#060B16] via-[#060B16]/85 to-transparent transition-opacity duration-500 ease-in-out ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Bottom subtle gradient for Stats Bar */}
        <div
          className={`absolute bottom-0 inset-x-0 h-28 z-1 pointer-events-none bg-gradient-to-t from-white/90 via-white/30 to-transparent transition-opacity duration-500 ease-in-out ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          className={`absolute bottom-0 inset-x-0 h-28 z-1 pointer-events-none bg-gradient-to-t from-[#060B16] via-[#060B16]/40 to-transparent transition-opacity duration-500 ease-in-out ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* 2. Main Hero Interactive Spatial Canvas */}
      <div className="relative z-10 w-full flex-1 max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-6 pb-4 sm:pb-6 flex flex-col justify-between">
        
        {/* Top & Center Body Area */}
        <div className="relative w-full flex-1 flex flex-col lg:flex-row items-center justify-between min-h-[460px] lg:min-h-[500px]">
          
          {/* LEFT COLUMN: Real HTML Typography, Ecosystem Tag, Description & Buttons (40-45% width) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[44%] xl:w-[42%] z-20 space-y-4 sm:space-y-5 py-2"
          >
            {/* Category Pill Badge with Brand Pulse Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300/80 dark:border-cyan-500/30 bg-white/80 dark:bg-[#0A1428]/85 backdrop-blur-md shadow-xs"
            >
              <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-[#0055FF] to-[#10B981] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-700 dark:text-neutral-200">
                INTEGRATED ECOSYSTEM &nbsp;|&nbsp; PEOPLE &nbsp;|&nbsp; TECHNOLOGY &nbsp;|&nbsp; GROWTH
              </span>
            </motion.div>

            {/* Master Headline matching PMK Logo Theme */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[3.2rem] xl:text-[3.5rem] font-black tracking-tight leading-[1.08] font-display text-neutral-900 dark:text-white"
            >
              Strategic<br />
              Partnerships<br />
              for a{' '}
              <span className="bg-gradient-to-r from-[#0055FF] via-[#00D2FF] to-[#10B981] dark:from-[#38BDF8] dark:via-[#00D2FF] dark:to-[#4ADE80] bg-clip-text text-transparent">
                Bigger
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#0062FF] via-[#10B981] to-[#22C55E] dark:from-[#00D2FF] dark:via-[#34D399] dark:to-[#4ADE80] bg-clip-text text-transparent">
                Tomorrow.
              </span>
            </motion.h1>

            {/* Description Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 font-normal leading-relaxed max-w-lg"
            >
              PMK Nexa Solutions is an integrated ecosystem dedicated to driving scale through strategic vendor networks, event operations, technical platforms, and digital marketing.
            </motion.p>

            {/* Action Buttons with Logo Theme Gradients */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0055FF] via-[#0062FF] to-[#10B981] hover:from-[#0047E0] hover:to-[#059669] text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-emerald-500/35 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Let's Build Together</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/85 dark:bg-[#0A1628]/85 hover:bg-white dark:hover:bg-[#0E1E36] text-neutral-800 dark:text-white border border-neutral-300/80 dark:border-cyan-500/30 backdrop-blur-md shadow-xs text-xs sm:text-sm font-bold tracking-wide hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer group"
              >
                <span>Explore Solutions</span>
                <div className="h-5 w-5 rounded-full bg-neutral-900 dark:bg-gradient-to-r dark:from-[#0055FF] dark:to-[#10B981] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile / Tablet Responsive Stack: Central Ecosystem Visual (< 1024px) */}
          <div className="lg:hidden w-full flex flex-col items-center mt-6 z-20">
            {/* Central Clean PMK Holographic Ecosystem Glass Disc */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-4">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/95 dark:bg-[#060B16]/95 backdrop-blur-xl border border-white/80 dark:border-cyan-400/40 shadow-[0_14px_40px_rgba(0,85,255,0.2),inset_0_2px_4px_rgba(255,255,255,0.9)] flex items-center justify-center p-6 text-center">
                <img 
                  src="/logo.png" 
                  alt="PMK Nexa Solutions" 
                  className="w-32 sm:w-36 h-auto object-contain drop-shadow-sm block dark:hidden"
                />
                <img 
                  src="/logo-dark-hires.png" 
                  alt="PMK Nexa Solutions" 
                  className="w-32 sm:w-36 h-auto object-contain drop-shadow-sm hidden dark:block"
                />
              </div>
            </div>
          </div>

        </div>

        {/* 3. Real Frosted Glass Bottom Metrics Capsule Bar with 4 Brand Theme Colors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full mt-3 sm:mt-5"
        >
          <div className={`max-w-6xl mx-auto rounded-2xl p-3 sm:p-3.5 transition-all duration-500 ${
            isDark
              ? 'bg-[#081020]/85 backdrop-blur-2xl border border-cyan-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(0,85,255,0.12)]'
              : 'bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)]'
          }`}>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-200/60 dark:divide-white/10">
              {bottomMetrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <Link 
                    key={idx}
                    to={metric.link}
                    className={`flex items-center gap-3.5 px-4 sm:px-6 py-2.5 sm:py-1 transition-transform hover:scale-[1.03] group ${
                      idx > 1 ? 'pt-3 sm:pt-1' : ''
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 transition-transform group-hover:scale-110 ${metric.lightColor} ${metric.darkColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <div className={`text-base sm:text-xl font-black tracking-tight ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {metric.val}
                      </div>
                      <div className={`text-xs font-semibold tracking-tight ${
                        isDark ? 'text-slate-300' : 'text-neutral-600'
                      }`}>
                        {metric.label}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
}
