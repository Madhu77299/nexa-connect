import React from 'react';
import { ShieldCheck, Sparkles, Building2, Cloud, Layers, Cpu, Compass, Globe2 } from 'lucide-react';

export default function PartnerTicker({ title = "TRUSTED BY LEADING BUSINESSES & STRATEGIC ECOSYSTEM PARTNERS" }) {
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

  return (
    <section className="relative w-full py-10 bg-white/40 dark:bg-[#090e18]/80 backdrop-blur-md border-y border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden select-none">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 text-[10px] font-extrabold uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
          <span className="h-1.5 w-1.5 rounded-full bg-[#20c9b5] animate-pulse" />
          {title}
        </div>
      </div>

      {/* Gradient Fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-r from-[#f5f7fb] dark:from-[#08111f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-l from-[#f5f7fb] dark:from-[#08111f] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="animate-marquee flex items-center gap-8 md:gap-12">
        {[...partners, ...partners, ...partners].map((partner, index) => {
          const Icon = partner.icon;
          return (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-[#101c2f] border border-neutral-200/70 dark:border-neutral-800/80 shadow-xs hover:shadow-md hover:border-[#3167ff]/50 dark:hover:border-[#20c9b5]/50 transition-all duration-300 group cursor-default shrink-0"
            >
              <div className="h-8 w-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:text-[#3167ff] dark:group-hover:text-[#20c9b5] group-hover:scale-110 transition-all">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-800 dark:text-white group-hover:text-[#3167ff] dark:group-hover:text-[#20c9b5] transition-colors tracking-tight">
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
