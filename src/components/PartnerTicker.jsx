import React from 'react';
import { ShieldCheck, Sparkles, Building2, Cloud, Layers, Cpu, Compass, Globe2 } from 'lucide-react';

export default function PartnerTicker({ 
  title = "TRUSTED BY LEADING BUSINESSES & STRATEGIC ECOSYSTEM PARTNERS",
  noScroll = false 
}) {
  const partners = [
    { name: "AWS Partner Network", category: "Cloud Infrastructure", icon: Cloud },
    { name: "Google Cloud", category: "Enterprise AI & Scalability", icon: Globe2 },
    { name: "Microsoft for Startups", category: "Venture Ecosystem", icon: Cpu },
    { name: "Razorpay Connect", category: "Payment Workflows", icon: Layers },
    { name: "Zoho Enterprise", category: "Business Suite", icon: Building2 },
    { name: "HubSpot Certified", category: "Marketing Automation", icon: Sparkles },
    { name: "Tata Tele Business", category: "Telecom Networks", icon: Compass },
    { name: "InfoEdge Ecosystem", category: "Talent Operations", icon: ShieldCheck },
  ];

  // If noScroll is true, render a neat, beautiful static grid
  if (noScroll) {
    return (
      <section className="relative w-full py-6 bg-white/60 dark:bg-[#090e18]/80 backdrop-blur-md border-y border-neutral-200/80 dark:border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Badge */}


          {/* Static 4-Column Grid of Partner Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {partners.map((partner) => {
              const Icon = partner.icon;
              return (
                <div
                  key={partner.name}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-[#0A1224] border border-neutral-200/80 dark:border-white/[0.08] shadow-xs hover:shadow-md hover:border-[#0055FF]/50 dark:hover:border-[#10B981]/50 hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
                >
                  <div className="h-10 w-10 rounded-xl bg-neutral-100 dark:bg-slate-800/80 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:text-[#0055FF] dark:group-hover:text-[#10B981] group-hover:bg-[#0055FF]/10 dark:group-hover:bg-[#10B981]/15 group-hover:scale-105 transition-all shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-white group-hover:text-[#0055FF] dark:group-hover:text-[#10B981] transition-colors tracking-tight truncate">
                      {partner.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-400 dark:text-neutral-400 uppercase tracking-wider truncate">
                      {partner.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    );
  }

  // Fallback scrolling ticker
  return (
    <section className="relative w-full py-10 bg-white/40 dark:bg-[#060B16]/80 backdrop-blur-md border-y border-neutral-200/80 dark:border-white/[0.06] overflow-hidden select-none">
      {/* Title */}


      {/* Gradient Fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-r from-[#f8fafc] dark:from-[#060B16] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-l from-[#f8fafc] dark:from-[#060B16] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="animate-marquee flex items-center gap-8 md:gap-12">
        {[...partners, ...partners, ...partners].map((partner, index) => {
          const Icon = partner.icon;
          return (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-[#0A1224] border border-neutral-200/70 dark:border-white/[0.08] shadow-xs hover:shadow-md hover:border-[#0055FF]/50 dark:hover:border-[#10B981]/50 transition-all duration-300 group cursor-default shrink-0"
            >
              <div className="h-8 w-8 rounded-lg bg-neutral-100 dark:bg-slate-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:text-[#0055FF] dark:group-hover:text-[#10B981] group-hover:scale-110 transition-all">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-800 dark:text-white group-hover:text-[#0055FF] dark:group-hover:text-[#10B981] transition-colors tracking-tight">
                  {partner.name}
                </span>
                <span className="text-[9px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  {partner.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
