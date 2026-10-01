import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ArrowUpRight, Briefcase, Network, Calendar, Cpu, 
  TrendingUp, Sparkles, ShieldCheck, CheckCircle2, Check, Zap 
} from 'lucide-react';
import { motion } from 'framer-motion';
import FuturisticHero from '../components/FuturisticHero';
import SectionHeading from '../components/SectionHeading';
import PageTransition from '../components/PageTransition';
import PartnerTicker from '../components/PartnerTicker';
import StatsCounter from '../components/StatsCounter';
import TestimonialsSection from '../components/TestimonialsSection';
import RoiEstimator from '../components/RoiEstimator';
import NeuralBackground from '../components/NeuralBackground';
import { useData } from '../context/DataContext';
import { howWeWorkData, whyChoosePmkData } from '../data/companyData';

export default function Home() {
  const { company, services } = useData();
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <PageTransition>
      {/* 1. Global Futuristic 3D Holographic Hero matching Mockup */}
      <FuturisticHero />

      {/* 2. Enterprise Partner Logo Ticker */}
      <PartnerTicker />

      {/* 3. Key Enterprise Impact Metrics Counter */}
      <StatsCounter />

      {/* 4. Core Capabilities Section (5 Capabilities ONLY) */}
      <section id="capabilities" className="bg-[#f8fafc] dark:bg-[#060B16] py-10 transition-colors duration-300 border-t border-neutral-200/60 dark:border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-xs font-bold text-[#0055FF] dark:text-[#00D2FF] uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>INTEGRATED CAPABILITIES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-neutral-900 dark:text-white">
                What We Bring Together
              </h2>
              <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">
                PMK NEXA SOLUTIONS PRIVATE LIMITED operates through five core capabilities and a strong professional network.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0055FF] via-[#0062FF] to-[#10B981] hover:from-[#0047E0] hover:to-[#059669] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-emerald-500/35 hover:scale-[1.02] transition-all cursor-pointer w-full sm:w-auto shrink-0 text-center"
            >
              <span>Explore All Capabilities</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, sIdx) => (
              <div
                key={svc.id}
                onMouseEnter={() => setHoveredService(svc.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative p-7 bg-white dark:bg-[#0A1224] border border-neutral-200/80 dark:border-white/[0.08] rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#0055FF]/40 dark:hover:border-[#10B981]/50 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-slate-800/80 text-[#0055FF] dark:text-[#10B981] border border-blue-500/20 dark:border-emerald-500/20">
                      0{sIdx + 1}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-[#0055FF] dark:group-hover:text-[#10B981] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <h3 className="text-xl font-black text-neutral-900 dark:text-white font-display group-hover:text-[#0055FF] dark:group-hover:text-[#10B981] transition-colors leading-snug">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-slate-300 leading-relaxed font-normal">
                    {svc.shortDescription || svc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-white/[0.06] flex items-center justify-between">
                  <Link 
                    to="/services"
                    state={{ activeId: svc.id }}
                    className="text-xs font-bold text-[#0055FF] dark:text-[#10B981] hover:underline flex items-center gap-1.5 group/link"
                  >
                    <span>View Details &amp; Scope</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. How We Work 4-Stage Workflow */}
      <section className="bg-neutral-100 dark:bg-[#070D1A] py-10 border-t border-neutral-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0055FF] dark:text-[#10B981]">
              EXECUTION RIGOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-neutral-900 dark:text-white">
              How We Work
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400">
              A clear, disciplined 4-stage execution workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howWeWorkData.map((item) => (
              <div
                key={item.step}
                className="p-8 rounded-3xl bg-white dark:bg-[#0A1224] border border-neutral-200 dark:border-white/[0.08] shadow-md flex flex-col justify-between space-y-4 hover:border-[#0055FF]/40 dark:hover:border-[#10B981]/40 transition-all group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-[#0055FF] dark:text-[#10B981] bg-blue-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20 dark:border-emerald-500/20">
                    STAGE {item.step}
                  </span>
                  <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-[#10B981] group-hover:translate-x-1 transition-all" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-black font-display text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Why Choose PMK Strengths Grid */}
      <section className="bg-white dark:bg-[#060B16] py-10 border-t border-neutral-200 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0055FF] dark:text-[#10B981]">
              STRATEGIC ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-neutral-900 dark:text-white">
              Why Choose PMK?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoosePmkData.map((str, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-neutral-50 dark:bg-[#0A1224] border border-neutral-200 dark:border-white/[0.08] shadow-sm hover:border-[#0055FF]/40 dark:hover:border-[#10B981]/40 transition-all flex items-start gap-4 hover:-translate-y-1"
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

        </div>
      </section>

      {/* 9. Capability Scoping & ROI Estimator */}
      <RoiEstimator />

      {/* 10. Testimonials Section */}
      <TestimonialsSection />

      {/* 11. Final Website Positioning Callout */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#050B16] via-[#081226] to-[#040810] py-16 text-white text-center border-t border-white/[0.08]">
        <NeuralBackground />
        
        {/* Dual Logo Ambient Aura Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-0 h-96 w-96 rounded-full bg-[#0055FF]/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 -z-0 h-96 w-96 rounded-full bg-[#10B981]/20 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-cyan-300 uppercase tracking-widest mx-auto">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
            <span>UNIFIED COMMERCIAL PLATFORM</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight leading-tight">
            YOUR GROWTH.{' '}
            <span className="bg-gradient-to-r from-[#0055FF] via-[#00D2FF] to-[#10B981] bg-clip-text text-transparent">
              OUR NETWORK.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            A unified ecosystem connecting professionals and vendors to unlock endless business opportunities.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0055FF] via-[#0062FF] to-[#10B981] hover:from-[#0047E0] hover:to-[#059669] text-white px-8 py-4 text-xs font-black uppercase tracking-wider transition-all shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95"
            >
              <span>Explore Capabilities</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>Connect With Us</span>
            </Link>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
