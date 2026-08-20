import React from 'react';
import { Target, Compass, Eye } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import PageTransition from '../components/PageTransition';

export default function About() {
  return (
    <PageTransition>
      {/* 1. Editorial Hero Area */}
      <section className="bg-neutral-50 dark:bg-[#101c2f] py-24 border-b border-neutral-200/50 dark:border-neutral-800 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-[#3167ff] dark:text-[#20c9b5] uppercase">OUR STORY</span>
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-7xl max-w-4xl leading-tight">
            Connecting companies with talent, services, and operations.
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed pt-2">
            PMK Nexa Solutions Pvt. Ltd. was built with a simple goal: to reduce administrative complexity and coordinate robust commercial execution for modern enterprises. We serve as the central hub for growth.
          </p>
        </div>
      </section>

      {/* 2. Main Narrative Layout */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 bg-[#f5f7fb] dark:bg-[#08111f] transition-colors duration-300">
        
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] font-bold tracking-widest text-[#3167ff] dark:text-[#20c9b5] uppercase block">THE PHILOSOPHY</span>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            What Drives Us
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Modern corporate scaling demands agility. Instead of locking down budgets in rigid internal dependencies, we help companies assemble dynamic networks of verified vendors, technical workflows, and creative assets.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            By acting as the central coordination layer, PMK Nexa ensures high quality execution on the ground and in the cloud.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-10">
          
          {/* Vision */}
          <div className="flex gap-6 items-start">
            <div className="p-3 bg-white dark:bg-[#101c2f] border border-neutral-200 dark:border-neutral-800 rounded-xl text-[#3167ff] dark:text-[#20c9b5] shrink-0">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Our Vision</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                To build the primary business transaction and vendor coordination grid in India, enabling businesses to source operations, technology, and design capabilities instantly and reliably.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="flex gap-6 items-start">
            <div className="p-3 bg-white dark:bg-[#101c2f] border border-neutral-200 dark:border-neutral-800 rounded-xl text-[#3167ff] dark:text-[#20c9b5] shrink-0">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Our Mission</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                To streamline operational workflows, guarantee SLA delivery, and cultivate a robust workforce ecosystem through transparent pipelines, technology integrations, and reliable vendor relationships.
              </p>
            </div>
          </div>

          {/* Core Approach */}
          <div className="flex gap-6 items-start">
            <div className="p-3 bg-white dark:bg-[#101c2f] border border-neutral-200 dark:border-neutral-800 rounded-xl text-[#3167ff] dark:text-[#20c9b5] shrink-0">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Our Core Approach</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We believe in qualitative integrity. We avoid making unrealistic corporate statements, focusing instead on quantifiable deliverables, secure technologies, and robust contract standards.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* 3. Values Grid */}
      <section className="bg-neutral-50 dark:bg-[#101c2f]/20 py-24 transition-colors duration-300 border-t border-neutral-200/50 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            label="CORPORATE VALUES" 
            title="What we stand for" 
            subtitle="The principles that guide our relationships and executions." 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            
            <div className="bg-white dark:bg-[#101c2f] p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all">
              <div className="text-xs font-bold text-[#3167ff] dark:text-[#20c9b5] mb-3 uppercase tracking-wider">// 01. Dependability</div>
              <h4 className="font-bold text-neutral-900 dark:text-white mb-2 text-lg">SLA Integrity</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We design clear milestones, follow up closely with suppliers, and ensure deliverables meet agreed-upon timelines.
              </p>
            </div>

            <div className="bg-white dark:bg-[#101c2f] p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all">
              <div className="text-xs font-bold text-[#ff715b] mb-3 uppercase tracking-wider">// 02. Node Connection</div>
              <h4 className="font-bold text-neutral-900 dark:text-white mb-2 text-lg">Shared Success</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We look for win-win structures. When vendors and talent succeed, client growth follows automatically.
              </p>
            </div>

            <div className="bg-white dark:bg-[#101c2f] p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all">
              <div className="text-xs font-bold text-[#20c9b5] mb-3 uppercase tracking-wider">// 03. Practical Tech</div>
              <h4 className="font-bold text-neutral-900 dark:text-white mb-2 text-lg">Outcome-Driven Builds</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We avoid building unnecessary complexities. We build technologies that make administrative tracking, sales, and analytics fast and simple.
              </p>
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
}
