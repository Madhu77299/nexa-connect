import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Calendar, MapPin, Building2, Quote, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

export default function LeadershipSection() {
  const { company, mediaSettings } = useData();

  const founderImage = mediaSettings?.founderImageUrl || "/pmk.jpeg";

  const milestones = [
    { label: "Company Legal Name", value: company.name || "PMK Nexa Solutions Private Limited", icon: Building2 },
    { label: "Incorporation Date", value: company.incorporationDate || "April 20, 2026", icon: Calendar },
    { label: "Head Office", value: "Vizag - Madhurawada, AP", icon: Building2 },
    { label: "Branch & Registered Office", value: "Krishna Complex, Rajam, Srikakulam - 532127", icon: MapPin }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-[#f5f7fb] to-white dark:from-[#08111f] dark:to-[#0c1524] transition-colors duration-300 relative overflow-hidden border-t border-neutral-200/60 dark:border-neutral-800/80">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 -z-10 h-96 w-96 rounded-full bg-[#3167ff]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-[#20c9b5]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Tag */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white font-display tracking-tight leading-tight">
            Architecting the Future of Connected Business.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Led by founder {company.founder || "Prasanna Korikana"}, PMK Nexa Solutions Private Limited operates with corporate qualitative integrity and scalable execution discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Founder Leadership Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white dark:bg-[#101c2f] border border-neutral-200/80 dark:border-neutral-700/80 p-8 shadow-xl overflow-hidden group">
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#3167ff] via-[#20c9b5] to-[#ff715b]" />
              
              {/* Founder Avatar & Lockup */}
              <div className="flex items-center gap-5 mb-6">
                <div className="relative">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-[#3167ff] to-[#20c9b5] p-1 shadow-md">
                    <img 
                      src={founderImage} 
                      alt={company.founder || "Prasanna Korikana"} 
                      className="h-full w-full object-cover object-top rounded-xl transition-all duration-500"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-neutral-900 dark:text-white font-display">
                    {company.founder || "Prasanna Korikana"}
                  </h3>
                  <span className="text-xs font-bold text-[#3167ff] dark:text-[#20c9b5] uppercase tracking-wider block">
                    {company.founderTitle || "Founder & CEO"}
                  </span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    PMK Nexa Solutions Private Limited
                  </span>
                </div>
              </div>

              {/* Founder Message / Bio */}
              <div className="relative p-4 rounded-2xl bg-neutral-50 dark:bg-[#08111f]/60 border border-neutral-200/60 dark:border-neutral-800/80 mb-6">
                <Quote className="h-5 w-5 text-[#3167ff]/40 dark:text-[#20c9b5]/40 mb-2" />
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                  "{((company.founderBio || "").replace(/Under his leadership/gi, 'Under her leadership')) || "Prasanna Korikana is an entrepreneur and operations strategist committed to building interconnected business ecosystems. Under her leadership, PMK Nexa Solutions provides integrated business development, enterprise vendor networks, high-stakes event operations, modern technical solutions, and digital marketing."}"
                </p>
              </div>

              {/* Direct CTA & Connect on LinkedIn */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800 gap-3">
                <a
                  href="https://www.linkedin.com/in/prasanna-korikana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs shadow-md shadow-[#0a66c2]/20 transition-all cursor-pointer group/btn"
                  title="Connect with Prasanna Korikana on LinkedIn"
                >
                  <svg className="h-3.5 w-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect</span>
                  <ExternalLink className="h-3 w-3 opacity-80 group-hover/btn:opacity-100 transition-opacity" />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3167ff] dark:text-[#20c9b5] hover:underline whitespace-nowrap"
                >
                  Schedule Consultation <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Official MCA Corporate Governance Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white font-display">
                Registered Corporate Entity
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Incorporated under the Companies Act, PMK Nexa Solutions Private Limited serves as a structured institutional partner for enterprises, scale-ups, and vendor ecosystems.
              </p>
            </div>

            {/* Corporate Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {milestones.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-5 rounded-2xl bg-white dark:bg-[#101c2f] border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs hover:border-[#3167ff]/50 dark:hover:border-[#20c9b5]/50 transition-all"
                  >
                    <div className="flex-shrink-0 text-[#3167ff] dark:text-[#20c9b5]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-black text-neutral-900 dark:text-white tracking-tight">
                      {item.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strategic Pillars */}
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-[#0c1524] border border-neutral-200/80 dark:border-neutral-800/80 space-y-3">
              <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block">
                EXECUTIVE PILLARS OF EXCELLENCE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3167ff]" />
                  <span className="font-bold">Transparent SLAs</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#20c9b5]" />
                  <span className="font-bold">Verified Supply Chains</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff715b]" />
                  <span className="font-bold">Cloud Automation</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
