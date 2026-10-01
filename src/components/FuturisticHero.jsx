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
    <div className="relative w-full min-h-[auto] lg:min-h-[78vh] flex flex-col justify-between overflow-hidden transition-colors duration-500 select-none bg-[#f8fafc] dark:bg-[#060B16]">
      
      {/* 1. Full-Bleed 3D Architectural Terrace Background with Synchronized Theme Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Light theme scene */}
        <img
          src="/hero-scene-light.jpg"
          alt="PMK Nexa Solutions Terrace & 3D Hologram Hub Light"
          className={`absolute inset-0 w-full h-full object-cover object-[70%_center] lg:object-center transition-opacity duration-500 ease-in-out pointer-events-none ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
        />

        {/* Dark theme scene */}
        <img
          src="/hero-scene-dark.jpg"
          alt="PMK Nexa Solutions Terrace & 3D Hologram Hub Dark"
          className={`absolute inset-0 w-full h-full object-cover object-[70%_center] lg:object-center transition-opacity duration-500 ease-in-out pointer-events-none ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />

        {/* 3D Three.js Holographic Effects Layer - Displayed on desktop to keep mobile lightning fast & clutter-free */}
        <ThreeHologramEffects />

        {/* Luminous Ambient Overlay: Full responsive gradient on mobile/tablet for crisp text legibility; soft fade on desktop */}
        <div
          className={`absolute inset-0 lg:right-auto lg:w-[48%] z-1 pointer-events-none transition-opacity duration-500 ease-in-out ${
            isDark
              ? 'bg-gradient-to-b from-[#060B16]/95 via-[#060B16]/85 to-[#060B16]/95 lg:bg-gradient-to-r lg:from-[#060B16] lg:via-[#060B16]/90 lg:to-transparent'
              : 'bg-gradient-to-b from-white/95 via-white/85 to-white/95 lg:bg-gradient-to-r lg:from-white lg:via-white/90 lg:to-transparent'
          } ${isDark ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          className={`absolute inset-0 lg:right-auto lg:w-[48%] z-1 pointer-events-none transition-opacity duration-500 ease-in-out ${
            !isDark
              ? 'bg-gradient-to-b from-white/95 via-white/85 to-white/95 lg:bg-gradient-to-r lg:from-white lg:via-white/90 lg:to-transparent'
              : 'bg-gradient-to-b from-[#060B16]/95 via-[#060B16]/85 to-[#060B16]/95 lg:bg-gradient-to-r lg:from-[#060B16] lg:via-[#060B16]/90 lg:to-transparent'
          } ${!isDark ? 'opacity-100' : 'opacity-0'}`}
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
      <div className="relative z-10 w-full flex-1 max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 lg:pt-6 pb-4 sm:pb-6 flex flex-col justify-between">
        
        {/* Top & Center Body Area */}
        <div className="relative w-full flex-1 flex flex-col lg:flex-row items-center justify-between min-h-[auto] lg:min-h-[500px]">
          
          {/* LEFT COLUMN: Real HTML Typography, Ecosystem Tag, Description & Buttons (40-45% width) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[46%] xl:w-[42%] z-20 space-y-4 sm:space-y-5 py-4 sm:py-6 lg:py-2"
          >
            {/* Category Pill Badge with Brand Pulse Indicator - Responsive Single-Line Fit */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-neutral-300/80 dark:border-cyan-500/30 bg-white/90 dark:bg-[#0A1428]/90 backdrop-blur-md shadow-xs max-w-full"
            >
              <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-[#0055FF] to-[#10B981] animate-pulse shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.12em] sm:tracking-[0.2em] uppercase text-neutral-700 dark:text-neutral-200">
                <span className="hidden sm:inline">INTEGRATED ECOSYSTEM &nbsp;|&nbsp; PEOPLE &nbsp;|&nbsp; TECHNOLOGY &nbsp;|&nbsp; GROWTH</span>
                <span className="inline sm:hidden">INTEGRATED ENTERPRISE ECOSYSTEM</span>
              </span>
            </motion.div>

            {/* Master Headline matching PMK Logo Theme */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[3.2rem] xl:text-[3.5rem] font-black tracking-tight leading-[1.12] sm:leading-[1.08] font-display text-neutral-900 dark:text-white"
            >
              Strategic Partnerships<br />
              for a{' '}
              <span className="bg-gradient-to-r from-[#0055FF] via-[#00D2FF] to-[#10B981] dark:from-[#38BDF8] dark:via-[#00D2FF] dark:to-[#4ADE80] bg-clip-text text-transparent">
                Bigger
              </span>{' '}
              <span className="bg-gradient-to-r from-[#0062FF] via-[#10B981] to-[#22C55E] dark:from-[#00D2FF] dark:via-[#34D399] dark:to-[#4ADE80] bg-clip-text text-transparent">
                Tomorrow.
              </span>
            </motion.h1>

            {/* Description Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-base text-neutral-600 dark:text-slate-300 font-normal leading-relaxed max-w-lg"
            >
              PMK Nexa Solutions is an integrated ecosystem dedicated to driving scale through strategic vendor networks, event operations, technical platforms, and digital marketing.
            </motion.p>

            {/* Action Buttons with Responsive Full-Width / In-Line Stacking */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0055FF] via-[#0062FF] to-[#10B981] hover:from-[#0047E0] hover:to-[#059669] text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
              >
                <span>Let's Build Together</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/90 dark:bg-[#0A1628]/90 hover:bg-white dark:hover:bg-[#0E1E36] text-neutral-800 dark:text-white border border-neutral-300/80 dark:border-cyan-500/30 backdrop-blur-md shadow-xs text-xs sm:text-sm font-bold tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer group text-center"
              >
                <span>Explore Solutions</span>
                <div className="h-5 w-5 rounded-full bg-neutral-900 dark:bg-gradient-to-r dark:from-[#0055FF] dark:to-[#10B981] text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
                </div>
              </Link>
            </motion.div>
          </motion.div>

        </div>

        {/* 3. Real Frosted Glass Bottom Metrics Capsule Bar with 4 Brand Theme Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full mt-6 sm:mt-8 pb-3 sm:pb-4"
        >
          <div className={`max-w-6xl mx-auto rounded-2xl p-2.5 sm:p-3.5 transition-all duration-500 ${
            isDark
              ? 'bg-[#081020]/90 backdrop-blur-2xl border border-cyan-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(0,85,255,0.12)]'
              : 'bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)]'
          }`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-0 md:divide-x divide-neutral-200/60 dark:divide-white/10">
              {bottomMetrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <Link 
                    key={idx}
                    to={metric.link}
                    className="flex items-center gap-2.5 sm:gap-3.5 px-2.5 sm:px-4 lg:px-6 py-2 sm:py-2.5 rounded-xl hover:bg-neutral-100/50 dark:hover:bg-white/[0.04] transition-all group"
                  >
                    <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 transition-transform group-hover:scale-110 ${metric.lightColor} ${metric.darkColor}`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className={`text-sm sm:text-base lg:text-xl font-black tracking-tight truncate ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {metric.val}
                      </div>
                      <div className={`text-[10px] sm:text-xs font-semibold tracking-tight truncate ${
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
