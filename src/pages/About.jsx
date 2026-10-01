import React from 'react';
import {
  Target, Compass, Eye, ShieldCheck, Zap, ArrowRight, CheckCircle2,
  Sparkles, Layers, Users, Building2, Briefcase, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import PageTransition from '../components/PageTransition';
import PartnerTicker from '../components/PartnerTicker';
import LeadershipSection from '../components/LeadershipSection';
import NetworkAnimation from '../components/NetworkAnimation';
import NeuralBackground from '../components/NeuralBackground';
import { whyChoosePmkData, companyConfig } from '../data/companyData';

export default function About() {
  return (
    <PageTransition>
      <div className="bg-[#f8fafc] dark:bg-[#060B16] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-300 antialiased">

        {/* ========================================================================= */}
        {/* 1. HERO VISION HEADER */}
        {/* ========================================================================= */}
        <section className="relative pt-16 pb-12 overflow-hidden border-b border-neutral-200 dark:border-white/[0.06] bg-white dark:bg-[#080E1B] text-neutral-900 dark:text-white">
          <NeuralBackground />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-xs font-bold text-[#0055FF] dark:text-[#00D2FF] uppercase tracking-wider mx-auto">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ENTERPRISE MISSION</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black font-display tracking-tight leading-snug text-neutral-900 dark:text-white mx-auto">
              Connecting Businesses, Professionals, Vendors and{' '}
              <span className="bg-gradient-to-r from-[#0055FF] via-[#00D2FF] to-[#10B981] bg-clip-text text-transparent">
                Opportunities.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-slate-300 leading-relaxed mx-auto max-w-3xl">
              PMK Nexa Solutions Pvt. Ltd. is an integrated ecosystem dedicated to driving scale through strategic vendor networks, event operations, technical platforms, and digital marketing.
            </p>
          </div>
        </section>

        {/* Strategic Ecosystem Partners Grid */}
        <PartnerTicker noScroll={true} />

        {/* ========================================================================= */}
        {/* 2. ABOUT US NARRATIVE */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-12">

            <div className="max-w-4xl mx-auto text-center space-y-5">
              <span className="text-xs font-bold tracking-widest uppercase text-[#0055FF] dark:text-[#10B981]">
                CORE PURPOSE
              </span>

              <h2 className="text-3xl sm:text-4xl font-black font-display text-neutral-900 dark:text-white leading-tight">
                One Network. Multiple Capabilities. Endless Opportunities.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 leading-relaxed">
                We unite industry experts and strategic partners to build a cohesive ecosystem that drives operational excellence and sustainable success.
              </p>
              <p className="text-sm text-neutral-500 dark:text-slate-400 leading-relaxed">
                Rather than treating services as disconnected silos, PMK NEXA SOLUTIONS PRIVATE LIMITED coordinates execution through five core capabilities backed by verified regional networks across India.
              </p>

            </div>

            {/* Neural Network SVG Animation */}
            <div className="w-full relative mt-4 overflow-hidden">
              <NetworkAnimation />
            </div>

          </div>
        </section>

        {/* Leadership Section */}
        <LeadershipSection />

        {/* ========================================================================= */}
        {/* 4. WHY CHOOSE PMK? */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">

          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0055FF] dark:text-[#10B981]">
              COMPETITIVE MOAT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-neutral-900 dark:text-white">
              Why Choose PMK?
            </h2>
            <p className="text-xs text-neutral-500 dark:text-slate-400">
              Built around how modern enterprise business moves.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoosePmkData.map((str, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white dark:bg-[#0A1224] border border-neutral-200 dark:border-white/[0.08] shadow-md hover:border-[#0055FF]/40 dark:hover:border-[#10B981]/40 transition-all flex items-start gap-4 hover:-translate-y-1"
              >
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#0055FF]/15 to-[#10B981]/20 text-[#0055FF] dark:text-[#10B981] border border-blue-500/20 dark:border-emerald-500/30 flex items-center justify-center shrink-0 font-mono font-black text-xs shadow-xs">
                  0{idx + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-neutral-900 dark:text-white font-display">
                    {str.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-slate-300 leading-relaxed">
                    {str.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

      </div>
    </PageTransition>
  );
}
