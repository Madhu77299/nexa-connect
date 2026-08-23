import React from 'react';
import { 
  Target, Compass, Eye, ShieldCheck, Zap, ArrowRight, CheckCircle2, 
  Sparkles, Layers, Users, Building2, Briefcase, Award 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import PageTransition from '../components/PageTransition';
import PartnerTicker from '../components/PartnerTicker';
import StatsCounter from '../components/StatsCounter';
import LeadershipSection from '../components/LeadershipSection';
import { howWeWorkData, whyChoosePmkData, companyConfig } from '../data/companyData';

export default function About() {
  return (
    <PageTransition>
      <div className="bg-[#f8fafc] dark:bg-[#0B0F17] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-300 antialiased">
        
        {/* ========================================================================= */}
        {/* 1. HERO VISION HEADER */}
        {/* ========================================================================= */}
        <section className="relative pt-12 pb-20 overflow-hidden border-b border-neutral-200 dark:border-slate-800/80 bg-white dark:bg-[#0F141F] text-neutral-900 dark:text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-slate-800/90 border border-neutral-200 dark:border-slate-700 text-xs font-bold tracking-wider text-amber-700 dark:text-amber-400 uppercase shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>THE CONNECTED BUSINESS ECOSYSTEM</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight leading-tight max-w-4xl text-neutral-900 dark:text-white">
              Connecting Businesses, Professionals, Vendors and Opportunities.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              PMK NEXA SOLUTIONS PRIVATE LIMITED is a connected business ecosystem focused on supporting growth through Business Growth, Network Solutions, Event Operations, Technical Solutions and Digital Growth.
            </p>
          </div>
        </section>

        {/* Partner Logo Ticker */}
        <PartnerTicker />

        {/* ========================================================================= */}
        {/* 2. ABOUT US NARRATIVE */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-amber-400 block font-mono">
                // ABOUT OUR ECOSYSTEM
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-neutral-900 dark:text-white leading-tight">
                One Network. Multiple Capabilities. Endless Opportunities.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 leading-relaxed">
                We bring together businesses, professionals, vendors and service providers to create meaningful connections, effective solutions and new opportunities.
              </p>
              <p className="text-sm text-neutral-500 dark:text-slate-400 leading-relaxed">
                Rather than treating services as disconnected silos, PMK NEXA SOLUTIONS PRIVATE LIMITED coordinates execution through five core capabilities backed by verified regional networks across India.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/services"
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
                >
                  <span>Explore 5 Core Capabilities →</span>
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-2xl bg-neutral-100 dark:bg-slate-800 text-neutral-800 dark:text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 dark:hover:bg-slate-700 transition-all"
                >
                  <span>Connect With Us</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-slate-800 shadow-2xl space-y-5">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-amber-400 block font-mono">
                  CORPORATE IDENTITY
                </span>
                
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display">
                  PMK NEXA SOLUTIONS PRIVATE LIMITED
                </h3>

                <div className="space-y-3 text-xs text-neutral-600 dark:text-slate-300">
                  <div className="flex justify-between py-2 border-b border-neutral-100 dark:border-slate-800">
                    <span className="text-neutral-400">Tagline:</span>
                    <strong className="text-neutral-900 dark:text-white font-mono">Your Growth. Our Network.</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100 dark:border-slate-800">
                    <span className="text-neutral-400">Core Capabilities:</span>
                    <span className="text-blue-600 dark:text-amber-400 font-bold">5 Specialized Disciplines</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100 dark:border-slate-800">
                    <span className="text-neutral-400">Incorporation Date:</span>
                    <span className="text-neutral-900 dark:text-white">April 20, 2026</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-neutral-100 dark:border-slate-800">
                    <span className="text-neutral-400">Registered HQ:</span>
                    <span className="text-neutral-900 dark:text-white">Srikakulam district, AP, India</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-400">Founder &amp; CEO:</span>
                    <strong className="text-neutral-900 dark:text-white">Prasanna Korikana</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Leadership Section */}
        <LeadershipSection />

        {/* Enterprise Key Stats */}
        <StatsCounter />

        {/* ========================================================================= */}
        {/* 3. HOW WE WORK WORKFLOW */}
        {/* ========================================================================= */}
        <section id="how-we-work" className="bg-neutral-100 dark:bg-[#0F141F] py-20 border-t border-neutral-200 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-amber-400 block font-mono">
                // EXECUTION METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-neutral-900 dark:text-white">
                How We Work
              </h2>
              <p className="text-xs text-neutral-500 dark:text-slate-400">
                A simple, clear, and disciplined 4-stage workflow driving successful project outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howWeWorkData.map((item) => (
                <div
                  key={item.step}
                  className="p-8 rounded-3xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-slate-800 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-neutral-900 dark:bg-slate-100 text-white dark:text-slate-950">
                      {item.step}
                    </span>
                    <ArrowRight className="h-4 w-4 text-neutral-400 dark:text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black font-display text-neutral-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. WHY CHOOSE PMK? */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
          
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-amber-400 block font-mono">
              // OUR CORE STRENGTHS
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
                className="p-7 rounded-3xl bg-white dark:bg-[#121824] border border-neutral-200 dark:border-slate-800 shadow-md hover:border-slate-700 transition-all flex items-start gap-4"
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

        </section>

      </div>
    </PageTransition>
  );
}
