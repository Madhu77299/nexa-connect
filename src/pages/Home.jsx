import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ArrowUpRight, Briefcase, Network, Calendar, Cpu, 
  TrendingUp, Sparkles, ShieldCheck, CheckCircle2, Check, Zap 
} from 'lucide-react';
import { motion } from 'framer-motion';
import CinematicHero from '../components/CinematicHero';
import SectionHeading from '../components/SectionHeading';
import PageTransition from '../components/PageTransition';
import PartnerTicker from '../components/PartnerTicker';
import StatsCounter from '../components/StatsCounter';
import TestimonialsSection from '../components/TestimonialsSection';
import RoiEstimator from '../components/RoiEstimator';
import { useData } from '../context/DataContext';
import { howWeWorkData, whyChoosePmkData } from '../data/companyData';

export default function Home() {
  const { company, services } = useData();
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <PageTransition>
      {/* 1. Global MNC Cinematic Hero Video Reel */}
      <CinematicHero />

      {/* 2. Enterprise Partner Logo Ticker */}
      <PartnerTicker />

      {/* 3. Key Enterprise Impact Metrics Counter */}
      <StatsCounter />

      {/* 4. Core Capabilities Section (5 Capabilities ONLY) */}
      <section id="capabilities" className="bg-[#f8fafc] dark:bg-[#0B0F17] py-12 transition-colors duration-300 border-t border-neutral-200/60 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3 max-w-2xl">

              <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-neutral-900 dark:text-white">
                What We Bring Together
              </h2>
              <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">
                PMK NEXA SOLUTIONS PRIVATE LIMITED operates through five core capabilities and a strong professional network.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer shrink-0"
            >
              <span>Explore All Capabilities</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div
                key={svc.id}
                onMouseEnter={() => setHoveredService(svc.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative p-7 bg-white dark:bg-[#121824] border border-neutral-200/80 dark:border-slate-800 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">

                    <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <h3 className="text-xl font-black text-neutral-900 dark:text-white font-display group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-slate-300 leading-relaxed font-normal">
                    {svc.shortDescription || svc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-slate-800 flex items-center justify-between">
                  <Link 
                    to="/services"
                    state={{ activeId: svc.id }}
                    className="text-xs font-bold text-blue-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Details &amp; Scope</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>



        </div>
      </section>





      {/* 7. How We Work 4-Stage Workflow */}
      <section className="bg-neutral-100 dark:bg-[#0F141F] py-12 border-t border-neutral-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">

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
                className="p-8 rounded-3xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="h-9 w-9 rounded-xl bg-neutral-900 dark:bg-slate-100 text-white dark:text-slate-950 flex items-center justify-center font-mono font-black text-xs shadow-md">
                  {item.step}
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
      <section className="bg-white dark:bg-[#0B0F17] py-12 border-t border-neutral-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-2 max-w-xl">

            <h2 className="text-3xl sm:text-5xl font-black font-display text-neutral-900 dark:text-white">
              Why Choose PMK?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoosePmkData.map((str, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-neutral-50 dark:bg-[#121824] border border-neutral-200 dark:border-slate-800 shadow-sm hover:border-slate-700 transition-all flex items-start gap-4"
              >
                <div className="h-10 w-10 rounded-2xl bg-blue-600/10 dark:bg-slate-800 text-blue-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-mono font-black text-xs">
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
      <section className="bg-neutral-900 dark:bg-[#070A10] py-12 text-white text-center border-t border-slate-800">
        <div className="mx-auto max-w-4xl px-4 space-y-6">

          <h2 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight leading-tight">
            Your Growth. Our Network.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Connecting Businesses, Professionals, Vendors and Opportunities. One Network. Multiple Capabilities. Endless Opportunities.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-xs font-black uppercase tracking-wider transition-all shadow-xl"
            >
              <span>Explore Capabilities</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <span>Connect With Us</span>
            </Link>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
